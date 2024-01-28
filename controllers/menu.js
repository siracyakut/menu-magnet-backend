import Menu from "../models/menu.js";

export const getMenus = async (req, res) => {
  try {
    const menus = await Menu.find({ businessId: req.body.businessId });

    if (menus.length > 0) {
      res.status(200).json({ success: true, data: menus });
    } else {
      res.status(404).json({ success: false, data: "No menu found!" });
    }
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};

export const createMenu = async (req, res) => {
  try {
    const newMenu = new Menu({
      name: req.body.name.trim(),
      description: req.body.description.trim(),
      price: req.body.price,
      categoryId: req.body.categoryId,
      businessId: req.user.businessId,
    });

    const menu = await newMenu.save();
    if (menu) {
      res.status(201).json({ success: true, data: menu._doc });
    } else {
      res.status(500).json({
        success: false,
        data: "An error occured while creating menu.",
      });
    }
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};

export const updateMenu = async (req, res) => {
  try {
    const targetMenu = await Menu.findById(req.body.id);

    if (targetMenu) {
      if (req.user.businessId !== targetMenu._doc.businessId)
        return res.status(403).json({ success: false, data: "Forbidden" });

      await Menu.findByIdAndUpdate(req.body.id, {
        name: req.body.name.trim(),
        description: req.body.description.trim(),
        price: req.body.price,
        categoryId: req.body.categoryId,
      });

      res
        .status(200)
        .json({ success: true, data: "Menu updated successfully." });
    } else {
      res.status(404).json({ success: false, data: "Menu not found!" });
    }
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};

export const deleteMenu = async (req, res) => {
  try {
    const targetMenu = await Menu.findById(req.body.id);

    if (targetMenu) {
      if (targetMenu._doc.businessId !== req.user.businessId)
        return res.status(403).json({ success: false, data: "Forbidden" });

      await Menu.findByIdAndDelete(targetMenu._doc._id);

      res.status(200).json({ success: true, data: "Menu has been deleted." });
    } else {
      res.status(404).json({ success: false, data: "Menu not found!" });
    }
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};
