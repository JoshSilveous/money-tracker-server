import { RequestHandler } from 'express'
import { insertAccount } from '../../../database'
import encryptToken from '../../token/encryptToken'
import { newAccountSchema } from '../../schemas'

/**
 * Handles HTTP Request for `/insertaccount`
 */
export const handleInsertAccount: RequestHandler = function (req, res) {
	const user_id = req.user_id
	const username = req.username

	const inputAccount = req.body as NewAccount

	// make sure account matches format
	if (newAccountSchema.validate(inputAccount).error) {
		res.statusCode = 406
		res.statusMessage = 'ERROR_BODY_FORMAT'
		res.send()
		return
	}

	try {
		const newAccountID = insertAccount(user_id, inputAccount)

		const refreshedToken = encryptToken({
			user_id: user_id,
			username: username,
		})

		res.statusCode = 200
		res.send({
			account_id: newAccountID,
			refreshedToken: refreshedToken,
		})
	} catch (e) {
		const errMsg = (e as Error).message
		if (errMsg === 'UNIQUE constraint failed: accounts.name') {
			res.statusCode = 406
			res.statusMessage = 'ERROR_DUPLICATE_NAME'
			res.send()
		} else {
			res.statusCode = 500
			res.statusMessage = 'ERROR_SERVER: ' + e
			res.send()
		}
	}
}
