import UserH from "../../models/auth/userHeadquarter.model.js";

export default {
  _create: async (req, res) => {
    try {
      const { _idUser, _idHeadquarter } = req.body;
      const _new = new UserH({
        _idUser,
        _idHeadquarter,
      });

      const _saved = await _new.save();

      res.status(200).json(_saved);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  _read: async (req, res) => {
    const _data = await UserH.find();
    return res.json(_data);
  },
};
