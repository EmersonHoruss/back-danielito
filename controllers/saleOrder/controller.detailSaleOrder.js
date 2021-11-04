import DetailSO from "../../models/saleOrder/model.detailSaleOrder.js";
import _FProductH from "../headquarter/function.productHeadquarter.js";
import { _fGetPrice } from "../price/function.price.js";
// impor from "../"
import {
  _fGetfullDetailSOsByIdSO,
  _fDeleteOneById,
} from "./function.detailSaleOrder.js";
import ProductH from "../../models/headquarter/model.productHeadquarter.js";

export default {
  create: async (req, res) => {
    try {
      const { _price, _amount, _idProductHeadquarter, _idSaleOrder } = req.body;
      let _msje = await _FProductH._fUpdate(0, _amount, _idProductHeadquarter);
      // console.log(_msje)
      if (typeof _msje !== typeof "") {
        const newDetailSaleOrder = new DetailSO({
          _price,
          _amount,
          _idProductHeadquarter,
          _idSaleOrder,
        });

        // console.log(_msje)

        _msje = await newDetailSaleOrder.save();
      }

      // res.json(_msje);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  createPlusAmount: async (req, res) => {
    try {
      const { _amount, _idProductHeadquarter, _idSaleOrder } = req.body;
      const _productH = await ProductH.findById(_idProductHeadquarter);
      const _stock = _productH._stock;
      const _possibleCreate = _stock >= _amount;
      const _objectReturned = { _msje: "", _error: false };

      if (_possibleCreate) {
        let _msje = await _FProductH._fUpdate(
          0,
          _amount,
          _idProductHeadquarter
        );
        const _price = await _fGetPrice(_idProductHeadquarter, _amount);

        if (typeof _msje !== typeof "") {
          const newDetailSaleOrder = new DetailSO({
            _price,
            _amount,
            _idProductHeadquarter,
            _idSaleOrder,
          });

          _msje = await newDetailSaleOrder.save();
        }
        _objectReturned._msje = _msje;
        _objectReturned._error = false;
      } else {
        _objectReturned._error = true;
      }

      res.json(_objectReturned);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  update: async (req, res) => {
    const {
      _idDetailSaleOrder: _id,
      _amount,
      _idProductHeadquarter: _idProductH,
    } = req.body;

    const _detailSO = await DetailSO.find({ _id });
    //updateDSO
    const _lastAmount = _detailSO._amount;

    const _msje = await _FProductH._fUpdate(_lastAmount, _amount, _idProductH);
    res.json(_msje);
  },

  updatePlusAmount: async (req, res) => {
    const { _idSaleOrder, _amount, _idProductHeadquarter } = req.body;

    console.log("UPDATE");
    const _detailSOList = await DetailSO.find({
      _idProductHeadquarter,
      _idSaleOrder,
    });
    // console.log(_amount);
    const _detailSO = await _detailSOList[0];
    const _lastAmount = _detailSO._amount;
    const _requiredAmount = _lastAmount + _amount;
    // console.log(_idSaleOrder, _amount, _idProductHeadquarter, _requiredAmount);
    const _msje = await _FProductH._fUpdate(
      _lastAmount,
      _requiredAmount,
      _idProductHeadquarter
    );
    console.log(_msje);
    let _objectReturned = {};
    if (_msje === "ERROR: amount is bigger") {
      _objectReturned._error = true;
    } else {
      //get current price
      const _price = await _fGetPrice(_idProductHeadquarter, _requiredAmount);
      // updateDSO
      await DetailSO.findByIdAndUpdate(
        _detailSO._id,
        {
          $set: { _amount: _requiredAmount, _price },
        },
        {
          new: true,
        }
      );
      const _xx = JSON.parse(JSON.stringify(_msje));
      _xx._error = false;
      _objectReturned = _xx;
    }
    // console.log(_objectReturned);
    res.json(_objectReturned);
  },

  red: async (req, res) => {
    const allDetails = await DetailSO.find({});
    return res.json(allDetails);
  },

  readByIdSaleOrder: async (req, res) => {
    const _idSaleOrder = req.params._idSaleOrder;
    const detailsSaleOrder = await DetailSO.find({ _idSaleOrder });
    return res.json(detailsSaleOrder);
  },

  readFullByIdSaleOrder: async (req, res) => {
    const _idSaleOrder = req.params._idSaleOrder;
    // console.log(_idSaleOrder?true:false);

    const _detailSOs =
      _idSaleOrder !== "null"
        ? await _fGetfullDetailSOsByIdSO(_idSaleOrder)
        : [];

    return res.json(_detailSOs);
  },

  deleteOneById: async (req, res) => {
    const _idDetailSO = req.params._idDetailSO;
    await _fDeleteOneById(_idDetailSO);
    return res.json("successfully query");
  },

  _createOrUpdate: async (req, res) => {
    const { _idProductHeadquarter, _idSaleOrder } = req.body;
    const _detailSO = await DetailSO.find({
      _idProductHeadquarter,
      _idSaleOrder,
    });
    const _returnedValue = {};
    if (_detailSO.length !== 0) {
      _returnedValue._create = false;
      _returnedValue._udpate = true;
    } else {
      _returnedValue._create = true;
      _returnedValue._udpate = false;
      console.log(_detailSO);
    }
    res.json(_returnedValue);
  },
};
