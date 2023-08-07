import { RequestHandler } from 'express'
import isTypeProfile from '../../../isTypeProfile'
import decryptToken from '../../../token/decryptToken'
import { updateCategory } from '../../../database'

const handleUpdateCategory: RequestHandler = function (req, res) {
	// make sure data is in correct shape
	if (!isTypeProfile(req.body, 'UserPostRequest')) {
		res.statusCode = 406
		res.send({
			description: 'ERROR_REQUEST_FORMAT',
			message:
				'Incorrect data sent. Either keys or value types are incorrect',
		})
		return
	}
	const data = req.body as UserPostRequest

	// make sure provided NewCategory is in correct format
	if (!isTypeProfile(data.payload, 'Category')) {
		res.statusCode = 406
		res.send({
			description: 'ERROR_REQUEST_FORMAT',
			message: 'Category data in incorrect format.',
		})
		return
	}

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

	const decryptedToken = decryptToken(data.token) as TokenData
	// check if token payload matches format
	if (!isTypeProfile(decryptedToken, 'TokenData')) {
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
	const inputCategory = data.payload as Category

	try {
		updateCategory(decryptedToken.user_id!, inputCategory)
		res.statusCode = 200
		res.send({
			description: 'SUCCESS',
			message: 'Data successfully updated',
		})
	} catch (e) {
		res.statusCode = 500
		res.send({
			description: 'ERROR_SERVER',
			message: 'Unexpected server error: ' + e,
		})
	}
}

export default handleUpdateCategory
