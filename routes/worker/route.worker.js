import { Router } from "express";
import controllerWorker from "../../controllers/worker/controller.worker.js";

const router = Router();

// Create
router.post("/", controllerWorker.create);

// Read all
router.get("/", controllerWorker.red);

export default router;