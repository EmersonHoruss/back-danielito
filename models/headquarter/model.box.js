import mongoose from "mongoose";

const _schema = new mongoose.Schema(
  {
    _name: {
      type: String,
      unique: false,
      required: false,
    },
    _beginningAmount: {
      type: Number,
      unique: false,
      required: false,
    },
    _endAmount: {
      type: Number,
      unique: false,
      required: false,
    },
    _hourStartTime: {
      type: Number,
      unique: false,
      required: false,
    },
    _minuteStartTime: {
      type: Number,
      unique: false,
      required: false,
    },
    _secondStartTime: {
      type: Number,
      unique: false,
      required: false,
    },
    _hourEndTime: {
      type: Number,
      unique: false,
      required: false,
    },
    _minuteEndTime: {
      type: Number,
      unique: false,
      required: false,
    },
    _secondEndTime: {
      type: Number,
      unique: false,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Box", _schema);
