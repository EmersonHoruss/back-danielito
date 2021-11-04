import ProductH from "../../models/headquarter/model.productHeadquarter.js";
import {
  _fGetFullProduct,
  _fGetProductById,
} from "../product/function.product.js";
import { _fGetAllKindPrices } from "../price/function.kindPrice.js";

// FUNCTIONS
// if increase the amount so decrease the stock else you get an error
const _fCanIncreaseAmount = (_stock, lastAmount, _requiredAmount) => {
  const _jump = _requiredAmount - lastAmount;
  const _hopedStock = _stock - _jump;
  return _hopedStock < 0 ? "ERROR: amount is bigger" : _hopedStock;
};

// if decrease the amount so increase the stock else you get an error
const _fCanDecreaseAmount = (_stock, lastAmount, _requiredAmount) => {
  const _jump = lastAmount - _requiredAmount;
  const _hopedStock = _stock + _jump;
  return _jump < 0 ? "ERROR: amount is smaller" : _hopedStock;
};

// decide what operation executes if a increase amount or decrease amount
// and return a error msj or correct stock
const _fIncreaseOrDecrease = (_stock, lastAmount, _requiredAmount) => {
  return _requiredAmount >= lastAmount
    ? _fCanIncreaseAmount(_stock, lastAmount, _requiredAmount)
    : _fCanDecreaseAmount(_stock, lastAmount, _requiredAmount);
};

// make changes in db if is possible any operation and send a error msje or the
// product in the headquarter updated
const _fMainUpdate = async (_validation, _idProductH) => {
  // let _msje;
  return typeof _validation === typeof ""
    ? _validation
    : await ProductH.findByIdAndUpdate(
        _idProductH,
        {
          $set: { _stock: _validation },
        },
        {
          new: true,
        }
      );
};

const _fUpdate = async (_lastAmount, _requiredAmount, _idProductH) => {
  const _productH = await ProductH.findById(_idProductH);
  const _stock = _productH._stock;
  // console.log('VALUES')
  // console.log(_productH)
  // console.log(_stock,typeof _stock)
  // console.log(_lastAmount,typeof _lastAmount)
  // console.log(_requiredAmount,typeof _requiredAmount)

  const _validation = _fIncreaseOrDecrease(
    _stock,
    _lastAmount,
    _requiredAmount
  );
  return _fMainUpdate(_validation, _idProductH);
  // return _validation
};

export const _fGetFullProductH = async (_productH) => {
  const _fullProductH = JSON.parse(JSON.stringify(_productH));
  const _product = await _fGetProductById(_fullProductH._idProduct);
  // console.log(_product);
  _fullProductH._product = await _fGetFullProduct(_product);
  delete _fullProductH._idProduct;
  _fullProductH._kindPrices = await _fGetAllKindPrices()
  return _fullProductH;
};

export const _fGetFullProductHs = async (_productHs) => {
  const _fullProductHs = [];
  for (const _productH of _productHs) {
    const _fullProductH = await _fGetFullProductH(_productH);
    _fullProductHs.push(_fullProductH);
  }
  return _fullProductHs;
};

// Let us just the brands of a list of products
const _fGetBrands = async (_productHs) => {
  const _fullBrandHs = [];
  for (const _productH of _productHs) {
    const _fullBrandH = (await _fGetFullProductH(_productH))._product._brand;
    _fullBrandHs.push(_fullBrandH);
  }
  return _fullBrandHs;
};

// Let us just the categories of a list of products
const _fGetCategories = async (_productHs) => {
  const _fullCategoryHs = [];
  for (const _productH of _productHs) {
    const _fullBrandH = (await _fGetFullProductH(_productH))._product._category;
    _fullCategoryHs.push(_fullBrandH);
  }
  return _fullCategoryHs;
};

// Let us just the sizes of a list of products
const _fGetSizes = async (_productHs) => {
  const _fullSizeHs = [];
  for (const _productH of _productHs) {
    const _fullBrandH = (await _fGetFullProductH(_productH))._product._size;
    _fullSizeHs.push(_fullBrandH);
  }
  return _fullSizeHs;
};

// A component is a brand, a category or a size
// because they are components of a product
export const _fGetComponentByIdHs = async (
  _idHeadquarter,
  required = "brand"
) => {
  const _productHs = await ProductH.find({
    _idHeadquarter,
  });
  const _fullBrandHs =
    required === "brand"
      ? _fGetBrands(_productHs)
      : required === "category"
      ? _fGetCategories(_productHs)
      : required === "size"
      ? _fGetSizes(_productHs)
      : [];
  // console.log(_idHeadquarter);
  return _fullBrandHs;
};

//Update the stock when make a deleting in a detail sale order
export const _fUpdateStockDeleting = async (_idProductH, _amountDetailSO) => {
  const _productH = await ProductH.findById(_idProductH);
  const _stockProductH = _productH._stock;
  const _stockAfterDeleting = _stockProductH + _amountDetailSO;

  await ProductH.findOneAndUpdate(
    { _id: _idProductH },
    { $set: { _stock: _stockAfterDeleting } },
    { new: true }
  );
};

// When it's deleted we have to update the global stock in the products
export const _fDeleteOne = async () => {};

export default { _fUpdate };
