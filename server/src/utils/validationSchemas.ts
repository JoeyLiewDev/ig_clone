import Joi from "@hapi/joi";

export const register = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(32),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required(),
});

export const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(32),
});
