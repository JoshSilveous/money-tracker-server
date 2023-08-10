import { RequestHandler } from 'express'
import isTypeProfile from '../../../isTypeProfile'
import decryptToken from '../../../token/decryptToken'
import { insertCategory } from '../../../database'
import validateToken from '../../../token/validateToken'

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

		try {
			const newCategoryID = insertCategory(user_id, inputCategory)
			res.statusCode = 200
			res.send({
				description: 'SUCCESS',
				message: 'Data successfully inserted',
				newCategoryID: newCategoryID,
			})
		} catch (e) {
			res.statusCode = 500
			res.send({
				description: 'ERROR_SERVER',
				message: 'Unexpected server error: ' + e,
			})
		}
	}
}

export default handleInsertCategory
