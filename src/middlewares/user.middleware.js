import usermodel from "../models/users.model";
import { body } from "express-validator";

export const validatebodyuser=[
    body("username").notEmpty().withMessage("el nombre no debe estar vacio").custom()
]