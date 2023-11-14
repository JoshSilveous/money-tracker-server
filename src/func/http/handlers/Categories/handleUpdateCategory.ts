import { RequestHandler } from 'express'
import { updateCategory } from '../../../database'
import encryptToken from '../../token/encryptToken'
import { categorySchema } from '../../schemas'

/**
 * Handles HTTP Request for `/updatecategory`
 */
export const handleUpdateCategory: RequestHandler = function (req, res) {
	const user_id = req.user_id
	const username = req.username

	const inputCategory = req.body.payload as Category

	// make sure category matches format
	if (categorySchema.validate(inputCategory).error) {
		res.statusCode = 406
		res.statusMessage = 'ERROR_PAYLOAD_FORMAT'
		res.send()
		return
	}

	try {
		updateCategory(user_id, inputCategory)

		const refreshedToken = encryptToken({
			user_id: user_id,
			username: username,
		})

		res.statusCode = 200
		res.send({ refreshedToken: refreshedToken })
	} catch (e) {
		if ((e as Error).message === 'category_id not found') {
			res.statusCode = 400
			res.statusMessage = 'ERROR_ID_NOT_FOUND'
			res.send()
		} else {
			res.statusCode = 500
			res.statusMessage = 'ERROR_SERVER: ' + e
			res.send()
		}
	}
}
