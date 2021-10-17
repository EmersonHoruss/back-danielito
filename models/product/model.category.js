import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    _name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Category", CategorySchema);
