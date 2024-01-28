import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const checkAuth = async (req, res) => {
  try {
    const token = req.cookies?.token;

    if (!token)
      return res
        .status(401)
        .json({ success: false, data: "No token provided!" });

    const data = await jwt.verify(token, process.env.JWT_SECRET);

    if (data) {
      res.status(200).json({ success: true, data });
    } else {
      res.status(401).json({ success: false, data: "Invalid token!" });
    }
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const findUser = await User.findOne({ email: req.body.email });

    if (findUser)
      return res.status(409).json({
        success: false,
        data: "There is already an account registered with this email address in the system.",
      });

    if (req.body.password !== req.body.passwordConfirm)
      return res.status(400).json({
        success: false,
        data: "Passwords do not match!",
      });

    const password = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      email: req.body.email,
      password,
      google: 0,
    });
    const user = await newUser.save();

    const token = await jwt.sign(user._doc, process.env.JWT_SECRET);
    res.cookie("token", token, {
      expires: new Date(new Date().getTime() + 3600 * 1000),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(201).json({ success: true, data: user._doc });
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const findUser = await User.findOne({ email: req.body.email });

    if (!findUser)
      return res.status(404).json({
        success: false,
        data: "No account registered with this e-mail address was found in the system!",
      });

    if (findUser._doc.google === 1)
      return res.status(403).json({
        success: false,
        data: "This email is paired with a google account. Use the sign in with google option.",
      });

    const compare = await bcrypt.compare(
      req.body.password,
      findUser._doc.password,
    );

    if (!compare)
      return res.status(401).json({
        success: false,
        data: "You entered an incorrect password.",
      });

    const token = await jwt.sign(findUser._doc, process.env.JWT_SECRET);
    res.cookie("token", token, {
      expires: new Date(new Date().getTime() + 3600 * 1000),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({ success: true, data: findUser._doc });
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};

export const logoutUser = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({ success: true, data: "Logout successfull." });
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const googleToken = req.body.token;
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${googleToken}`,
    );
    const data = await response.json();

    if (data.email) {
      const findUser = await User.findOne({ email: data.email });
      if (findUser) {
        if (findUser._doc.google !== 1)
          return res.status(409).json({
            success: false,
            data: "This account is not linked with google!",
          });

        const token = await jwt.sign(findUser._doc, process.env.JWT_SECRET);
        res.cookie("token", token, {
          expires: new Date(new Date().getTime() + 3600 * 1000),
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });

        res.status(200).json({ success: true, data: findUser._doc });
      } else {
        const newUser = new User({
          email: data.email,
          google: 1,
        });
        const user = await newUser.save();

        const token = await jwt.sign(user._doc, process.env.JWT_SECRET);
        res.cookie("token", token, {
          expires: new Date(new Date().getTime() + 3600 * 1000),
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });

        res.status(201).json({ success: true, data: user._doc });
      }
    } else {
      res.status(401).json({ success: false, data: "Invalid google token!" });
    }
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};
