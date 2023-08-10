import { RequestHandler } from 'express'
import isTypeProfile from '../../../isTypeProfile'
import decryptToken from '../../../token/decryptToken'
import { insertEarning } from '../../../database'
import validateToken from '../../../token/validateToken'

const handleInsertEarning: RequestHandler = function (req, res) {
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

	// make sure provided NewEarning is in correct format
	if (!isTypeProfile(data.payload, 'NewEarning')) {
		res.statusCode = 406
		res.send({
			description: 'ERROR_REQUEST_FORMAT',
			message: 'Earning data in incorrect format.',
		})
		return
	}

	const tokenIsValid = validateToken(data.username, data.token, res)

	if (tokenIsValid) {
		const inputEarning = data.payload as NewEarning
		const user_id = (decryptToken(data.token) as TokenData).user_id

		try {
			const newEarningID = insertEarning(user_id, inputEarning)
			res.statusCode = 200
			res.send({
				description: 'SUCCESS',
				message: 'Data successfully inserted',
				newEarningID: newEarningID,
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
export default handleInsertEarning
