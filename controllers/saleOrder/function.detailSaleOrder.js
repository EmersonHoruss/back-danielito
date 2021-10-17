import DetailSO from "../../models/saleOrder/model.detailSaleOrder.js";
import ProductH from "../../models/headquarter/model.productHeadquarter.js";

import {
  _fGetFullProductH,
  _fUpdateStockDeleting,
} from "../headquarter/function.productHeadquarter.js";

export const _fGetFullDetailSO = async (_detailSO) => {
  const _fullDetailSO = JSON.parse(JSON.stringify(_detailSO));
  const _idProductH = _fullDetailSO._idProductHeadquarter;
  const _productH = await ProductH.findById(_idProductH);

  _fullDetailSO._productHeadquarter = await _fGetFullProductH(_productH);
  delete _fullDetailSO._idProductHeadquarter;

  return _fullDetailSO;
};

export const _fGetfullDetailSOsByIdSO = async (_idSaleOrder) => {
  const _detailSOs = await DetailSO.find({ _idSaleOrder });
  const _fullDetailSOs = [];

  for (const _detailSO of _detailSOs) {
    const _fullDetailSO = await _fGetFullDetailSO(_detailSO);
    _fullDetailSOs.push(_fullDetailSO);
  }

  return _fullDetailSOs;
};

// delete the detail sale order by its id and update the stock
export const _fDeleteOneById = async (_idDetailSO) => {
  const _detailSO = await DetailSO.findById(_idDetailSO);
  const _amount = _detailSO._amount;
  const _idProductH = _detailSO._idProductHeadquarter;

  await _fUpdateStockDeleting(_idProductH, _amount);
  await DetailSO.deleteOne({ _id: _idDetailSO });
};

// delete all the details sale order but just if the parameter is
// the id of the sale order
export const _fDeleteByIdSO = async (_idSaleOrder) => {
  const _detailSO = await DetailSO.findById(_idSaleOrder);
  // const _amount
  // await Link.findByIdAndDelete(_idDetailSO);
};

// delete all the details sale order but just if the parameter is
// a full detail sale order
export const _fDeleteOneByDSO = async (_detailSO) => {
  const _amount = _detailSO._amount;
  const _idProductH = _detailSO._idProductHeadquarter;
  const _idDetailSO = _detailSO._id;

  await _fUpdateStockDeleting(_idProductH, _amount);
  await DetailSO.deleteOne({ _id: _idDetailSO });
};

export const _fDeleteManyByIdSO = async (_idSaleOrder) => {
  const _manyDetailSO = await DetailSO.find({ _idSaleOrder });
  for (const _detailSO of _manyDetailSO) await _fDeleteOneByDSO(_detailSO);
};
