import mongoose from "mongoose";

const KindPriceSchema = new mongoose.Schema(
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
    
    // _idRulKindPrice: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "RulKindPrice",
    //   unique: false,
    //   required: false,
    // },
    
    // just use _begginingAmount and _lastAmount if you want to add a rul defined by any amount, so we have
    // Otherwise, it's by preference, it means that the rul dosen't definen by any amount
    _beginningAmount: {
      type: Number,
      unique: false,
      required: false,
    },
    _lastAmount: {
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

export default mongoose.model("KindPrice", KindPriceSchema);
