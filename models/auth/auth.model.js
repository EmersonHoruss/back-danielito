import mongoose from "mongoose";
const Schema = mongoose.Schema;
mongoose.set("useCreateIndex", true);
const userSchema = new Schema(
  {
    _nickname: {
      type: String,
      required: true,
      trim: true,
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
  }
);

export default userSchema;
