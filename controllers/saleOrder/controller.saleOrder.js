import SaleOrder from "../../models/saleOrder/model.saleOrder.js";
import Worker from "../worker/controller.worker.js";

import { _fDeleteManyByIdSO } from "./function.detailSaleOrder.js";

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

export default {
  start: async (req, res) => {
    try {
      const newSaleOrder = new SaleOrder({});

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

    const _aroseError = await _fManagementErrors(_id, _idSeller);
    const _msje =
      typeof _aroseError === "string"
        ? _aroseError
        : await SaleOrder.findByIdAndUpdate(
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
    const nonPaidSaleOrders = await SaleOrder.find({
      _idSeller: { $nin: [null, undefined] },
      _idDebtCollector: { $in: [null, undefined] },
    });
    return res.json(nonPaidSaleOrders);
  },

  collect: async (req, res) => {
    const { _id, _idDebtCollector } = req.body;
    const _aroseError = await _fManagementErrors(_id, _idDebtCollector, false);
    const _msje =
      typeof _aroseError === "string"
        ? _aroseError
        : await SaleOrder.findByIdAndUpdate(
            _id,
            {
              $set: { _idDebtCollector },
            },
            {
              new: true,
            }
          );
    res.status(200).json(_msje);
  },

  redPaid: async (req, res) => {
    const paidSaleOrders = await SaleOrder.find({
      _idDebtCollector: { $nin: [null, undefined] },
    });
    return res.json(paidSaleOrders);
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
};
