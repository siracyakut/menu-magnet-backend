import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  google: {
    type: Number,
    required: false,
    default: 0,
  },
  businessId: {
    type: String,
    required: false,
  },
});

const User = mongoose.model("users", userSchema);

export default User;
