import { Router } from "express";
import controllerClient from "../../controllers/saleOrder/controller.client.js";

const router = Router();

// Create
router.post("/", controllerClient.create);

// Update
router.put("/:_id", controllerClient.update);

// Read By Name and DNI
router.get("/readByNameDNI/:_name/:_DNI", controllerClient.redByNameDNI);

// Read all
router.get("/", controllerClient.red);

export default router;
