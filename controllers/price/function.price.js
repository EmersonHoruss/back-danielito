import Price from "../../models/price/model.price.js";
import { _fGetKindPrice, _fGetKindPriceByName } from "./function.kindPrice.js";
import ProductH from "../../models/headquarter/model.productHeadquarter.js";

// FUNCTIONS
const _fGetPricesByIdProduct = async (_idProduct) => {
  return await Price.find({ _idProduct });
};

const _fBuildFullPrice = async (_price) => {
  const _fullPrice = JSON.parse(JSON.stringify(_price));

  const _idKindPrice = _fullPrice._idKindPrice;
  delete _fullPrice._idKindPrice;
  _fullPrice._kindPrice = await _fGetKindPrice(_idKindPrice);
  //   console.log(_fullPrice);
  return _fullPrice;
};

export const _fGetFullPrices = async (_prices) => {
  return await Promise.all(
    _prices.map(async (_price) => await _fBuildFullPrice(_price))
  );

  //   console.log("GET FULL PRICES:", _fullPrices);
};

export const _fGetFullPricesByIdProduct = async (_idProduct) => {
  const _prices = await _fGetPricesByIdProduct(_idProduct);
  return await _fGetFullPrices(_prices);
};

export const _fGetPrice = async (_idPH, _requiredAmount) => {
  const _ph = await ProductH.findById(_idPH);
  // console.log("PRODUCT HEADQUARTER", _ph);
  const _idProduct = _ph._idProduct;
  const _prices = await _fGetFullPricesByIdProduct(_idProduct);
  // console.log("PRICES: ", _prices);
  const _price = _prices.filter((e) => {
    const _beginningAmount = e._kindPrice._beginningAmount;
    const _lastAmount = e._kindPrice._lastAmount;
    const _isReturnable =
      _requiredAmount >= _beginningAmount && _requiredAmount <= _lastAmount;
    return _isReturnable ? true : false;
  });

  // console.log("PRICE", _price);
  // console.log(_price[0]._amount);
  const _amount = _price[0]._amount;
  return _amount;
};

const _createPrice = async (_idProduct, _amount) => {
  const _compra = await _fGetKindPriceByName("Compra");
  // console.log(_compra);
  const _idKindPrice = _compra._id;

  const newPrice = new Price({
    _amount,
    _idKindPrice,
    _idProduct,
  });
  const _savedPrice = await newPrice.save();

  return _savedPrice;
};

const _updatePrice = async (_compra, _amount) => {
  const _id = _compra[0]._id;
  console.log(_compra);
  const _updatedPrice = await Price.findByIdAndUpdate(
    _id,
    { _amount },
    { new: true }
  );
  return _updatedPrice;
};

export const _mngPriceProduct = async (_idProduct, _amount) => {
  const _fullPrices = await _fGetFullPricesByIdProduct(_idProduct);
  console.log('fullprices mng',_fullPrices);
  const _compra = _fullPrices.filter(
    (e) => e._kindPrice._name.toLowerCase() === "compra"
  );
  // console.log('mng:',_compra)

  return _compra.length === 0
    ? await _createPrice(_idProduct, _amount)
    : await _updatePrice(_compra, _amount);
};
