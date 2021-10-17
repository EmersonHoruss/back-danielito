import ProductH from "../../models/headquarter/model.productHeadquarter.js";
import Validation from "../../library/validations.js";
import { _fGetFullProductHs } from "./function.productHeadquarter.js";

// if headquarter and product already exists create error otherwise rigester
// const _fCheckCreate = async (_idHeadquarter, _idProduct) => {
//   return await Validation._fExist({ _idHeadquarter, _idProduct });
// };

const _fSaveProductH = async (_save) => {
  const newProductH = new ProductH(_save);
  return await newProductH.save();
};

const _fStringNull = (_string) => {
  return _string === "null" ? true : false;
};

const _fFilterByBrand = (_fullProductHs, _idBrand) => {
  return _fullProductHs.filter(
    (_fullProductH) => _fullProductH._product._brand._id === _idBrand
  );
  // console.log("RESULT BRAND", h);
  
};

const _fFilterByCategory = (_fullProductHs, _idCategory) => {
  return _fullProductHs.filter(
    (_fullProductH) => _fullProductH._product._category._id === _idCategory
  );
};

const _fFilterBySize = (_fullProductHs, _idSize) => {
  return _fullProductHs.filter(
    (_fullProductH) => _fullProductH._product._size._id === _idSize
  );
};

const _fGetReadedByBrandCategorySize = (
  _fullProductHs,
  _idBrand,
  _idCategory,
  _idSize
) => {
  let _result = JSON.parse(JSON.stringify(_fullProductHs));
  const _isIdBrandNull = _fStringNull(_idBrand),
    _isIdCategoryNull = _fStringNull(_idCategory),
    _isIdSizeNull = _fStringNull(_idSize);

    // console.log(_result[0]._product)
  if (_fullProductHs.length === 0) return [];
  if (_isIdBrandNull && _isIdCategoryNull && _isIdSizeNull) return [];
  if (!_isIdBrandNull) _result = _fFilterByBrand(_result, _idBrand);
  if (!_isIdCategoryNull) _result = _fFilterByCategory(_result, _idCategory);
  if (!_isIdSizeNull) _result = _fFilterBySize(_result, _idSize);

  // console.log('RESULT BRAND GETTING', _result)
  // _result = _fFilterByCategory(_result, _idCategory);
  // _result = _fFilterBySize(_result, _idSize);
  return _result;
};

export default {
  create: async (req, res) => {
    try {
      const { _stock, _idHeadquarter, _idProduct } = req.body;
      const _save = { _stock, _idHeadquarter, _idProduct };
      const _alreadyExists = await Validation._fManageExist(
        {
          _idHeadquarter,
          _idProduct,
        },
        ProductH,
        false
      );
      const _msje = Validation._fHasError(_alreadyExists)
        ? _alreadyExists
        : await _fSaveProductH(_save);

      res.status(200).json(_msje);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  readByBrandCategorySize: async (req, res) => {
    const { _idHeadquarter, _idBrand, _idCategory, _idSize } = req.params;
    console.log(req.params);
    const _productHs = await ProductH.find({
      _idHeadquarter,
    });
    const _fullProductHs = await _fGetFullProductHs(_productHs);

    const _productsByBrandCategorySize = _fGetReadedByBrandCategorySize(
      _fullProductHs,
      _idBrand,
      _idCategory,
      _idSize
    );

    res.status(200).json(_productsByBrandCategorySize);
  },

  red: async (req, res) => {
    const productsH = await ProductH.find();
    return res.json(productsH);
  },

  redProductsByHeadquarter: async (req, res) => {
    const _idHeadquarter = req.params._idHeadquarter;
    const productsH = await ProductH.find({
      _idHeadquarter,
    });
    return res.json(productsH);
  },

  // not yet implemented
  updateOneById: async (req, res) => {
    // try {
    const _idProductH = req.params._idProductH;
    // const { _lastAmount, _requiredAmount } = req.body;
    const { _stock } = req.body;

    const _updatedProduct = await ProductH.findByIdAndUpdate(
      { _id: _idProductH },
      { _stock },
      { new: true }
    );

    res.send(_updatedProduct);
    // } catch (error) {
    //   console.log(error);
    //   return res.status(500).json(error);
    // }
  },

  redFull: async (req, res) => {
    const _idHeadquarter = req.params._idHeadquarter;
    const _productHs = await ProductH.find({
      _idHeadquarter,
    });
    const _fullItems = await _fGetFullProductHs(_productHs);
    return res.status(200).json(_fullItems);
  },
};

// If we have still product we can distribute
// update: async (req, res) => {
//   const { _stock, _idHeadquarter, _idProduct } = req.body;
//   const canDistribute = await _fcanDistribute(_stock, _idProduct);
//   if (canDistribute) {
//     const productHeadquarter = await updateStock(
//       _stock,
//       _idHeadquarter,
//       _idProduct
//     );
//     res.send(productHeadquarter);
//   }
//   res.send(
//     "Error! You can't distribute product bacause your input stock is bigger or all the products have beend distributed"
//   );
// },

// reduceStock: async (_idProductHeadquarter, _amount) => {
//   const productHeadquarter = await ProductHeadquarter.findById(
//     _idProductHeadquarter
//   );
//   const validation = productHeadquarter._stock - _amount;
//   const msje =
//     validation < 0
//       ? "Error: amount is bigger than current product's stock in the headquarter"
//       : (updatedProductHeadquarter =
//           await ProductHeadquarter.findByIdAndUpdate(
//             _idProductHeadquarter,
//             {
//               $set: { _stock: validation },
//             },
//             {
//               new: true,
//             }
//           ));

//   return msje;
// },
