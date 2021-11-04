import KindUser from "../../models/auth/kindUser.model.js";

export default {
  _create: async (req, res) => {
    try {
      const { _name, _description } = req.body;
      const _new = new KindUser({
        _name,
        _description,
      });

      const _saved = await _new.save();

      res.status(200).json(_saved);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  _read: async (req, res) => {
    const _data = await KindUser.find();
    return res.json(_data);
  },
};

// const mal = "MAAAAL REHACER XD"
//       const { _id } = req.body;
//       const result = await Validation._fManageExist(_id, Worker);
//       console.log(result)
//       res.status(200).json(result);
