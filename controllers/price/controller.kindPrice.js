import KindPrice from "../../models/price/model.kindPrice.js";

export default {
  create: async (req, res) => {
    try {
      const { _name, _description, _beginningAmount, _lastAmount } = req.body;
      const newKindPrice = new KindPrice({
        _name,
        _description,
        _beginningAmount,
        _lastAmount,
      });

      const savedKindPrice = await newKindPrice.save();

      res.status(200).json(savedKindPrice);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  red: async (req, res) => {
    const _kindPrices = await KindPrice.find();
    return res.json(_kindPrices);
  },
};
