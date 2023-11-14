import { RequestHandler } from 'express-serve-static-core'
import isTypeProfile from '../../../isTypeProfile'
import { createUser } from '../../../database'
import Joi from 'joi'

const schema = Joi.object({
	username: Joi.string().alphanum().min(8).max(30).required(),
	password: Joi.string().min(8).max(30).required(),
})

/**
 * Handles HTTP Request for `/createuser`
 */
export const handleCreateUser: RequestHandler = function (req, res) {
	// make sure data is in correct shape
	if (!isTypeProfile(req.body, 'UserCredentials')) {
		res.statusCode = 406
		res.statusMessage = 'ERROR_REQUEST_FORMAT'
		res.send()
		return
	}

	const data = req.body as UserCredentials

	// check username for illegal characters
	const cleanedUsername = data.username.replace(
		/[!@#$%^&*(){}[\]<>\/\\'\"|?=+~`:,; \t\n\r]/g,
		''
	)
	if (data.username !== cleanedUsername) {
		res.statusCode = 406
		res.statusMessage = 'ERROR_REQUEST_FORMAT'
		res.send()
	}

	// check password for illegal characters
	const cleanedPassword = data.password.replace(
		/[!@#$%^&*(){}[\]<>\/\\'\"|?=+~`:,; \t\n\r]/g,
		''
	)
	if (data.password !== cleanedPassword) {
		res.statusCode = 406
		res.statusMessage = 'ERROR_REQUEST_FORMAT'
		res.send()
	}

	// check username length
	if (data.username.length <= 8 || data.username.length > 30) {
		res.statusCode = 406
		res.statusMessage = 'ERROR_REQUEST_FORMAT'
		res.send()
	}

	// check password length
	if (data.password.length <= 8 || data.password.length > 30) {
		res.statusCode = 406
		res.statusMessage = 'ERROR_REQUEST_FORMAT'
		res.send()
	}

	try {
		// attempt creating user in database
		createUser(data)

		// if success, send response
		res.statusCode = 201
		res.statusMessage = 'ACCOUNT_CREATED'
		res.send()
	} catch (e) {
		// if failure, check if UNIQUE constraint was violated
		const errMsg = (e as Error).message

		if (errMsg === 'UNIQUE constraint failed: user.username') {
			res.statusCode = 406
			res.statusMessage = 'ERROR_DUPLICATE_USERNAME'
			res.send()
		} else {
			// if not a SQL UNIQUE error, must be server issue, notify user
			res.statusCode = 500
			res.statusMessage = 'ERROR_SERVER: ' + e
			res.send()
		}
	}
}
