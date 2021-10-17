import { Router } from "express";
import controllerKindPrice from "../../controllers/price/controller.kindPrice.js";

const router = Router();

// Create
router.post("/", controllerKindPrice.create);

// Read all
router.get("/", controllerKindPrice.red);

export default router;