import { Router } from "express";
import controllerAll from "../controllers/controller.all.js";

const router = Router();

// Read all
router.get("/", controllerAll.red);

export default router;