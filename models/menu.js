import mongoose from "mongoose";

const menuSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  categoryId: {
    type: String,
    required: true,
  },
  businessId: {
    type: String,
    required: true,
  },
});

const Menu = mongoose.model("menus", menuSchema);

export default Menu;
