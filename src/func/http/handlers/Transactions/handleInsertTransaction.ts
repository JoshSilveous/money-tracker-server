import { RequestHandler } from 'express'
import { insertTransaction } from '../../../database'
import encryptToken from '../../token/encryptToken'
import Joi from 'joi'
import { newTransactionSchema } from '../../schemas'

/**
 * Handles HTTP Request for `/inserttransaction`
 */
export const handleInsertTransaction: RequestHandler = function (req, res) {
	const user_id = req.user_id
	const username = req.username

	const inputTransaction = req.body as NewTransaction

	// make sure transaction matches format
	if (newTransactionSchema.validate(inputTransaction).error) {
		res.statusCode = 406
		res.statusMessage = 'ERROR_BODY_FORMAT'
		res.send()
		return
	}

	try {
		const newTransactionID = insertTransaction(user_id, inputTransaction)

		const refreshedToken = encryptToken({
			user_id: user_id,
			username: username,
		})

		res.statusCode = 200
		res.send({
			transaction_id: newTransactionID,
			refreshedToken: refreshedToken,
		})
	} catch (e) {
		res.statusCode = 500
		res.statusMessage = 'ERROR_SERVER:' + e
		res.send()
	}
}
