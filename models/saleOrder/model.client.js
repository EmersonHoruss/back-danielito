import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
  {
    _DNI: {
      type: String,
      unique: true,
      required: false,
    },
    _name: {
      type: String,
      unique: false,
      required: true,
    },
    _address: {
      type: String,
      unique: false,
      required: false,
    },
    _cel: {
      type: String,
      unique: false,
      required: false,
    },
    _shipping: {
      type: Boolean,
      unique: false,
      required: false,
    },
    _RUC: {
      type: String,
      unique: true,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Client", ClientSchema);
