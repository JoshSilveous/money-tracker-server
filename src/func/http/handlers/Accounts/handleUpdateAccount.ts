import { RequestHandler } from 'express'
import { updateAccount } from '../../../database'
import encryptToken from '../../token/encryptToken'
import { accountSchema } from '../../schemas'

/**
 * Handles HTTP Request for `/updateaccount`
 */
export const handleUpdateAccount: RequestHandler = function (req, res) {
	const user_id = req.user_id
	const username = req.username

	const inputAccount = req.body as Account

	// make sure account matches format
	if (accountSchema.validate(inputAccount).error) {
		res.statusCode = 406
		res.statusMessage = 'ERROR_BODY_FORMAT'
		res.send()
		return
	}

	try {
		updateAccount(user_id, inputAccount)

		const refreshedToken = encryptToken({
			user_id: user_id,
			username: username,
		})

		res.statusCode = 200
		res.send({ refreshedToken: refreshedToken })
	} catch (e) {
		if ((e as Error).message === 'account_id not found') {
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
