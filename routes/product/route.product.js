import { Router } from "express";
import controllerProduct from "../../controllers/product/controller.product.js";

const router = Router();

// Create
router.post("/", controllerProduct.create);

// Create
router.post("/createWithNoId", controllerProduct.createWithNoId);

// Read all
router.get("/", controllerProduct.red);

// Read full
router.get("/full", controllerProduct.redFull);

// put
router.put("/:_id", controllerProduct.update);
export default router;
