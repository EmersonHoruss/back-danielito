import mongoose from "mongoose";

const ProductHeadquarterSchema = new mongoose.Schema(
  {
    _stock: {
      type: Number,
      unique: false,
      required: true,
    },
    _idHeadquarter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Headquarter",
      unique: false,
      required: true,
    },
    _idProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      unique: false,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("ProductHeadquarter", ProductHeadquarterSchema);
