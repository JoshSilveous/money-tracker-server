import { RequestHandler } from 'express-serve-static-core'
import isTypeProfile from '../../../isTypeProfile'
import { createUser } from '../../../database'

const handleCreateUser: RequestHandler = function (req, res) {
	// make sure data is in correct shape
	if (!isTypeProfile(req.body, 'UserCredentials')) {
		res.statusCode = 406
		res.send({
			description: 'ERROR_REQUEST_FORMAT',
			message:
				'Incorrect data sent. Either keys or value types are incorrect',
		})
		return
	}

	const data = req.body as UserCredentials

	// check password strength (NOT IMPLEMENTED YET)

	try {
		// attempt creating user in database
		const newUserID = createUser(data)

		// if success, notify user
		res.json({ description: 'SUCCESS', message: 'Account created.' })
	} catch (e) {
		// if failure, check if UNIQUE constraint was violated

		res.statusCode = 406
		const errMsg = (e as Error).message
		if (errMsg === 'UNIQUE constraint failed: user.username') {
			res.send({
				description: 'ERROR_DUPLICATE_USERNAME',
				message: 'Username already taken.',
			})
		} else if (errMsg === 'UNIQUE constraint failed: user.password') {
			res.send({
				description: 'ERROR_DUPLICATE_PASSWORD',
				message: 'Password already taken.',
			})
		} else {
			// if not a SQL UNIQUE error, must be server issue, notify user
			res.statusCode = 500
			res.send({
				description: 'ERROR_SERVER',
				message: e,
			})
		}
	}
}

export default handleCreateUser
