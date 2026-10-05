import { Router } from "express";
import { createUserValidation, updateUserValidation, validateUserId, handleErrors } from "../middlewares/user.middleware.js";
import { register, login, getUser, updateProfile, logout} from "../controllers/auth.controller.js";
import { createUser } from "../controllers/user.controllers.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const routerAuth=Router()

routerAuth.post('/register', createUserValidation, handleErrors, register)
routerAuth.post('/login', login)
routerAuth.get('/profile', authMiddleware, getUser)
routerAuth.put('/profile', authMiddleware, updateUserValidation, handleErrors, updateProfile)
routerAuth.post('/logout', authMiddleware, logout)

export default routerAuth