import { RequestHandler } from 'express-serve-static-core'
import { getUser } from '../../../database'
import encryptToken from '../../token/encryptToken'
import { credentialsSchema } from '../../schemas'

/**
 * Handles HTTP Request for `/loginuser`
 */
export const handleLoginUser: RequestHandler = function (req, res) {
	const credentials = req.body as UserCredentials

	if (credentialsSchema.validate(req.body).error) {
		res.statusCode = 406
		res.statusMessage = 'ERROR_REQUEST_FORMAT'
		res.send()
		return
	}

	try {
		const userInfo = getUser(credentials)

		const token = encryptToken({
			user_id: userInfo.user_id,
			username: userInfo.username,
		})

		res.statusCode = 200
		res.statusMessage = 'SUCCESS'
		res.send({
			token: token,
		})
	} catch (e) {
		if (e.message === 'User does not exist') {
			res.statusCode = 406
			res.statusMessage = 'ERROR_INCORRECT_USERNAME'
			res.send()
		} else if (e.message === 'Incorrect password') {
			res.statusCode = 406
			res.statusMessage = 'ERROR_INCORRECT_PASSWORD'
			res.send()
		} else {
			res.statusCode = 500
			res.statusMessage = 'ERROR_SERVER:' + e
			res.send()
		}
	}
}
