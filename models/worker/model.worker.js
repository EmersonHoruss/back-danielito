import mongoose from "mongoose";

const WorkerSchema = new mongoose.Schema(
  {
    _DNI: {
      type: String,
      unique: true,
      required: true,
    },
    _name: {
      type: String,
      unique: false,
      required: true,
    },
    _age: {
      type: Number,
      unique: false,
      required: true,
    },
    _address: {
      type: String,
      unique: false,
      required: true,
    },
    _cel: {
      type: String,
      unique: false,
      required: true,
    },
    _debtCollector: {
      type: Boolean,
      unique: false,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Worker", WorkerSchema);
