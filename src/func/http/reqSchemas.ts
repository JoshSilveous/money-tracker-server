import Joi from 'joi'

export const usernameSchema = Joi.string().alphanum().min(8).max(30).required()

export const passwordSchema = Joi.string().min(8).max(30).required()

export const tokenSchema = Joi.object({
	user_id: Joi.number(),
	username: usernameSchema,
	iat: Joi.number(),
	exp: Joi.number(),
})

export const privateGetSchema = Joi.object({})
