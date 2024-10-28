import { Router } from "express";
import { validation } from "../../middlewares/validation.middleware.js";
import * as authController from './auth.controller.js'
import * as authSchema from './auth.schema.js'
import { isAuthenticated } from "../../middlewares/authentication.middleware.js";
import { isAuthorized } from "../../middlewares/authorization.middleware.js";
const router = Router();
// create 
router.post(
    '/create',
    authController.create
)
// login
router.post(
    '/login',
    validation(authSchema.login),
    authController.login
)

export default router;