import joi from 'joi'
export const login = joi.object({
  email : joi.string().required(),
  password : joi.string().required()
}).required();