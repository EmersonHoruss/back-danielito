import DetailSO from "../../models/saleOrder/model.detailSaleOrder.js";
import _FProductH from "../headquarter/function.productHeadquarter.js";

import {
  _fGetfullDetailSOsByIdSO,
  _fDeleteOneById,
} from "./function.detailSaleOrder.js";

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

  // create: async (req, res) => {
  //   try {
  //     const { _price, _amount, _idProductHeadquarter, _idSaleOrder } = req.body;
  //     const newDetailSaleOrder = new DetailSO({
  //       _price,
  //       _amount,
  //       _idProductHeadquarter,
  //       _idSaleOrder,
  //     });

  //     const _msje = await newDetailSaleOrder.save();

  //     res.json(_msje);
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).json(error);
  //   }
  // },

  update: async (req, res) => {
    const {
      _idDetailSaleOrder: _id,
      _amount,
      _idProductHeadquarter: _idProductH,
    } = req.body;

    const _detailSO = await DetailSO.find({ _id });
    const _lastAmount = _detailSO._amount;

    const _msje = await _FProductH._fUpdate(_lastAmount, _amount, _idProductH);
    res.json(_msje);
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
};
