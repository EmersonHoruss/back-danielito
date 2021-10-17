// import mongoose from "mongoose";

// const RulKindPriceSchema = new mongoose.Schema(
//     {
//         // just if it's true it means the rul is defined by any amount, so we have
//         // to fill the begging and the final amount. Otherwise, it's by preference, it means
//         // that the rul dosen't definen by any amount
        
//         _begginingAmount:{
//             type: Number,
//             unique: false,
//             required: true,
//         },
//         _finalAmount:{
//             type: Number,
//             unique: false,
//             required: true,
//         },

//     },
//     {
//         timestamps: true,
//         versionKey: false,
//     }
// );

// export default mongoose.model("RulKindPrice", RulKindPriceSchema);