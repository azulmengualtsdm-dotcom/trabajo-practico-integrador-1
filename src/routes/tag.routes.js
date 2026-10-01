import { Router } from "express";
import { createtag, getalltags, updatetag, deleteTag, getbyIdTag } from "../controllers/tag.controller.js";

import { validateTagId, createTagValidation } from "../validators/tag.validator.js";
import { handleErrors } from "../middlewares/handleErrors.middleware.js";

import { authMiddleware, adminMiddleware } from "../middlewares/auth.middleware.js";

const tagRouter = Router();

tagRouter.get("/", getalltags);
tagRouter.get("/:id", validateTagId, getbyIdTag);

tagRouter.post("/", authMiddleware, adminMiddleware, createTagValidation, createtag);

tagRouter.put("/:id", authMiddleware, adminMiddleware, validateTagId, updatetag);

tagRouter.delete("/:id", authMiddleware, adminMiddleware, validateTagId,  deleteTag);

export default tagRouter;
