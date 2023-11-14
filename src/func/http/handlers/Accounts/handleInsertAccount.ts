import { RequestHandler } from 'express'
import isTypeProfile from '../../../isTypeProfile'
import decryptToken from '../../token/decryptToken'
import { insertAccount } from '../../../database'
import validateToken from '../../token/validateToken'
import encryptToken from '../../token/encryptToken'

/**
 * Handles HTTP Request for `/insertaccount`
 */
export const handleInsertAccount: RequestHandler = function (req, res) {
	// make sure data is in correct shape
	if (!isTypeProfile(req.body, 'UserPostRequest')) {
		res.statusCode = 406
		res.statusMessage = 'ERROR_REQUEST_FORMAT'
		res.send()
		return
	}
	const data = req.body as UserPostRequest

	// make sure provided NewAccount is in correct format
	if (!isTypeProfile(data.payload, 'NewAccount')) {
		res.statusCode = 406
		res.statusMessage = 'ERROR_REQUEST_FORMAT'
		res.send()
		return
	}

	const tokenIsValid = validateToken(data.username, data.token, res)

	if (tokenIsValid) {
		const inputAccount = data.payload as NewAccount
		const user_id = (decryptToken(data.token) as TokenData).user_id
		const refreshedToken = encryptToken({
			user_id: user_id,
			username: data.username,
		})

		try {
			const newAccountID = insertAccount(user_id, inputAccount)
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
}
