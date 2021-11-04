import SaleOrder from "../../models/saleOrder/model.saleOrder.js";
import Worker from "../worker/controller.worker.js";
import DetailSO from "../../models/saleOrder/model.detailSaleOrder.js";
import Client from "../../models/saleOrder/model.client.js";
import Headquarter from "../../models/headquarter/model.headquarter.js";
// import Usereadquarter from "../../models/auth/userHeadquarter.model.js";

import {
  _fDeleteManyByIdSO,
  _fGetfullDetailSOsByIdSO,
} from "./function.detailSaleOrder.js";

const _fExists = async (_id) => {
  const saleOrder = await SaleOrder.findById(_id);
  return saleOrder ? true : false;
};

// If we have created a sale order and never used this function
// to us to use recovering the sale orders didn't use
const _fCheckFreeSaleOrder = async () => {
  const saleOrder = await SaleOrder.find({
    _id: { $exists: true },
    _idClient: { $exists: false },
    _idSeller: { $exists: false },
    _idDebtCollector: { $exists: false },
  });
  return saleOrder.length ? saleOrder : false;
};

// Conditions to take the sale order
const _fCanTake = async (_id) => {
  const saleOrder = await SaleOrder.find({
    _id,
    _idClient: { $exists: false },
    _idSeller: { $exists: false },
  });
  return saleOrder.length;
};

// Conditions to collect the sale order
const _fCanCollect = async (_id) => {
  const saleOrder = await SaleOrder.find({
    _id,
    _idSeller: { $exists: true },
    _idClient: { $exists: false },
    _idDebtCollector: { $exists: false },
  });
  return saleOrder.length;
};

// Error in taking the sale order
const _fErrorTaking = async (_id, _idWorker) => {
  return !(await _fCanTake(_id))
    ? "Error: Pedido de venta ya tiene cliente y/o vendedor"
    : (await Worker._fIsSeller(_idWorker))
    ? true
    : "Error: para tomar el pedido el trabajador debe ser un vendedor";
};

// Error in collecting the sale order
const _fErrorCollecting = async (_id, _idWorker) => {
  return !(await _fCanCollect(_id))
    ? "Error: No puede pagar porque el pedido de venta no tiene ni cliente ni vendedor"
    : (await Worker._fIsDebtCollector(_idWorker))
    ? true
    : "Error: El cobro del pedido debe ser realizado por el cobrador";
};

// Management error such us in the taking and
// collection a sale order
const _fManagementErrors = async (_id, _idWorker, take = true) => {
  return !(await _fExists(_id))
    ? "Error! No existe orden de venta"
    : take
    ? await _fErrorTaking(_id, _idWorker)
    : await _fErrorCollecting(_id, _idWorker);
};

const _fSaleOrderVacuo = async () => {};

const _getDetails = async (_saleOrders) => {
  const _detailsToPush = [];
  for (const _item of _saleOrders) {
    const _details = await DetailSO.find({
      _idSaleOrder: _item._id,
    });
    _detailsToPush.push(_details);
  }
  return _detailsToPush;
};

const _getClients = async (_saleOrders) => {
  const _clients = [];
  for (const _item of _saleOrders) {
    const _client = await Client.findById(_item._idClient);
    _clients.push(_client);
  }
  return _clients;
};

function _plus(total, num) {
  return total + num;
}

const _getFullSOs = async (_saleOrders) => {
  const _fullSOs = [];
  const _details = await _getDetails(_saleOrders);
  const _clients = await _getClients(_saleOrders);

  for (const key in _details) {
    const _saleOrder = JSON.parse(JSON.stringify(_saleOrders[key]));
    _saleOrder._details = _details[key];
    _saleOrder._total = _details[key]
      .map((e) => e._price * e._amount)
      .reduce((total, num) => total + num);
    _saleOrder._client = _clients[key];
    _saleOrder._detailsFull = await _fGetfullDetailSOsByIdSO(_saleOrder._id);
    const _idHeadquarter =
      _saleOrder._detailsFull[0]._productHeadquarter._idHeadquarter;
    _saleOrder._headquarter = await Headquarter.findById(_idHeadquarter);
    _fullSOs.push(_saleOrder);
  }
  return _fullSOs;
};

export default {
  start: async (req, res) => {
    try {
      const { _idHeadquarter, _dateSeller } = req.body;
      const newSaleOrder = new SaleOrder({ _idHeadquarter, _dateSeller });

      const savedSaleOrder = await newSaleOrder.save();

      res.status(200).json(savedSaleOrder);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  // Just exists two kind of operations: at the moment when you take
  // the order and when you take the money of the order
  take: async (req, res) => {
    const { _id, _idSeller, _idClient } = req.body;
    // const _aroseError = await _fManagementErrors(_id, _idSeller);
    // console.log(_aroseError);
    // const _msje =
    //   typeof _aroseError === "string"
    //     ? _aroseError
    // : await SaleOrder.findByIdAndUpdate(
    const _msje = await SaleOrder.findByIdAndUpdate(
      _id,
      {
        $set: { _idSeller, _idClient },
      },
      {
        new: true,
      }
    );
    res.status(200).json(_msje);
  },

  deleteByIdSO: async (req, res) => {
    const _idSaleOrder = req.params._idSaleOrder;
    await _fDeleteManyByIdSO(_idSaleOrder);
    await SaleOrder.deleteOne({ _id: _idSaleOrder });
    res.status(200).json({ message: "Request Succesfully" });
  },

  redNonPaid: async (req, res) => {
    const _nonPaidSaleOrders = await SaleOrder.find({
      _idSeller: { $nin: [null, undefined] },
      _idDebtCollector: { $in: [null, undefined] },
    });
    // const _client = ''
    // _nonPaidSaleOrdersFull[0]._xxx = "xxx";
    // console.log(_nonPaidSaleOrdersFull);

    const _gotFullSOs = await _getFullSOs(_nonPaidSaleOrders);
    // console.log(xx);
    return res.json(_gotFullSOs);
  },

  collect: async (req, res) => {
    const { _id, _idDebtCollector, _dateCollect } = req.body;

    const _so = await SaleOrder.findById(_id);
    // console.log(_so);
    const _collect = _so._idDebtCollector ? false : true;
    // console.log(_collect);
    const _result = { _error: true, _msje: "" };

    if (_collect) {
      const _msje = await SaleOrder.findByIdAndUpdate(
        _id,
        {
          $set: { _idDebtCollector, _dateCollect },
        },
        {
          new: true,
        }
      );
      _result._msje = _msje;
      _result._error = false;
    }

    res.status(200).json(_result);
  },

  redPaid: async (req, res) => {
    const paidSaleOrders = await SaleOrder.find({
      _idDebtCollector: { $nin: [null, undefined] },
    });
    return res.json(paidSaleOrders);
  },

  deliver: async (req, res) => {
    const { _id, _idDeliver, _dateDeliver } = req.body;
    const _so = await SaleOrder.findById(_id);
    // console.log(_so);
    const _deliver = _so._idDeliver ? false : true;
    // console.log(_deliver);
    const _result = { _error: true, _msje: "" };

    if (_deliver) {
      const _msje = await SaleOrder.findByIdAndUpdate(
        _id,
        {
          $set: { _idDeliver, _dateDeliver },
        },
        {
          new: true,
        }
      );
      _result._msje = _msje;
      _result._error = false;
    }

    res.status(200).json(_result);
  },

  readWithStatus: async (req, res) => {
    const _status = ["Para cobrar", "Para entregar", "Entregado"];

    const _salesOrder = await SaleOrder.find();
    const _depuredSO = _salesOrder.filter((e) => e._idClient);
    const _gotFullSOs = await _getFullSOs(_depuredSO);
    for (const _item in _gotFullSOs) {
      _gotFullSOs[_item]._idDeliver
        ? (_gotFullSOs[_item]._status = _status[2])
        : _gotFullSOs[_item]._idDebtCollector
        ? (_gotFullSOs[_item]._status = _status[1])
        : (_gotFullSOs[_item]._status = _status[0]);
    }

    return res.json(_gotFullSOs);
  },

  red: async (req, res) => {
    const salesOrder = await SaleOrder.find();
    return res.json(salesOrder);
  },

  readById: async (req, res) => {
    const _idSaleOrder = req.params._idSaleOrder;
    const salesOrder = await SaleOrder.findById(_idSaleOrder);
    return res.json(salesOrder);
    // console.log('aa')
  },

  _dailySales: async (req, res) => {
    // const { _dateStart, _dateEnd } = req.body;
    // const _dateS = new Date(_dateStart);
    // const _dateE = new Date(_dateEnd);
    // console.log(_dateS, _dateE);
    // const _result = await SaleOrder.find({});
    // res.send(_result);
    // const _result2 = _result.filter((e) => {
    //   e._dateCollect ? true : false;
    // });
    // const _result2 = _result.filter((e) => {
    //   console.log(e._dateCollect);
    //   console.log(_dateS >= e._dateCollect);
    //   console.log(_dateE <= e._dateCollect);
    // });
  },
};
