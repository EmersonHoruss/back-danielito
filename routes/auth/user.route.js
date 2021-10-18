// const Users = require("../../controllers/auth/auth.controller");

// const h = (router) => {
//   router.post("/register", Users.createUser);
//   router.post("/login", Users.loginUser);
// };

// export default h;

import { Router } from "express";
import controllerUser from "../../controllers/auth/auth.controller.js";

const router = Router();

// Create
router.post("/register", controllerUser.createUser);

// Read all
// router.post("/", controllerUser.loginUser);

export default router;
