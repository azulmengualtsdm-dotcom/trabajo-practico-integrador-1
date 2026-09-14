import usermodel from "../models/users.model";
import { body, param } from "express-validator";

export const validateUserId = [
  param("id")
    .isInt({ min: 1 }).withMessage("El ID del usuario debe ser un número entero positivo")
    .custom(async (id) => {
      const userExists = await usermodel.findByPk(id);
      if (!userExists) {
        throw new Error(`El usuario con el ID ${id} no existe en la base de datos`);
      }
      return true;
    })
];

export const createUserValidation = [
  body("username")
    .notEmpty().withMessage("El nombre de usuario es obligatorio")
    .isAlphanumeric().withMessage("El nombre de usuario solo debe contener letras y números")
    .isLength({ min: 3, max: 20 }).withMessage("El nombre de usuario debe tener entre 3 and 20 caracteres")
    .custom(async (username) => {
      const userExists = await usermodel.findOne({ where: { username } });
      if (userExists) {
        throw new Error("El nombre de usuario ya se encuentra registrado");
      }
      return true;
    }),

  body("email")
    .notEmpty().withMessage("El correo electrónico es obligatorio")
    .isEmail().withMessage("Debe ingresar un formato de correo válido")
    .custom(async (email) => {
      const emailExists = await usermodel.findOne({ where: { email } });
      if (emailExists) {
        throw new Error("El correo electrónico ya se encuentra registrado");
      }
      return true;
    }),

  body("password")
    .notEmpty().withMessage("La contraseña es obligatoria")
    .isLength({ min: 8 }).withMessage("La contraseña debe tener una longitud mínima de 8 caracteres"),

  body("first_name")
    .notEmpty().withMessage("El nombre es obligatorio"),

  body("last_name")
    .notEmpty().withMessage("El apellido es obligatorio")
];

export const updateUserValidation = [
  body("username")
    .optional()
    .isAlphanumeric().withMessage("El nombre de usuario solo debe contener letras y números")
    .isLength({ min: 3, max: 20 }).withMessage("El nombre de usuario debe tener entre 3 and 20 caracteres"),

  body("email")
    .optional()
    .isEmail().withMessage("Debe ingresar un formato de correo válido"),

  body("password")
    .optional()
    .isLength({ min: 8 }).withMessage("La contraseña debe tener una longitud mínima de 8 caracteres")
];