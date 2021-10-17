import { _fGetComponentByIdHs } from "../headquarter/function.productHeadquarter.js";
import { _fArrUnique } from "./function.common.js";

export const _fGetDebuggedSizeByIdHs = async (_idHeadquarter) => {
  const _sizeByIdHs = await _fGetComponentByIdHs(_idHeadquarter, "size");
  const _debuggedSizeByIdHs = _fArrUnique(_sizeByIdHs);
  console.log(_sizeByIdHs);
  // console.log(_.isEqual(null,undefined))
  return _debuggedSizeByIdHs;
};
