import { RequestHandler } from 'express'
import { getCategory } from '../../../database'
import encryptToken from '../../token/encryptToken'

/**
 * Handles HTTP Request for `/getcategory`
 */
export const handleGetCategory: RequestHandler = function (req, res) {
	const user_id = req.user_id
	const username = req.username

	if (typeof req.headers['category_id'] !== 'string') {
		res.statusCode = 406
		res.statusMessage = 'ERROR_MISSING_HEADER'
		res.send()
		return
	}

	const category_id = parseInt(req.headers['category_id'])

	if (Number.isNaN(category_id)) {
		res.statusCode = 406
		res.statusMessage = 'ERROR_HEADER_FORMAT'
		res.send()
		return
	}

	try {
		const category = getCategory(user_id, category_id)

		const refreshedToken = encryptToken({
			user_id: user_id,
			username: username,
		})

		res.statusCode = 200
		res.send({
			category: category,
			refreshedToken,
		})
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
