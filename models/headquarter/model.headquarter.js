import mongoose from "mongoose";

const HeadquarterSchema = new mongoose.Schema(
  {
    _address: {
      type: String,
      unique: false,
      required: true,
    },
    _central: {
      type: Boolean,
      unique: false,
      required: true,
    },
    _stand: {
      type: Number,
      unique: false,
      required: true,
    },
    _flat: {
      type: Number,
      unique: false,
      required: true,
    },
    _idBox: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Box",
      unique: false,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Headquarter", HeadquarterSchema);
