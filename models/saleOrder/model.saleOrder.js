import mongoose from "mongoose";

const SaleOrderSchema = new mongoose.Schema(
  {
    _idClient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      unique: false,
      required: false,
    },
    _idSeller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
      unique: false,
      required: false,
    },
    _idDebtCollector: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
      unique: false,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("SaleOrder", SaleOrderSchema);
