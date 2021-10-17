import { _fGetComponentByIdHs } from "../headquarter/function.productHeadquarter.js";
import { _fArrUnique } from "./function.common.js";

export const _fGetDebuggedBrandByIdHs = async (_idHeadquarter) => {
  const _brandByIdHs = await _fGetComponentByIdHs(_idHeadquarter);
  const _debuggedBrandByIdHs = _fArrUnique(_brandByIdHs);
  console.log(_brandByIdHs);
  // console.log(_.isEqual(null,undefined))
  return _debuggedBrandByIdHs;
};
