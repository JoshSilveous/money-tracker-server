import { RequestHandler } from 'express'
import { isTypeProfile } from '../../../TypeChecking'
import decryptToken from '../../token/decryptToken'
import { getUserData } from '../../database'

const handleRequestData: RequestHandler = function (req, res) {
	// make sure data is in correct shape
	if (!isTypeProfile(req.body, 'UserDataRequest')) {
		res.statusCode = 406
		res.send({
			description: 'ERROR_REQUEST_FORMAT',
			message:
				'Incorrect data sent. Either keys or value types are incorrect',
		})
		return
	}

	const data = req.body as UserDataRequest

	// check for issues decrypting token
	try {
		decryptToken(data.token)
	} catch (e) {
		res.statusCode = 406
		if ((e as Error).message === 'jwt expired') {
			res.send({
				description: 'ERROR_TOKEN_EXPIRED',
				message: 'Token expired.',
			})
		} else {
			res.send({
				description: 'ERROR_TOKEN_FORMAT',
				message: 'Unexpected error decrypting token: ' + e,
			})
		}
		return
	}

	const decryptedToken = decryptToken(data.token) as UserInfo & TokenData
	// check if token payload matches format
	if (!isTypeProfile(decryptedToken, 'UserInfo & TokenData')) {
		res.statusCode = 406
		res.send({
			description: 'ERROR_TOKEN_FORMAT',
			message: 'Invalid token data',
		})
		return
	}

	// check if token username matches provided username
	if (decryptedToken.username !== data.username) {
		res.statusCode = 406
		res.send({
			description: 'ERROR_TOKEN_FORMAT',
			message: 'Token does not match provided username',
		})
		return
	}

	// request is valid at this point
	try {
		const userData = getUserData(decryptedToken.user_id)
		res.statusCode = 200
		res.send({
			description: 'SUCCESS',
			message: 'Data successfully retrieved',
			data: userData,
		})
	} catch (e) {
		res.statusCode = 500
		res.send({
			description: 'ERROR_SERVER',
			message: 'Unexpected server error: ' + e,
		})
	}
}

export default handleRequestData
