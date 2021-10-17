import { Router } from "express";
import controllerHeadquarter from "../../controllers/headquarter/controller.headquarter.js";

const router = Router();

// Create
router.post("/", controllerHeadquarter.create);

// Read all
router.get("/", controllerHeadquarter.red);

export default router;
