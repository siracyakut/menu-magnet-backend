import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: Number,
    required: true,
  },
  businessId: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("categories", categorySchema);

export default Category;
