import { RequestHandler } from 'express'
import isTypeProfile from '../../../isTypeProfile'
import decryptToken from '../../../token/decryptToken'
import { getDisplayData } from '../../../database'
import validateToken from '../../../token/validateToken'

const handleGetDisplayData: RequestHandler = function (req, res) {
	// make sure data is in correct shape
	if (!isTypeProfile(req.body, 'UserPostRequest')) {
		res.statusCode = 406
		res.statusMessage = 'ERROR_REQUEST_FORMAT'
		res.send()
		return
	}
	const data = req.body as UserPostRequest

	// make sure provided NewTransaction is in correct format
	if (!isTypeProfile(data.payload, 'DisplayDataRequest')) {
		res.statusCode = 406
		res.statusMessage = 'ERROR_REQUEST_FORMAT'
		res.send()
		return
	}

	const tokenIsValid = validateToken(data.username, data.token, res)

	if (tokenIsValid) {
		const request = data.payload as DisplayDataRequest
		const user_id = (decryptToken(data.token) as TokenData).user_id

		try {
			const displayData = getDisplayData(
				user_id,
				request.resPerPage,
				request.thisPage,
				request.orderBy,
				request.orderByDirection
			)
			res.statusCode = 200
			res.send({
				displayData: displayData,
			})
		} catch (e) {
			console.log('caught error!')
			console.log(e)
		}
	}
}

export default handleGetDisplayData
