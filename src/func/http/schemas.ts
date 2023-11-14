import Joi from 'joi'

export const usernameSchema = Joi.string().alphanum().min(8).max(30).required()
export const passwordSchema = Joi.string().min(8).max(30).required()
export const tokenSchema = Joi.object({
	user_id: Joi.number().required(),
	username: usernameSchema.required(),
	iat: Joi.number().required(),
	exp: Joi.number().required(),
})

export const newTransactionSchema = Joi.object<NewTransaction>({
	name: Joi.string().required(),
	timestamp: Joi.string().required(),
	notes: Joi.string().allow(null),
	amount: Joi.number().required(),
	category_id: Joi.number().allow(null),
	account_id: Joi.number().allow(null),
})

export const transactionSchema = Joi.object<Transaction>({
	transaction_id: Joi.number().required(),
	name: Joi.string().required(),
	timestamp: Joi.string().required(),
	notes: Joi.string().allow(null),
	amount: Joi.number().required(),
	category_id: Joi.number().allow(null),
	account_id: Joi.number().allow(null),
})
