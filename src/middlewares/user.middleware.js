import usermodel from "../models/users.model.js";
import { body, param } from "express-validator";
import { validationResult } from "express-validator";

// 🚨 COLECTOR DE ERRORES CENTRALIZADO
export const handleErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            errors: errors.array().map(err => ({ campo: err.path, mensaje: err.msg })) 
        });
    }
    next();
};

// 🔍 VALIDADOR DE URL PARAM ID
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

// 🛡️ ADUANA INDESTRUCTIBLE DE CREACIÓN / REGISTRO
export const createUserValidation = [
  body("username")
    .trim()
    .notEmpty().withMessage("El nombre de usuario es obligatorio")
    .isAlphanumeric().withMessage("El nombre de usuario solo debe contener letras y números")
    .isLength({ min: 3, max: 20 }).withMessage("El nombre de usuario debe tener entre 3 and 20 caracteres")
    .custom(async (username) =>  {
        if (!username) return true;
        const userExists = await usermodel.findOne({ where: { username } });
        if (userExists) {
          throw new Error("El nombre de usuario ya se encuentra registrado");
        }
        return true;
    }),

  body("email")
    .trim()
    .notEmpty().withMessage("El correo electrónico es obligatorio")
    .isEmail().withMessage("Debe ingresar un formato de correo válido")
    .custom(async (email) => {
      if (!email) return true;
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
    .trim()
    .notEmpty().withMessage("El nombre es obligatorio"),

  body("last_name")
    .trim()
    .notEmpty().withMessage("El apellido es obligatorio"),

  // 🌟 ¡LA LÍNEA REVOLUCIONARIA! Le damos permiso en el Registro para que matchedData deje pasar el rol limpio
  body("role")
    .optional()
    .trim()
    .isIn(["user", "admin"]).withMessage("El rol solo permite los valores 'user' o 'admin'")
];

// ✏️ ADUANA INDESTRUCTIBLE DE EDICIÓN / PUT
export const updateUserValidation = [
  body("username")
    .optional()
    .trim()
    .isAlphanumeric().withMessage("El nombre de usuario solo debe contener letras y números")
    .isLength({ min: 3, max: 20 }).withMessage("El nombre de usuario debe tener entre 3 and 20 caracteres"),

  body("email")
    .optional()
    .trim()
    .isEmail().withMessage("Debe ingresar un formato de correo válido"),

  body("password")
    .optional()
    .isLength({ min: 8 }).withMessage("La contraseña debe tener una longitud mínima de 8 caracteres"), 

  body("role")
    .optional()
    .trim()
    .isIn(["user", "admin"]).withMessage("El rol solo permite los valores 'user' o 'admin'"),

  body("first_name")
    .optional()
    .trim()
    .notEmpty().withMessage("El nombre no puede estar vacío"),

  body("last_name")
    .optional()
    .trim()
    .notEmpty().withMessage("El apellido no puede estar vacío")
];
