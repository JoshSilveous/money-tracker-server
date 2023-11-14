import { RequestHandler } from 'express-serve-static-core'
import isTypeProfile from '../../../isTypeProfile'
import { getUser } from '../../../database'
import encryptToken from '../../token/encryptToken'

/**
 * Handles HTTP Request for `/loginuser`
 */
export const handleLoginUser: RequestHandler = function (req, res) {
	// make sure data is in correct shape
	if (!isTypeProfile(req.body, 'UserCredentials')) {
		res.statusCode = 406
		res.statusMessage = 'ERROR_REQUEST_FORMAT'
		res.send()
		return
	}

	const data = req.body as UserCredentials

	try {
		// attempt to get user info from database
		const userInfo = getUser(data)

		// if user found, generate a token and send it to the user
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
