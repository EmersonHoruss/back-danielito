import mongoose from "mongoose";

const _schema = new mongoose.Schema(
  {
    _name: {
      type: String,
      unique: true,
      required: true,
    },
    _description: {
      type: String,
      unique: false,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("KindUser", _schema);
