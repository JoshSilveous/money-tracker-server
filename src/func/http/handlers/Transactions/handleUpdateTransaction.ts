import { RequestHandler } from 'express'
import { updateTransaction } from '../../../database'
import encryptToken from '../../token/encryptToken'
import { transactionSchema } from '../../schemas'

/**
 * Handles HTTP Request for `/updatetransaction`
 */
export const handleUpdateTransaction: RequestHandler = function (req, res) {
	const user_id = req.user_id
	const username = req.username

	const inputTransaction = req.body.payload as Transaction

	// make sure transaction matches format
	if (transactionSchema.validate(inputTransaction).error) {
		res.statusCode = 406
		res.statusMessage = 'ERROR_PAYLOAD_FORMAT'
		res.send()
		return
	}

	try {
		updateTransaction(user_id, inputTransaction)

		const refreshedToken = encryptToken({
			user_id: user_id,
			username: username,
		})

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
