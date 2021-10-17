import mongoose from "mongoose";

const PriceSchema = new mongoose.Schema(
    {
        _amount:{
            type: Number,
            unique: false,
            required: true,
        },
        _idKindPrice: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "KindPrice",
            unique: false,
            required: true,
          },
        _idProduct: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            unique: false,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default mongoose.model("Price", PriceSchema);