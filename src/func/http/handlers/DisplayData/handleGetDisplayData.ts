import { RequestHandler } from 'express'
import isTypeProfile from '../../../isTypeProfile'
import decryptToken from '../../../token/decryptToken'
import { getDisplayData } from '../../../database'
import validateToken from '../../../token/validateToken'

const handleGetDisplayData: RequestHandler = function (req, res) {
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

	// make sure provided NewTransaction is in correct format
	if (!isTypeProfile(data.payload, 'DisplayDataRequest')) {
		res.statusCode = 406
		res.send({
			description: 'ERROR_REQUEST_FORMAT',
			message: 'Transaction data in incorrect format.',
		})
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
				description: 'SUCCESS',
				message: 'Data successfully retrieved',
				displayData: displayData,
			})
		} catch (e) {
			console.log('caught error!')
			console.log(e)
		}
	}
}

export default handleGetDisplayData