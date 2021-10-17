import { _fGetComponentByIdHs } from "../headquarter/function.productHeadquarter.js";
import { _fArrUnique } from "./function.common.js";

export const _fGetDebuggedCategoryByIdHs = async (_idHeadquarter) => {
  const _categoryByIdHs = await _fGetComponentByIdHs(
    _idHeadquarter,
    "category"
  );
  const _debuggedCategoryByIdHs = _fArrUnique(_categoryByIdHs);
  console.log(_categoryByIdHs);
  // console.log(_.isEqual(null,undefined))
  return _debuggedCategoryByIdHs;
};
