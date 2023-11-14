import { RequestHandler } from 'express-serve-static-core'
import { createUser } from '../../../database'
import { credentialsSchema } from '../../schemas'

/**
 * Handles HTTP Request for `/createuser`
 */
export const handleCreateUser: RequestHandler = function (req, res) {
	const credentials = req.body as UserCredentials

	if (credentialsSchema.validate(req.body)) {
		res.statusCode = 406
		res.statusMessage = 'ERROR_REQUEST_FORMAT'
		res.send()
		return
	}

	try {
		createUser(credentials)

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
