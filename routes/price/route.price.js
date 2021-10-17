import { Router } from "express";
import controllerPrice from "../../controllers/price/controller.price.js";

const router = Router();

// Create
router.post("/", controllerPrice.create);

// Create
router.put("/updateById/:_idPrice", controllerPrice.update);

// Read full prices by _idProduct
router.get(
  "/readFullPricesByIdProduct/:_idProduct",
  controllerPrice.readFullPricesByIdProduct
);

// Read all
router.get("/", controllerPrice.red);

export default router;
