import Client from "../models/saleOrder/model.client.js";
import SaleOrder from "../models/saleOrder/model.saleOrder.js";
import DetailSaleOrder from "../models/saleOrder/model.detailSaleOrder.js";

import Worker from "../models/worker/model.worker.js";

import Brand from "../models/product/model.brand.js";
import Category from "../models/product/model.category.js";
import Product from "../models/product/model.product.js";
import Size from "../models/product/model.size.js";

import Headquarter from "../models/headquarter/model.headquarter.js";
import ProductHeadquarter from "../models/headquarter/model.productHeadquarter.js";

import Price from "../models/price/model.price.js";
import KindPrice from "../models/price/model.kindPrice.js";

export default {
  red: async (req, res) => {
    const all = {
      Client: await Client.find(),
      SaleOrder: await SaleOrder.find(),
      DetailSaleOrder: await DetailSaleOrder.find(),
      Worker: await Worker.find(),
      Brand: await Brand.find(),
      Category: await Category.find(),
      Product: await Product.find(),
      Size: await Size.find(),
      Headquarter: await Headquarter.find(),
      ProductHeadquarter: await ProductHeadquarter.find(),
      Price: await Price.find(),
      KindPrice: await KindPrice.find(),
    };
    return res.json(all);
  },
};
