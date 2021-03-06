// import Userr from "./auth.dao.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { _getNameById } from "./kindUser.function.js";
import User from "../../models/auth/auth.model.js";
import Headquarter from "../../models/headquarter/model.headquarter.js";
import UserH from "../../models/auth/userHeadquarter.model.js";

const SECRET_KEY = "secretkey123456";

export default {
  createUser: async (req, res) => {
    try {
      const _user = {
        _nickname: req.body._nickname,
        _password: bcrypt.hashSync(req.body._password),
        _idWorker: req.body._idWorker,
        _idKindUser: req.body._idKindUser,
      };
      // res.send(_user);
      const _newUser = new User(_user);
      const _savedUser = await _newUser.save();
      const expiresIn = 24 * 60 * 60;
      const accessToken = jwt.sign({ id: _savedUser._id }, SECRET_KEY, {
        expiresIn: expiresIn,
      });

      const dataUser = {
        _nickname: _user._nickname,
        _kindUserName: "",
        _accessToken: accessToken,
        _expiresIn: expiresIn,
      };

      res.send({ dataUser });
    } catch (err) {
      if (err && err.code === 11000)
        return res.status(409).send("Nickname already exists");
      if (err) return res.status(500).send("Server error");
    }
  },

  loginUser: async (req, res) => {
    const userData = {
      _nickname: req.body._nickname,
      _password: req.body._password,
    };

    await User.findOne({ _nickname: userData._nickname }, async (err, user) => {
      if (err) return res.status(500).send("Server error!");

      if (!user) {
        // _nickname does not exist
        res
          .status(409)
          .send({ message: "Contraseña o el usuario no son correctos" });
      } else {
        const result_Password = bcrypt.compareSync(
          userData._password,
          user._password
        );
        if (result_Password) {
          const expiresIn = 24 * 60 * 60;
          const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, {
            expiresIn: expiresIn,
          });
          const _kindUserName = await _getNameById(user._idKindUser);
          const dataUser = {
            _nickname: user._nickname,
            _kindUserName,
            _accessToken: accessToken,
            _expiresIn: expiresIn,
          };

          // START GETTING FULL HEADQUARTER
          const _userH = await UserH.find({ _idUser: user.id });
          console.log(_userH);
          const _idHeadquarter = _userH[0]._idHeadquarter;
          const _headquarter = await Headquarter.findById({
            _id: _idHeadquarter,
          });
          // END GETTING FULL HEADQUARTER
          dataUser._headquarter = _headquarter;
          dataUser._userHeadquarter = _userH[0];
          res.send({ dataUser });
        } else {
          // _password wrong
          res
            .status(409)
            .send({ message: "Contraseña o el usuario no son correctos" });
        }
      }
    });
  },
};

// Userr.create(newUser, (err, user) => {
//   if (err && err.code === 11000)
//     return res.status(409).send("_nickname already exists");
// await if (err) retur res.status(500).send("r
// const expiresIn = 24 * 60 * 60;
// const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, {
//   expiresIn: expiresIn,
// });
// const dataUser = {
//   _nickname: user._nickname,
//   _kindUserName: "",
//   _accessToken: accessToken,
//   _expiresIn: expiresIn,
// };

// res.send({ dataUser });
