import { Router } from "express";
import controllerProductHeadquarter from "../../controllers/headquarter/controller.productHeadquarter.js";

const router = Router();

// Create
router.post("/", controllerProductHeadquarter.create);

// Update
router.put(
  "/updateById/:_idProductH",
  controllerProductHeadquarter.updateOneById
);

// Read By brand, category and size
router.get(
  "/readByBrandCategorySize/:_idHeadquarter/:_idBrand/:_idCategory/:_idSize",
  controllerProductHeadquarter.readByBrandCategorySize
);

// Read all
router.get("/", controllerProductHeadquarter.red);

// Read full
router.get("/full/:_idHeadquarter", controllerProductHeadquarter.redFull);

export default router;
