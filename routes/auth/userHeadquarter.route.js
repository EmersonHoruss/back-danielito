import { Router } from "express";
import ctrl from "../../controllers/auth/userHeadquarter.controller.js";

const router = Router();

// Create
router.post("/", ctrl._create);

// Read all
router.get("/", ctrl._read);

export default router;
