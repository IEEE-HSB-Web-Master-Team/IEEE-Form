import { Router } from "express";
import { validation } from "../../middlewares/validation.middleware.js";
import * as partController from './part.controller.js'
import * as partSchema from './part.schema.js'
import { isAuthenticated } from "../../middlewares/authentication.middleware.js";
import { isAuthorized } from "../../middlewares/authorization.middleware.js";
const router = Router();
// register 
router.post('/register',
    validation(partSchema.register),
    partController.register
)
// update 
router.patch('/:id',
    isAuthenticated,
    validation(partSchema.updatePart),
    partController.updatePart
)
// get all parts
router.get(
    '/allparts',
    isAuthenticated,
    isAuthorized("hr","admin"),
    partController.getAllParts
)
// search
router.get(
    '/search',
    isAuthenticated,
    partController.search
)
// delete
router.delete('/:id',
    isAuthenticated,
    isAuthorized("hr","admin"),
    validation(partSchema.deletePart),
    partController.deletePart
)

export default router;