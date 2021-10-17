 import Headquarter from "../../models/headquarter/model.headquarter.js";

export default {
  create: async (req, res) => {
    try {
      const { _address, _central, _stand, _flat } = req.body;
      const newHeadquarter = new Headquarter({
        _address,
        _central,
        _stand,
        _flat,
      });

      const savedHeadquarter = await newHeadquarter.save();

      res.status(200).json(savedHeadquarter);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  red: async (req, res) => {
    const headquarters = await Headquarter.find();
    return res.json(headquarters);
  },
};
