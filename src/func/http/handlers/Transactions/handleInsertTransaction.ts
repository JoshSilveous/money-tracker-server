import { RequestHandler } from 'express'
import isTypeProfile from '../../../isTypeProfile'
import decryptToken from '../../../token/decryptToken'
import { insertTransaction } from '../../../database'
import validateToken from '../../../token/validateToken'
import encryptToken from '../../../token/encryptToken'

const handleInsertTransaction: RequestHandler = function (req, res) {
	// make sure data is in correct shape
	if (!isTypeProfile(req.body, 'UserPostRequest')) {
		res.statusCode = 406
		res.statusMessage = 'ERROR_REQUEST_FORMAT'
		res.send()
		return
	}
	const data = req.body as UserPostRequest

	// make sure provided NewTransaction is in correct format
	if (!isTypeProfile(data.payload, 'NewTransaction')) {
		res.statusCode = 406
		res.statusMessage = 'ERROR_REQUEST_FORMAT'
		res.send()
		return
	}

	const tokenIsValid = validateToken(data.username, data.token, res)

	if (tokenIsValid) {
		const inputTransaction = data.payload as NewTransaction
		const user_id = (decryptToken(data.token) as TokenData).user_id
		const refreshedToken = encryptToken({
			user_id: user_id,
			username: data.username,
		})

		try {
			const newTransactionID = insertTransaction(
				user_id,
				inputTransaction
			)
			res.statusCode = 200
			res.send({
				transaction_id: newTransactionID,
				refreshedToken: refreshedToken
			})
		} catch (e) {
			res.statusCode = 500
			res.statusMessage = 'ERROR_SERVER:' + e
			res.send()
		}
	}
}

export default handleInsertTransaction
