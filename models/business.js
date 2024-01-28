import mongoose from "mongoose";

const businessSchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  slug: {
    type: String,
    required: false,
  },
  color: {
    type: Number,
    required: true,
  },
  ownerId: {
    type: String,
    required: true,
  },
});

const Business = mongoose.model("businesses", businessSchema);

export default Business;
