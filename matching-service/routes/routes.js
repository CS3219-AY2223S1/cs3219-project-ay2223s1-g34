import express from "express";

import { submitMatch } from "../controller/matching-controller.js";
import { submitMatch as validateSubmitMatch } from "./validation.js";

var router = express.Router();

router.post("/", validateSubmitMatch, submitMatch);

export default router;
