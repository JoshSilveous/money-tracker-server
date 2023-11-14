import { RequestHandler } from 'express'
import { deleteAccount } from '../../../database'
import encryptToken from '../../token/encryptToken'

/**
 * Handles HTTP Request for `/deleteaccount`
 */
export const handleDeleteAccount: RequestHandler = function (req, res) {
	const user_id = req.user_id
	const username = req.username

	if (typeof req.headers['account_id'] !== 'string') {
		res.statusCode = 406
		res.statusMessage = 'ERROR_MISSING_HEADER'
		res.send()
		return
	}

	const account_id = parseInt(req.headers['account_id'])

	if (Number.isNaN(account_id)) {
		res.statusCode = 406
		res.statusMessage = 'ERROR_HEADER_FORMAT'
		res.send()
		return
	}

	try {
		deleteAccount(user_id, account_id)

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
