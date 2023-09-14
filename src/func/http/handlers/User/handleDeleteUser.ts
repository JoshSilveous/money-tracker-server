import { RequestHandler } from 'express'
import isTypeProfile from '../../../isTypeProfile'
import decryptToken from '../../../token/decryptToken'
import { deleteUser } from '../../../database'
import validateToken from '../../../token/validateToken'

const handleDeleteUser: RequestHandler = function (req, res) {
	// make sure data is in correct shape
	if (!isTypeProfile(req.body, 'UserGetRequest')) {
		res.statusCode = 406
		res.send({
			description: 'ERROR_REQUEST_FORMAT',
			message:
				'Incorrect data sent. Either keys or value types are incorrect',
		})
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
			res.send({
				description: 'SUCCESS',
				message: 'User successfully deleted',
			})
		} catch (e) {
			if ((e as Error).message === 'user_id not found') {
				res.statusCode = 400
				res.send({
					description: 'ERROR_ID_NOT_FOUND',
					message: `User ID ${user_id} not found.`,
				})
			} else {
				res.statusCode = 500
				res.send({
					description: 'ERROR_SERVER',
					message: 'Unexpected server error: ' + e,
				})
			}
		}
	}
}

export default handleDeleteUser
