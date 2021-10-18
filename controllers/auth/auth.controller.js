// import User from "./auth.dao.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { _getNameById } from "./kindUser.function.js";
import User from "../../models/auth/auth.model.js";

const SECRET_KEY = "secretkey123456";

export default {
  createUser: (req, res, next) => {
    // const newUser = {
    //   _nickname: req.body._nickname,
    //   _password: bcrypt.hashSync(req.body._password),
    //   _idWorker: req.body._idWorker,
    //   _idKindUser: req.body._idKindUser,
    // };
    // User.create(newUser, (err, user) => {
    //   if (err && err.code === 11000)
    //     return res.status(409).send("_nickname already exists");
    //   if (err) return res.status(500).send("Server error");
    //   const expiresIn = 24 * 60 * 60;
    //   const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, {
    //     expiresIn: expiresIn,
    //   });
    //   const dataUser = {
    //     _nickname: user._nickname,
    //     _kindUserName: "",
    //     _accessToken: accessToken,
    //     _expiresIn: expiresIn,
    //   };
    //   // response
    //   res.send({ dataUser });
    // });
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
