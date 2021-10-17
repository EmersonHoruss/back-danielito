import mongoose from "mongoose";

const SizeSchema = new mongoose.Schema(
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

export default mongoose.model("Size", SizeSchema);
