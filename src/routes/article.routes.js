import { Router } from "express";
import { createArticle, getallArticles, getbyidArticle, updateArticle, deleteArticle } from "../controllers/article.controller.js";

import { validateArticleId, createArticleValidation, updateArticleValidation } from "../validators/article.validator.js";
import { handleErrors } from "../middlewares/handleErrors.middleware.js";
import { authMiddleware, ownerMiddleware } from "../middlewares/auth.middleware.js";

const articleRouter = Router();

articleRouter.get("/", getallArticles);

articleRouter.get("/:id", validateArticleId, getbyidArticle);

articleRouter.post("/", authMiddleware, createArticleValidation, createArticle);


articleRouter.put("/:id", authMiddleware, ownerMiddleware, validateArticleId, updateArticleValidation, updateArticle);

articleRouter.delete("/:id", authMiddleware, ownerMiddleware, validateArticleId, deleteArticle);

export default articleRouter;
