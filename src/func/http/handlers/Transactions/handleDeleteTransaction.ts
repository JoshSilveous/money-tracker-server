import { RequestHandler } from 'express'
import isTypeProfile from '../../../isTypeProfile'
import decryptToken from '../../token/decryptToken'
import { deleteTransaction } from '../../../database'
import validateToken from '../../token/validateToken'
import encryptToken from '../../token/encryptToken'

/**
 * Handles HTTP Request for `/deletetransaction`
 */
export const handleDeleteTransaction: RequestHandler = function (req, res) {
	// make sure data is in correct shape
	if (!isTypeProfile(req.body, 'UserPostRequest')) {
		res.statusCode = 406
		res.statusMessage = 'ERROR_REQUEST_FORMAT'
		res.send()
		return
	}
	const data = req.body as UserPostRequest

	// make sure provided NewTransaction is in correct format
	if (!isTypeProfile(data.payload, 'TransactionID')) {
		res.statusCode = 406
		res.statusMessage = 'ERROR_REQUEST_FORMAT'
		res.send()
		return
	}

	const tokenIsValid = validateToken(data.username, data.token, res)

	if (tokenIsValid) {
		const inputTransaction = data.payload as TransactionID
		const user_id = (decryptToken(data.token) as TokenData).user_id
		const refreshedToken = encryptToken({
			user_id: user_id,
			username: data.username,
		})

		try {
			deleteTransaction(user_id, inputTransaction.transaction_id)
			res.statusCode = 200
			res.send({ refreshedToken: refreshedToken })
		} catch (e) {
			if ((e as Error).message === 'transaction_id not found') {
				res.statusCode = 400
				res.statusMessage = 'ERROR_ID_NOT_FOUND'
				res.send()
			} else {
				res.statusCode = 500
				res.statusMessage = 'ERROR_SERVER:' + e
				res.send()
			}
		}
	}
}
