import { RequestHandler } from 'express'
import { getTransaction } from '../../../database'
import encryptToken from '../../token/encryptToken'

/**
 * Handles HTTP Request for `/gettransaction`
 */
export const handleGetTransaction: RequestHandler = function (req, res) {
	const user_id = req.user_id
	const username = req.username

	if (typeof req.headers['transaction_id'] !== 'string') {
		res.statusCode = 406
		res.statusMessage = 'ERROR_MISSING_HEADER'
		res.send()
		return
	}

	const transaction_id = parseInt(req.headers['transaction_id'])

	if (Number.isNaN(transaction_id)) {
		res.statusCode = 406
		res.statusMessage = 'ERROR_HEADER_FORMAT'
		res.send()
		return
	}

	try {
		const transaction = getTransaction(user_id, transaction_id)

		const refreshedToken = encryptToken({
			user_id: user_id,
			username: username,
		})

		res.statusCode = 200
		res.send({
			transaction: transaction,
			refreshedToken: refreshedToken,
		})
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
