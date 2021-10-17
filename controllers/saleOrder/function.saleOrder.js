// import DetailSO from "../../models/saleOrder/model.detailSaleOrder.js";
// import ProductH from "../../models/headquarter/model.productHeadquarter.js";
// import { _fDeleteManyByIdSO } from "./function.detailSaleOrder.js";
// import SaleOrderxd from "../../models/SaleOrder/model.saleOrder.js";

// delete sale order by id sale order
// export const _fDeleteOneByIdSO = async (_idSaleOrder) => {
  // await _fDeleteManyByIdSO(_idSaleOrder);
  // await SaleOrderxd.deleteOne({ _id: _idSaleOrder });

  // ALGORITHM
  // update the stock
  // delete each detail associated with the detailso
  // the last deletation
  // DetailSO.deleteOne({ _id: _idSaleOrder });
  // DONT FORGET: IN THE FRONTEND U SHOULD UPDATE THE _IDSALESTORE SAVED
  // IN THE LOCAL STORAGE
// };

// KEEP IN MIND THIS GLOBAL STRUCTURE FOR THE PROJECT
// CONTROLLER LAYER, MODEL LAYER AND FUNTION LAYER
// MODEL IS CONECTED WITH THE FUNCTION AND THE FUNCTION WITH THE CONTROLLER
// EACH COMPONENT IN LAYER CAN COMUNICATE WITH THEM
// CONTROLLER AND MODELS FOR THE MOMENT DOSENT HAVE COMMUNICATION
// THERE'RE OTHER CONNECTIONS
