import { Router } from "express";
import controllerPrice from "../../controllers/price/controller.price.js";

const router = Router();

// Create
router.post("/", controllerPrice.create);

// Create multiple
router.post("/multiple", controllerPrice._createMultiple);

// Create
router.put("/updateById/:_idPrice", controllerPrice.update);

// Read full prices by _idProduct
router.get(
  "/readFullPricesByIdProduct/:_idProduct",
  controllerPrice.readFullPricesByIdProduct
);

// Read all
router.get("/", controllerPrice.red);

// Read all full
router.get("/full", controllerPrice._readFull);

export default router;
