import Product from "../../models/product/model.product.js";
import {
  _fGetFullProducts,
  _fExistProduct,
  _fCreateWithNoId,
} from "./function.product.js";

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
      );
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
    const updatedLink = await Product.findByIdAndUpdate(
      req.params._id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedProduct)
    // res.status(204).json(req.params.id); the 204 code means that the resquest have been succesfully but u cant send any content
  },
};
