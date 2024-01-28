import Category from "../models/category.js";
import Menu from "../models/menu.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ businessId: req.body.businessId });

    if (categories.length > 0) {
      res.status(200).json({ success: true, data: categories });
    } else {
      res.status(404).json({ success: false, data: "No category found!" });
    }
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const findCategory = await Category.findOne({
      name: req.body.name.trim(),
      businessId: req.user.businessId,
    });

    if (findCategory)
      return res.status(409).json({
        success: false,
        data: "You already have a category with this name!",
      });

    const newCategory = new Category({
      name: req.body.name.trim(),
      description: req.body.description.trim(),
      icon: req.body.icon,
      businessId: req.user.businessId,
    });

    const category = await newCategory.save();
    if (category) {
      res.status(201).json({ success: true, data: category._doc });
    } else {
      res.status(500).json({
        success: false,
        data: "An error occured while creating category.",
      });
    }
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const targetCategory = await Category.findById(req.body.id);

    if (targetCategory) {
      if (req.user.businessId !== targetCategory._doc.businessId)
        return res.status(403).json({ success: false, data: "Forbidden" });

      const findCategory = await Category.findOne({
        name: req.body.name.trim(),
        businessId: req.user.businessId,
      });

      if (
        findCategory &&
        findCategory._doc._id.toString() !== targetCategory._doc._id.toString()
      ) {
        return res.status(409).json({
          success: false,
          data: "You already have a category with this name!",
        });
      }

      await Category.findByIdAndUpdate(req.body.id, {
        name: req.body.name.trim(),
        description: req.body.description.trim(),
        icon: req.body.icon,
      });

      res
        .status(200)
        .json({ success: true, data: "Category updated successfully." });
    } else {
      res.status(404).json({ success: false, data: "Category not found!" });
    }
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const targetCategory = await Category.findById(req.body.id);

    if (targetCategory) {
      if (targetCategory._doc.businessId !== req.user.businessId)
        return res.status(403).json({ success: false, data: "Forbidden" });

      await Menu.findOneAndDelete({ categoryId: targetCategory._doc._id });
      await Category.findByIdAndDelete(targetCategory._doc._id);

      res
        .status(200)
        .json({ success: true, data: "Category has been deleted." });
    } else {
      res.status(404).json({ success: false, data: "Category not found!" });
    }
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};
