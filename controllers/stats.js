import User from "../models/user.js";
import Menu from "../models/menu.js";
import Category from "../models/category.js";

export const getStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments({});
    const menuCount = await Menu.countDocuments({});
    const categoryCount = await Category.countDocuments({});

    if (userCount && menuCount && categoryCount) {
      res
        .status(200)
        .json({
          success: true,
          data: { userCount, menuCount: menuCount + categoryCount },
        });
    } else {
      res.status(404).json({ success: false, data: "Count not found." });
    }
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};
