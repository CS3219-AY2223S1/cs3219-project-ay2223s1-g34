import { body } from "express-validator";

import DIFFICULTY_LEVELS from "../util/enums.js";

export const submitMatch = [
    body("socketId").exists().isString().isLength(20),
    body("email").exists().isEmail(),
    body("emailToInvite").optional({ checkFalsy: true }).isEmail(),
    body("difficultyLevel").exists().isIn(Object.keys(DIFFICULTY_LEVELS)),
    body("createdAt").exists().isISO8601().toDate(),
];
