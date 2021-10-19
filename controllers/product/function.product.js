import Product from "../../models/product/model.product.js";
import Brand from "../../models/product/model.brand.js";
import Category from "../../models/product/model.category.js";
import Size from "../../models/product/model.size.js";
import Price from "../../models/price/model.price.js";
import KindPrice from "../../models/price/model.kindPrice.js";
import { _fGetFullPricesByIdProduct } from "../price/function.price.js";

// FUNCTIONS
// I don't
const _fregistered = (requirements) => {
  return Product.find(requirements).exec();
};

const _fGetBrand = async (_idBrand) => {
  return await Brand.findById(_idBrand);
};

const _fGetCategory = async (_idCategory) => {
  return await Category.findById(_idCategory);
};

const _fGetSize = async (_idSize) => {
  return await Size.findById(_idSize);
};

export const _fGetFullProduct = async (_product) => {
  const _fullProduct = JSON.parse(JSON.stringify(_product));
  const _idFullProduct = _fullProduct._id;
  delete _fullProduct._idBrand;
  delete _fullProduct._idCategory;
  delete _fullProduct._idSize;
  _fullProduct._brand = await _fGetBrand(_product._idBrand);
  _fullProduct._category = await _fGetCategory(_product._idCategory);
  _fullProduct._size = await _fGetSize(_product._idSize);
  _fullProduct._price = await _fGetFullPricesByIdProduct(_idFullProduct);
  return _fullProduct;
};

export const _fGetFullProducts = async (_products) => {
  const _fullProducts = [];
  for (const _product of _products) {
    const _fullProduct = await _fGetFullProduct(_product);
    _fullProducts.push(_fullProduct);
  }
  return _fullProducts;
};

export const _fGetProductById = async (_idProduct) => {
  const _products = await Product.findById(_idProduct);
  // // console.log(_idProduct,typeof _idProduct)
  // // console.log(_products)
  return _products;
};

// export const _fGetProductByIdHeadquarter = async (_idHeadquarter)=>{
//   const _products = await Product.find({_idHeadquarter})
//   return _products
// }

export const _fExistProduct = async (_categoryName, _brandName, _sizeName) => {
  const _products = await Product.find();
  const _fullProducts = await _fGetFullProducts(_products);
  const _exist = _fullProducts.filter(
    (e) =>
      e._brand._name === _brandName &&
      e._category._name === _categoryName &&
      e._size._name === _sizeName
  );
  return _exist.length === 1 ? true : false;
};

const _fSaveProduct = async (
  // _stock,
  _idCategory,
  _idBrand,
  _idSize,
  // _manufactured
) => {
  const _new = new Product({
    // _stock,
    // _manufactured,
    _idBrand,
    _idCategory,
    _idSize,
  });

  return await _new.save();
};

// CATEGORY
const _fExistCategory = async (_name) => {
  const _list = await Category.find({ _name });
  return _list.length === 1 ? _list[0]._id : "";
};

const _fSaveCategoryAndGetId = async (_name) => {
  const _new = new Category({ _name });
  const _saved = await _new.save();
  return _saved._id;
};

const _fGetIdCategory = async (_name) => {
  const _exist = await _fExistCategory(_name);
  return _exist ? _exist : await _fSaveCategoryAndGetId(_name);
};

// BRAND
const _fExistBrand = async (_name) => {
  const _list = await Brand.find({ _name });
  return _list.length === 1 ? _list[0]._id : "";
};

const _fSaveBrandAndGetId = async (_name) => {
  const _new = new Brand({ _name });
  const _saved = await _new.save();
  return _saved._id;
};

const _fGetIdBrand = async (_name) => {
  const _exist = await _fExistBrand(_name);
  return _exist ? _exist : await _fSaveBrandAndGetId(_name);
};

// SIZE
const _fExistSize = async (_name) => {
  const _list = await Size.find({ _name });
  return _list.length === 1 ? _list[0]._id : "";
};

const _fSaveSizeAndGetId = async (_name) => {
  const _new = new Size({ _name });
  const _saved = await _new.save();
  return _saved._id;
};

const _fGetIdSize = async (_name) => {
  const _exist = await _fExistSize(_name);
  return _exist ? _exist : await _fSaveSizeAndGetId(_name);
};

// PRICE
const _PRICE = "compra";
const _fGetIdPurchasePrice = async () => {
  const _list = await KindPrice.find({ _name: _PRICE });
  // console.log("list: ", _list);
  // console.log("id list: ", _list[0]._id);
  return _list[0]._id;
};

const _fSavePrice = async (_price, _idProduct) => {
  const _idKindPrice = await _fGetIdPurchasePrice();
  const _new = new Price({ _amount: _price, _idProduct, _idKindPrice });
  // console.log("Price: ", _price, typeof _price);
  // console.log("Id product: ", _idProduct, typeof _idProduct);
  const h = await _new.save();
  // console.log('saved price: ',h)
};

export const _fCreateWithNoId = async (
  // _stock,
  _categoryName,
  _brandName,
  _sizeName,
  // _manufactured,
  // _price
) => {
  const _idCategory = await _fGetIdCategory(_categoryName);
  const _idBrand = await _fGetIdBrand(_brandName);
  const _idSize = await _fGetIdSize(_sizeName);
  const _savedProduct = await _fSaveProduct(
    // _stock,
    _idCategory,
    _idBrand,
    _idSize,
    // _manufactured
  );
  // console.log(_savedProduct)
  // await _fSavePrice(_price, _savedProduct._id);
};

// BAD

// export const _fExistCategory = async (_name) => {
//   const _list = await Category.find({ _name });
//   return _list.length === 1 ? true : false;
// };

// export const _fExistSize = async (_name) => {
//   const _list = await Size.find({ _name });
//   return _list.length === 1 ? true : false;
// };
