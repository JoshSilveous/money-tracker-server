import { RequestHandler } from 'express'
import { insertCategory } from '../../../database'
import encryptToken from '../../token/encryptToken'
import { newCategorySchema } from '../../schemas'

/**
 * Handles HTTP Request for `/insertcategory`
 */
export const handleInsertCategory: RequestHandler = function (req, res) {
	const user_id = req.user_id
	const username = req.username

	const inputCategory = req.body as NewCategory

	// make sure category matches format
	if (newCategorySchema.validate(inputCategory).error) {
		res.statusCode = 406
		res.statusMessage = 'ERROR_BODY_FORMAT'
		res.send()
		return
	}

	try {
		const newCategoryID = insertCategory(user_id, inputCategory)

		const refreshedToken = encryptToken({
			user_id: user_id,
			username: username,
		})

		res.statusCode = 200
		res.send({
			category_id: newCategoryID,
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
			res.statusMessage = 'ERROR_SERVER: ' + e
			res.send()
		}
	}
}
