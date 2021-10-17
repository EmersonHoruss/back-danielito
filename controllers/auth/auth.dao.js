import mongoose from "mongoose";
import authSchema from "../../models/auth/auth.model.js";
// const authSchema = require();

authSchema.statics = {
  create: function (_data, _cb) {
    const _user = new this(_data);
    _user.save(_cb);
  },
  login: function (query, cb) {
    this.find(query, cb);
  }
}

const authModel = mongoose.model('User', authSchema);
// module.exports = authModel;
export default authModel;