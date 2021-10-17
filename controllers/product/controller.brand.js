import Brand from "../../models/product/model.brand.js";
import { _fGetDebuggedBrandByIdHs } from "./function.brand.js";

export default {
  create: async (req, res) => {
    try {
      const { _name } = req.body;
      const newBrand = new Brand({
        _name,
      });

      const savedBrand = await newBrand.save();

      res.status(200).json(savedBrand);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  redByHeadquarter: async (req, res) => {
    const _idHeadquarter = req.params._idHeadquarter;
    const _brands = await _fGetDebuggedBrandByIdHs(_idHeadquarter);
    // console.log(_idHeadquarter)
    return res.json(_brands);
  },

  red: async (req, res) => {
    const _brands = await Brand.find();
    return res.json(_brands);
  },
};
