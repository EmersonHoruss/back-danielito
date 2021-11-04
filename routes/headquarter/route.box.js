import { Router } from "express";
import ctrl from "../../controllers/headquarter/controller.box.js";

const router = Router();

// Create
router.post("/", ctrl.create);

// Read all
router.get("/", ctrl.red);

export default router;
