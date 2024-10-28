import joi from "joi";
import { objectIdValidation } from "../../middlewares/validation.middleware.js";
export const register = joi
  .object({
    name: joi.string().required(),
    phoneNumber: joi.string().min(11).max(15),
    email: joi.string().email().required(),
    university: joi.string().required(),
    major: joi.string().required(),
    academicYear: joi.string().required(),
    preference: joi.string().required(),
  })
  .required();
export const updatePart = joi
  .object({
    id: joi.string().custom(objectIdValidation).required(),
    status: joi.string().required(),
  })
  .required();
export const deletePart = joi
  .object({
    id: joi.string().custom(objectIdValidation).required()
  })
  .required();
