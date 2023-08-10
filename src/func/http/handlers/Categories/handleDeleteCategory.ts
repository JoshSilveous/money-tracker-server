import { RequestHandler } from 'express'
import isTypeProfile from '../../../isTypeProfile'
import decryptToken from '../../../token/decryptToken'
import { deleteCategory } from '../../../database'
import validateToken from '../../../token/validateToken'

const handleDeleteCategory: RequestHandler = function (req, res) {
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

	const tokenIsValid = validateToken(data.username, data.token, res)

	if (tokenIsValid) {
		const inputCategory = data.payload as CategoryID
		const user_id = (decryptToken(data.token) as TokenData).user_id

		try {
			deleteCategory(user_id, inputCategory.category_id)
			res.statusCode = 200
			res.send({
				description: 'SUCCESS',
				message: 'Data successfully deleted',
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
}

export default handleDeleteCategory
