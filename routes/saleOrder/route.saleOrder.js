import { Router } from "express";
import controllerSaleOrder from "../../controllers/saleOrder/controller.saleOrder.js";

const router = Router();

// Start sale order
router.post("/", controllerSaleOrder.start);

// Update a sale order when you register for first time
router.delete("/deleteOne/:_idSaleOrder", controllerSaleOrder.deleteByIdSO);

// Update a sale order when you register for first time
router.put("/take", controllerSaleOrder.take);

// Red all non paid sale orders
router.get("/nonPaid", controllerSaleOrder.redNonPaid);

// Red all non paid sale orders
router.put("/collect", controllerSaleOrder.collect);

// Red all paid sale orders
router.get("/paid", controllerSaleOrder.redPaid);

// Read all
router.get("/", controllerSaleOrder.red);

// Read all
router.get("/readById/:_idSaleOrder", controllerSaleOrder.readById);

export default router;
