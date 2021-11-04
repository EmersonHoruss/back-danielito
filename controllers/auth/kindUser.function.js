import KindUser from "../../models/auth/kindUser.model.js";

export const _getNameById = async (_idKindUser) => {
  //   console.log(_idKindUser);
  const _kindUser = await KindUser.findById(_idKindUser);
  //   console.log(_kindUser);
  return _kindUser._name;
};

export const _getNameById2 = async (_idKindUser) => {
  //   console.log(_idKindUser);
  const _kindUser = await KindUser.findById(_idKindUser);
  //   console.log(_kindUser);
  return _kindUser;
};
