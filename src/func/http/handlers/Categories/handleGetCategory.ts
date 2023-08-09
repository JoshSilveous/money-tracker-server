import { RequestHandler } from 'express'
import isTypeProfile from '../../../isTypeProfile'
import decryptToken from '../../../token/decryptToken'
import { getCategory } from '../../../database'

const handleGetCategory: RequestHandler = function (req, res) {
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
	if (!isTypeProfile(data.payload, 'CategoryID')) {
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
	const inputCategory = data.payload as CategoryID

	try {
		const category = getCategory(
			decryptedToken.user_id!,
			inputCategory.category_id
		)
		res.statusCode = 200
		res.send({
			description: 'SUCCESS',
			message: 'Data successfully retrieved',
			category: category,
		})
	} catch (e) {
		if ((e as Error).message === 'category_id not found') {
			res.statusCode = 400
			res.send({
				description: 'ERROR_ID_NOT_FOUND',
				message: `Category ID ${inputCategory.category_id} not found.`,
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

export default handleGetCategory
