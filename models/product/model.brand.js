import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema(
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

export default mongoose.model("Brand", BrandSchema);
