import Joi from 'joi'

export const usernameSchema = Joi.string().min(8).max(30).required()
export const passwordSchema = Joi.string().min(8).max(30).required()
export const tokenSchema = Joi.object({
	user_id: Joi.number().required(),
	username: usernameSchema.required(),
	iat: Joi.number().required(),
	exp: Joi.number().required(),
})

export const credentialsSchema = Joi.object<UserCredentials>({
	username: usernameSchema,
	password: passwordSchema,
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
	notes: Joi.string().allow(null).required(),
	amount: Joi.number().required(),
	category_id: Joi.number().allow(null).required(),
	account_id: Joi.number().allow(null).required(),
})

export const newCategorySchema = Joi.object<NewCategory>({
	name: Joi.string().required(),
	description: Joi.string().allow(null).required(),
})

export const categorySchema = Joi.object<Category>({
	category_id: Joi.number().required(),
	name: Joi.string().required(),
	description: Joi.string().allow(null).required(),
})

export const newAccountSchema = Joi.object<NewAccount>({
	name: Joi.string().required(),
	description: Joi.string().allow(null).required(),
})

export const accountSchema = Joi.object<Account>({
	account_id: Joi.number().required(),
	name: Joi.string().required(),
	description: Joi.string().allow(null).required(),
})
