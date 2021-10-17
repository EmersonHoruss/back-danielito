import mongoose from "mongoose";
import keys from "./keys.js";

mongoose
  .connect(keys.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
    useFindAndModify: false,
  })
  .then((db) => console.log(`DB is connected`))
  .catch((err) => console.log(err));
