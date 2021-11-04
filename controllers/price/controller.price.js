import Price from "../../models/price/model.price.js";
import { _fGetFullPrices } from "./function.price.js";

const _create = async (_amount, _idKindPrice, _idProduct) => {
  const newPrice = new Price({
    _amount,
    _idKindPrice,
    _idProduct,
  });
  // console.log(_amount, _idKindPrice, _idProduct);
  const _savedPrice = await newPrice.save();
  return _savedPrice;
};

export default {
  create: async (req, res) => {
    try {
      const { _amount, _idKindPrice, _idProduct } = req.body;
      const newPrice = new Price({
        _amount,
        _idKindPrice,
        _idProduct,
      });

      const savedPrice = await newPrice.save();

      res.status(200).json(savedPrice);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  _createMultiple: async (req, res) => {
    const { _productIds, _prices } = req.body;
    const _dataResponse = [];
    console.log(_productIds, _prices);
    for (const _iPI in _productIds)
      for (const _iP in _prices) {
        const { _id, _amount } = _prices[_iP];
        const _result = await _create(
          parseFloat(_amount),
          _id,
          _productIds[_iPI]
        );
        _dataResponse.push(_result);
        console.log(typeof _amount);
        // console.log(parseFloat(_amount), _id, _productIds[_iPI]);
      }
    res.send(_dataResponse);

    // console.log(_productIds, _prices);
    // console.log('creating multiple')
    // console.log('xx')
  },

  update: async (req, res) => {
    const { _idPrice } = req.params;
    const { _amount } = req.body;
    const _updatedPrice = await Price.findByIdAndUpdate(
      { _id: _idPrice },
      { _amount },
      { new: true }
    );
    res.json(_updatedPrice);
  },

  readFullPricesByIdProduct: async (req, res) => {
    const _idProduct = req.params._idProduct;
    const _prices = await Price.find({ _idProduct });
    const _fullPrices = await _fGetFullPrices(_prices);

    return res.json(_fullPrices);
    // console.log(_fullPrices);
  },

  red: async (req, res) => {
    const _prices = await Price.find();
    return res.json(_prices);
  },

  _readFull: async (req, res) => {
    const _prices = await Price.find();
    const _fullPrices = await _fGetFullPrices(_prices);

    return res.json(_fullPrices);
  },
};
