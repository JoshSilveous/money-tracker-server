import { RequestHandler } from 'express'
import { getAllCategories } from '../../../database'
import encryptToken from '../../token/encryptToken'

/**
 * Handles HTTP Request for `/getallcategories`
 */
export const handleGetAllCategories: RequestHandler = function (req, res) {
	const user_id = req.user_id
	const username = req.username

	try {
		const categories = getAllCategories(user_id)

		const refreshedToken = encryptToken({
			user_id: user_id,
			username: username,
		})

		res.statusCode = 200
		res.send({
			categories: categories,
			refreshedToken: refreshedToken,
		})
	} catch (e) {
		res.statusCode = 500
		res.statusMessage = 'ERROR_SERVER: ' + e
		res.send()
	}
}
