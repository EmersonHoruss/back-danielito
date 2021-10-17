import { Router } from "express";
import controllerCategory from "../../controllers/product/controller.category.js";

const router = Router();

// Create
router.post("/", controllerCategory.create);

// Read all by headquarter
router.get("/headquarter/:_idHeadquarter", controllerCategory.redByHeadquarter);

// Read all
router.get("/", controllerCategory.red);

export default router;