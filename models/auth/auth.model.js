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
      unique: false,
    },
    // id worker should be true in unique
    _idWorker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
      unique: false,
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
