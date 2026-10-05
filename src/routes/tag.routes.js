import { Router } from "express";
import { createtag, getalltag, updatetag, deleteTag, getbyIdTag } from "../controllers/tag.controllers.js";

import { validateTagId, createTagValidation } from "../middlewares/tag.middleware.js"


import { authMiddleware, adminMiddleware } from "../middlewares/auth.middleware.js";

const tagRouter = Router();

tagRouter.get("/", getalltag);
tagRouter.get("/:id", validateTagId, getbyIdTag);

tagRouter.post("/", authMiddleware, adminMiddleware, createTagValidation, createtag);

tagRouter.put("/:id", authMiddleware, adminMiddleware, validateTagId, updatetag);

tagRouter.delete("/:id", authMiddleware, adminMiddleware, validateTagId,  deleteTag);

export default tagRouter;
