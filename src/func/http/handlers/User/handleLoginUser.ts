import { RequestHandler } from 'express-serve-static-core'
import isTypeProfile from '../../../isTypeProfile'
import { getUser } from '../../../database'
import encryptToken from '../../../token/encryptToken'

const handleLoginUser: RequestHandler = function (req, res) {
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

	try {
		// attempt to get user info from database
		const userInfo = getUser(data)

		// if user doesn't exist, send error
		if (userInfo === undefined) {
			res.statusCode = 406
			res.send({
				description: 'ERROR_CREDENTIALS',
				message: 'Credentials provided do not match any records',
			})
		} else {
			// if user found, generate a token and send it to the user
			const token = encryptToken({
				user_id: userInfo.user_id,
				username: userInfo.username,
			})
			res.statusCode = 200
			res.send({
				description: 'SUCCESS',
				message: 'Login OK',
				token: token,
			})
		}
	} catch (e) {
		// any errors that may occur are server-side
		// send error to user for notification
		res.statusCode = 500
		res.send({
			description: 'ERROR_SERVER',
			message: e,
		})
	}
}

export default handleLoginUser
