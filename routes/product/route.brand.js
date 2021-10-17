import { Router } from "express";
import controllerBrand from "../../controllers/product/controller.brand.js";

const router = Router();

// Create
router.post("/", controllerBrand.create);

// Read all by headquarter
router.get("/headquarter/:_idHeadquarter", controllerBrand.redByHeadquarter);

// Read all
router.get("/", controllerBrand.red);

export default router;
