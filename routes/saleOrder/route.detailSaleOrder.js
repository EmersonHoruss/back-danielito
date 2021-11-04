import { Router } from "express";
import detailSaleOrder from "../../controllers/saleOrder/controller.detailSaleOrder.js";

const router = Router();

// Create
router.post("/", detailSaleOrder.create);

// Create
router.post("/plusAmount", detailSaleOrder.createPlusAmount);

// Update
router.put("/", detailSaleOrder.update);

// Update plus
router.put("/plusAmount", detailSaleOrder.updatePlusAmount);

// Read all
router.get("/", detailSaleOrder.red);

// Read detail sale orders by _idSaleOrder
router.get(
  "/readByIdSaleOrder/:_idSaleOrder",
  detailSaleOrder.readByIdSaleOrder
);

// Read full detail sale orders by _idSaleOrder
router.get(
  "/readFullByIdSaleOrder/:_idSaleOrder",
  detailSaleOrder.readFullByIdSaleOrder
);

router.delete("/deleteOneById/:_idDetailSO", detailSaleOrder.deleteOneById);

router.post("/createOrUpdate", detailSaleOrder._createOrUpdate);

export default router;
