import { Router } from "express";
import { register, login, getProfile, updateProfile, logout} from "../controllers/auth.controller.js";
import { createUserValidation, updateUserValidation, validateUserId } from "../middlewares/user.middleware.js";
import  authMiddleware, { adminMiddleware }  from "../middlewares/auth.middleware.js";

const routerAuth=Router()

routerAuth.post('/register', createUserValidation, register)
routerAuth.post('/login', login)
routerAuth.get('/profile', authMiddleware, adminMiddleware , getProfile)
routerAuth.put('/profile', authMiddleware, updateUserValidation, validateUserId, updateProfile)
routerAuth.post('/logout', authMiddleware, logout)
