import _ from "underscore";

export const _fArrUnique = (arr) => {
  const cleaned = [];
  arr.forEach(function (itm) {
    let unique = true;
    cleaned.forEach(function (itm2) {
      if (_.isEqual(itm, itm2)) unique = false;
    });
    if (unique) cleaned.push(itm);
  });
  return cleaned;
};
