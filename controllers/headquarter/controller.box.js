import Box from "../../models/headquarter/model.box.js";

export default {
  create: async (req, res) => {
    try {
      const {
        _beginningAmount,
        _endAmount,
        _hourStartTime,
        _minuteStartTime,
        _secondStartTime,
        _hourEndTime,
        _minuteEndTime,
        _secondEndTime,
      } = req.body;
      const _new = new Box({
        _beginningAmount,
        _endAmount,
        _hourStartTime,
        _minuteStartTime,
        _secondStartTime,
        _hourEndTime,
        _minuteEndTime,
        _secondEndTime,
      });

      const _saved = await _new.save();

      res.status(200).json(_saved);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  red: async (req, res) => {
    const _result = await Box.find();
    return res.json(_result);
  },
};
