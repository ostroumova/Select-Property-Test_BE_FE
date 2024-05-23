import { Router } from "express";

import multer from "multer";

import { getProperties, postProperty } from "../controllers/properties";

const router = Router();
const upload = multer();

router.get("/", getProperties);
router.post("/", upload.any(), postProperty);

export default router;
