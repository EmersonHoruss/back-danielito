import mongoose from "mongoose";

const _schema = new mongoose.Schema(
  {
    _nickname: {
      type: String,
      required: true,
      unique: true,
    },
    _password: {
      type: String,
      required: true,
    },
    _idWorker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
      unique: true,
      required: false,
    },
    _idKindUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "kindUser",
      unique: false,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("User", _schema);
