import product from "./product/route.index.js";
import worker from "./worker/route.index.js";
import headquarter from "./headquarter/route.index.js";
import saleOrder from "./saleOrder/route.index.js";
import price from "./price/route.index.js";
import all from "./route.all.js";
import auth from "./auth/auth.route.js";
import user from "./auth/user.route.js";
import kindUser from "./auth/kindUser.route.js";
import userHeadquarter from "./auth/userHeadquarter.route.js"

export default {
  product,
  worker,
  headquarter,
  saleOrder,
  price,
  all,
  auth,
  user,
  kindUser,
  userHeadquarter
};
