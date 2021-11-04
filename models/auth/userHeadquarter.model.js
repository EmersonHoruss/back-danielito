import mongoose from "mongoose";

const _schema = new mongoose.Schema(
  {
    _idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: false,
      required: false,
    },
    _idHeadquarter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Headquarter",
      unique: false,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("UserHeadquarter", _schema);
