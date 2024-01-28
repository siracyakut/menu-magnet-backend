import Business from "../models/business.js";
import { getSlug } from "../utils/slug.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const getBusinessInfo = async (req, res) => {
  try {
    let business;

    if (req.body.id) {
      business = await Business.findById(req.body.id);
    } else if (req.body.slug) {
      business = await Business.findOne({ slug: req.body.slug });
    }

    if (business) {
      res.status(200).json({ success: true, data: business._doc });
    } else {
      res.status(404).json({ success: false, data: "Business not found!" });
    }
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};

export const createBusiness = async (req, res) => {
  try {
    const slug = getSlug(req.body.business);
    const findBusiness = await Business.findOne({ slug });

    if (findBusiness)
      return res.status(409).json({
        success: false,
        data: "A business with this name already exists!",
      });

    const newBusiness = new Business({
      name: req.body.business.trim(),
      slug,
      color: req.body.color,
      ownerId: req.user._id,
    });
    const business = await newBusiness.save();

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { businessId: business._doc._id },
      { new: true },
    );

    const token = await jwt.sign(updatedUser._doc, process.env.JWT_SECRET);
    res.cookie("token", token, {
      expires: new Date(new Date().getTime() + 3600 * 1000),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(201).json({
      success: true,
      data: { business: business._doc, user: updatedUser._doc },
    });
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};

export const updateBusiness = async (req, res) => {
  try {
    if (req.body.business) {
      const slug = getSlug(req.body.business);
      const findBusiness = await Business.findOne({ slug });

      if (findBusiness)
        return res.status(409).json({
          success: false,
          data: "A business with this name already exists!",
        });

      await Business.findByIdAndUpdate(req.user.businessId, {
        name: req.body.business.trim(),
        slug,
      });
    }

    if (req.body.color !== undefined) {
      await Business.findByIdAndUpdate(req.user.businessId, {
        color: req.body.color,
      });
    }

    res
      .status(200)
      .json({ success: true, data: "Business updated successfully." });
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};
