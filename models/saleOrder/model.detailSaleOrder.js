import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    _price: {
      type: Number,
      unique: false,
      required: true,
    },
    _amount: {
      type: Number,
      unique: false,
      required: true,
    },
    _totalPrice: {
      type: Number,
      unique: false,
      required: false,
    },
    _idProductHeadquarter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductHeadquarter",
      unique: false,
      required: true,
    },
    _idSaleOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SaleOrder",
      unique: false,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Order", OrderSchema);
