import UserH from "../../models/auth/userHeadquarter.model.js";
import Headquarter from "../../models/headquarter/model.headquarter.js";

export const _getFullHeadquarter = async (_idUser) => {
  const _userH = await UserH.find({ _idUser });
  const _userH1 = _userH[0];
  console.log(_userH1);
};
