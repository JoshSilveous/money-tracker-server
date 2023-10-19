import { RequestHandler } from 'express'
import isTypeProfile from '../../../isTypeProfile'
import decryptToken from '../../../token/decryptToken'
import { deleteUser } from '../../../database'
import validateToken from '../../../token/validateToken'

const handleDeleteUser: RequestHandler = function (req, res) {
	// make sure data is in correct shape
	if (!isTypeProfile(req.body, 'UserGetRequest')) {
		res.statusCode = 406
		res.statusMessage = 'ERROR_REQUEST_FORMAT'
		res.send()
		return
	}

	const data = req.body as UserGetRequest

	const tokenIsValid = validateToken(data.username, data.token, res)

	// check for issues decrypting token
	if (tokenIsValid) {
		const user_id = (decryptToken(data.token) as TokenData).user_id

		try {
			deleteUser(user_id)
			res.statusCode = 200
			res.send()
		} catch (e) {
			if ((e as Error).message === 'user_id not found') {
				res.statusCode = 400
				res.statusMessage = 'ERROR_ID_NOT_FOUND'
				res.send()
			} else {
				res.statusCode = 500
				res.statusMessage = 'ERROR_SERVER:' + e
				res.send()
			}
		}
	}
}

export default handleDeleteUser
