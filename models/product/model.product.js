import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    _stock: {
      type: Number,
      unique: false,
      required: true,
    },
    _manufactured: {
      type: Boolean,
      unique: false,
      required: true,
    },
    _idBrand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      unique: false,
      required: true,
    },
    _idCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      unique: false,
      required: true,
    },
    _idSize: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Size",
      unique: false,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Product", ProductSchema);
