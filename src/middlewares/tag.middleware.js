import { body, param } from "express-validator";
import tagmodel from "../models/tag.model.js";

export const validateTagId = [
  param("id")
    .isInt({ min: 1 }).withMessage("El ID de la etiqueta debe ser un número entero positivo")
    .custom(async (id) => {
      const tagExists = await tag.findByPk(id);
      if (!tagExists) {
        throw new Error(`La etiqueta con el ID ${id} no existe en la base de datos`);
      }
      return true;
    })
];

export const createTagValidation = [
  body("name")
    .notEmpty().withMessage("El nombre de la etiqueta es obligatorio")
    .isLength({ min: 2, max: 30 }).withMessage("El nombre de la etiqueta debe tener entre 2 and 30 caracteres")
    .custom((value) => {
      if (/\s/.test(value)) {
        throw new Error("El nombre de la etiqueta no debe contener espacios en blanco");
      }
      return true;
    })
    .custom(async (name) => {
      const tagExists = await tagmodel.findOne({ where: { name } });
      if (tagExists) {
        throw new Error("Ya existe una etiqueta registrada con ese mismo nombre");
      }
      return true;
    })
];
