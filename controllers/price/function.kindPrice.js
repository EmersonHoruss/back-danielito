import KindPrice from "../../models/price/model.kindPrice.js";

// FUNCTIONS
export const _fGetKindPrice = async (_idKindPrice) => {
  const _kindPrice = await KindPrice.findById(_idKindPrice);
  //   console.log(_kindPrice)
  return _kindPrice;
};

export const _fGetKindPriceByName = async (_nameKindPrice) => {
  const _kindPrice = await KindPrice.find({ _name: _nameKindPrice });
  //   console.log(_kindPrice)
  return _kindPrice[0];
};

export const _fGetAllKindPrices = async (_idKindPrice) => {
  const _kindPrices = await KindPrice.find();
  //   console.log(_kindPrice)
  return _kindPrices;
};
