import { body, param } from "express-validator";
import article from "../models/article.model";

import { body, param } from "express-validator";
import Article from "../models/article.model.js";

export const validateArticleId = [
  param("id")
    .isInt({ min: 1 }).withMessage("El ID del artículo debe ser un número entero positivo")
    .custom(async (id) => {
      const articleExists = await article.findByPk(id);
      if (!articleExists) {
        throw new Error(`El artículo con el ID ${id} no existe en la base de datos`);
      }
      return true;
    })
];

export const createArticleValidation = [
  body("title")
    .notEmpty().withMessage("El título del artículo es obligatorio")
    .isLength({ min: 3, max: 200 }).withMessage("El título debe tener entre 3 and 200 caracteres"),

  body("content")
    .notEmpty().withMessage("El contenido del artículo es obligatorio")
    .isLength({ min: 50 }).withMessage("El contenido debe tener al menos 50 caracteres"),

  body("excerpt")
    .optional()
    .isLength({ max: 500 }).withMessage("El resumen no puede superar los 500 caracteres"),

  body("status")
    .optional()
    .isIn(["published", "archived"]).withMessage("El estado solo permite los valores 'published' o 'archived'")
];

export const updateArticleValidation = [
  body("title")
    .optional()
    .isLength({ min: 3, max: 200 }).withMessage("El título debe tener entre 3 and 200 caracteres"),

  body("content")
    .optional()
    .isLength({ min: 50 }).withMessage("El contenido debe tener al menos 50 caracteres"),

  body("excerpt")
    .optional()
    .isLength({ max: 500 }).withMessage("El resumen no puede superar los 500 caracteres"),

  body("status")
    .optional()
    .isIn(["published", "archived"]).withMessage("El estado solo permite los valores 'published' o 'archived'")
];
