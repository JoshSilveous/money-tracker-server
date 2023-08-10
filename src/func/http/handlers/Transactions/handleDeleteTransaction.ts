import { RequestHandler } from 'express'
import isTypeProfile from '../../../isTypeProfile'
import decryptToken from '../../../token/decryptToken'
import { deleteTransaction } from '../../../database'
import validateToken from '../../../token/validateToken'

const handleDeleteTransaction: RequestHandler = function (req, res) {
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
	if (!isTypeProfile(data.payload, 'TransactionID')) {
		res.statusCode = 406
		res.send({
			description: 'ERROR_REQUEST_FORMAT',
			message: 'Transaction data in incorrect format.',
		})
		return
	}

	const tokenIsValid = validateToken(data.username, data.token, res)

	if (tokenIsValid) {
		const inputTransaction = data.payload as TransactionID
		const user_id = (decryptToken(data.token) as TokenData).user_id

		try {
			deleteTransaction(user_id, inputTransaction.transaction_id)
			res.statusCode = 200
			res.send({
				description: 'SUCCESS',
				message: 'Data successfully deleted',
			})
		} catch (e) {
			if ((e as Error).message === 'transaction_id not found') {
				res.statusCode = 400
				res.send({
					description: 'ERROR_ID_NOT_FOUND',
					message: `Transaction ID ${inputTransaction.transaction_id} not found.`,
				})
			} else {
				res.statusCode = 500
				res.send({
					description: 'ERROR_SERVER',
					message: 'Unexpected server error: ' + e,
				})
			}
		}
	}
}

export default handleDeleteTransaction
