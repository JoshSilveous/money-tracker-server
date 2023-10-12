import { RequestHandler } from 'express-serve-static-core'
import isTypeProfile from '../../../isTypeProfile'
import { getUser } from '../../../database'
import encryptToken from '../../../token/encryptToken'

const handleLoginUser: RequestHandler = function (req, res) {
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

		// if user doesn't exist, send error
		if (userInfo === undefined) {
			res.statusCode = 406
			res.statusMessage = 'ERROR_CREDENTIALS'
			res.send()
		} else {
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
		}
	} catch (e) {
		// any errors that may occur are server-side
		// send error to user for notification
		res.statusCode = 500
		res.statusMessage = e
		res.send()
	}
}

export default handleLoginUser
