import { RequestHandler } from 'express'
import isTypeProfile from '../../../isTypeProfile'
import decryptToken from '../../../token/decryptToken'
import { insertAccount } from '../../../database'
import validateToken from '../../../token/validateToken'

const handleInsertAccount: RequestHandler = function (req, res) {
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

	// make sure provided NewAccount is in correct format
	if (!isTypeProfile(data.payload, 'NewAccount')) {
		res.statusCode = 406
		res.send({
			description: 'ERROR_REQUEST_FORMAT',
			message: 'Account data in incorrect format.',
		})
		return
	}

	const tokenIsValid = validateToken(data.username, data.token, res)

	if (tokenIsValid) {
		const inputAccount = data.payload as NewAccount
		const user_id = (decryptToken(data.token) as TokenData).user_id

		try {
			const newAccountID = insertAccount(user_id, inputAccount)
			res.statusCode = 200
			res.send({
				description: 'SUCCESS',
				message: 'Data successfully inserted',
				newAccountID: newAccountID,
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

export default handleInsertAccount
