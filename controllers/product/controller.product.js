import Product from "../../models/product/model.product.js";
import { _mngPriceProduct } from "../price/function.price.js";
import {
  _fGetFullProducts,
  _fExistProduct,
  _fCreateWithNoId,
} from "./function.product.js";
// import mongoose from "mongoose";

const _updateProductStock = async (_id, _stock) => {
  const _updated = await Product.findByIdAndUpdate(
    _id,
    {
      $set: { _stock },
    },
    {
      new: true,
    }
  );
  return _updated;
};

export default {
  // not yet implement the validation for each field
  // for example we should know if _idBrand is included in all the brands
  create: async (req, res) => {
    try {
      const { _stock, _manufactured, _idBrand, _idCategory, _idSize } =
        req.body;
      console.log(typeof _idBrand);
      const _registered = await Product.find({
        _idBrand,
        _idCategory,
        _idSize,
      });
      let msje = "Error! ya existe producto";

      if (!_registered.length) {
        const newProduct = new Product({
          _stock,
          _manufactured,
          _idBrand,
          _idCategory,
          _idSize,
        });

        msje = await newProduct.save();
      }

      res.status(200).json(msje);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  createWithNoId: async (req, res) => {
    let { _stock, _category, _brand, _size, _manufactured, _price } = req.body;

    _category = _category.toUpperCase();
    _category = _category.toUpperCase();
    _brand = _brand.toUpperCase();
    _size = _size.toUpperCase();
    const _exist = await _fExistProduct(_category, _brand, _size);

    if (!_exist) {
      await _fCreateWithNoId(
        // _stock,
        _category,
        _brand,
        _size
        // _manufactured,
        // _price
      ); // Create
      // router.post("/", controllerProduct.create);

      return res.status(200).json({
        _type: "success",
        _detail: "El producto ha sido registrado correctamente",
      });
    }
    return res.status(400).json({
      _type: "error",
      _detail:
        "Ya existe el producto, no puede registrar algo que ya está registrado",
    });
  },

  _createMultiple: async (req, res) => {
    const { _productIds, _productStocks, _stock, _amount } = req.body;
    // console.log(_productIds, _productStocks, _stock, _amount);
    const _result = [];

    for (const _i in _productIds) {
      const _productStock = _productStocks[_i] + _stock;
      const _productId = _productIds[_i];
      // update stock product
      const _product = await _updateProductStock(_productId, _productStock);
      // mng(update or create) price
      _product._updatedPrice = await _mngPriceProduct(_productId, _amount);
      _result.push(_product);
    }

    res.send(_result);
    // console.log('hola')
  },

  distribute: async (req, res) => {},

  add: async (req, res) => {},

  red: async (req, res) => {
    const products = await Product.find();
    return res.json(products);
  },

  redFull: async (req, res) => {
    const _products = await Product.find();
    const _fullItems = await _fGetFullProducts(_products);
    return res.status(200).json(_fullItems);
  },

  update: async (req, res) => {
    const _id = req.body._id;
    const _idParmas = req.params._id;
    // console.log(_id)
    console.log(typeof _id, typeof _idParmas);
    console.log(_id === _idParmas);
    const hh = _idParmas.trim();

    console.log(_id === hh);
    const _saved = await Product.find({ _id: hh });

    res.send(_saved);
  },
};
