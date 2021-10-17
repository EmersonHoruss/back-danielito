// const Users = require("../../controllers/auth/auth.controller");
import Users from "../../controllers/auth/auth.controller.js";

const h = (router) => {
  router.post("/register", Users.createUser);
  router.post("/login", Users.loginUser);
};

export default h;
