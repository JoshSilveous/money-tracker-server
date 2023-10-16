import { RequestHandler } from 'express'
import isTypeProfile from '../../../isTypeProfile'
import decryptToken from '../../../token/decryptToken'
import { insertCategory } from '../../../database'
import validateToken from '../../../token/validateToken'
import encryptToken from '../../../token/encryptToken'

const handleInsertCategory: RequestHandler = function (req, res) {
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
	if (!isTypeProfile(data.payload, 'NewCategory')) {
		res.statusCode = 406
		res.send({
			description: 'ERROR_REQUEST_FORMAT',
			message: 'Category data in incorrect format.',
		})
		return
	}

	const tokenIsValid = validateToken(data.username, data.token, res)

	if (tokenIsValid) {
		const inputCategory = data.payload as NewCategory
		const user_id = (decryptToken(data.token) as TokenData).user_id
		const refreshedToken = encryptToken({
			user_id: user_id,
			username: data.username,
		})

		try {
			const newCategoryID = insertCategory(user_id, inputCategory)
			res.statusCode = 200
			res.statusMessage = 'SUCCESS'
			res.send({
				newCategoryID: newCategoryID,
				refreshedToken: refreshedToken,
			})
		} catch (e) {
			const errMsg = (e as Error).message
			if (errMsg === 'UNIQUE constraint failed: categories.name') {
				res.statusCode = 406
				res.statusMessage = 'ERROR_DUPLICATE_NAME'
				res.send()
			} else {
				res.statusCode = 500
				res.statusMessage = 'Unexpected server error: ' + e
				res.send()
			}
		}
	}
}

export default handleInsertCategory
