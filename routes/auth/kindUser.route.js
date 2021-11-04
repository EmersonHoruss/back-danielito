// const Users = require("../../controllers/auth/auth.controller");

// const h = (router) => {
//   router.post("/register", Users.createUser);
//   router.post("/login", Users.loginUser);
// };

// export default h;

import { Router } from "express";
import ctrl from "../../controllers/auth/kindUser.controller.js";

const router = Router();

// Create
router.post("/", ctrl._create);

// Read all
router.get("/", ctrl._read);

export default router;
