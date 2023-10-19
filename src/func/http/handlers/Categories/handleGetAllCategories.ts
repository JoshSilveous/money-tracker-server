import { RequestHandler } from 'express'
import isTypeProfile from '../../../isTypeProfile'
import decryptToken from '../../../token/decryptToken'
import { getAllCategories } from '../../../database'
import validateToken from '../../../token/validateToken'

const handleGetAllCategories: RequestHandler = function (req, res) {
	// make sure data is in correct shape
	if (!isTypeProfile(req.body, 'UserGetRequest')) {
		res.statusCode = 406
		res.statusMessage = 'ERROR_REQUEST_FORMAT'
		res.send()
		return
	}
	const data = req.body as UserGetRequest

	const tokenIsValid = validateToken(data.username, data.token, res)

	if (tokenIsValid) {
		const user_id = (decryptToken(data.token) as TokenData).user_id

		try {
			const categories = getAllCategories(user_id)
			res.statusCode = 200
			res.statusMessage = 'SUCCESS'
			res.send({
				categories: categories,
			})
		} catch (e) {
			res.statusCode = 500
			res.statusMessage = 'Unexpected server error: ' + e
			res.send()
		}
	}
}

export default handleGetAllCategories
