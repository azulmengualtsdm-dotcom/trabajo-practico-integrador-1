import { Router } from "express";
import { createArticle, getallArticle, getbyidArticle, updateArticle, deleteArticle } from "../controllers/article.controller.js";

import { validateArticleId, createArticleValidation, updateArticleValidation } from "../middlewares/article.middleware.js";

import { authMiddleware, ownerMiddleware } from "../middlewares/auth.middleware.js";

const articleRouter = Router();

articleRouter.get("/", getallArticle);

articleRouter.get("/:id", validateArticleId, getbyidArticle);

articleRouter.post("/", authMiddleware, createArticleValidation, createArticle);


articleRouter.put("/:id", authMiddleware, ownerMiddleware, validateArticleId, updateArticleValidation, updateArticle);

articleRouter.delete("/:id", authMiddleware, ownerMiddleware, validateArticleId, deleteArticle);

export default articleRouter;
