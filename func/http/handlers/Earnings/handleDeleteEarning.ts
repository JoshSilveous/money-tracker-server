import { RequestHandler } from 'express'
import isTypeProfile from '../../../isTypeProfile'
import decryptToken from '../../../token/decryptToken'
import { deleteEarning } from '../../../database'

const handleDeleteEarning: RequestHandler = function (req, res) {
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

	// make sure provided NewEarning is in correct format
	if (!isTypeProfile(data.payload, 'EarningID')) {
		res.statusCode = 406
		res.send({
			description: 'ERROR_REQUEST_FORMAT',
			message: 'Earning data in incorrect format.',
		})
		return
	}

	// check for issues decrypting token
	try {
		decryptToken(data.token)
	} catch (e) {
		res.statusCode = 406
		if ((e as Error).message === 'jwt expired') {
			res.send({
				description: 'ERROR_TOKEN_EXPIRED',
				message: 'Token expired.',
			})
		} else {
			res.send({
				description: 'ERROR_TOKEN_FORMAT',
				message: 'Unexpected error decrypting token: ' + e,
			})
		}
		return
	}

	const decryptedToken = decryptToken(data.token) as TokenData

	// check if token payload matches format
	if (!isTypeProfile(decryptedToken, 'TokenData')) {
		res.statusCode = 406
		res.send({
			description: 'ERROR_TOKEN_FORMAT',
			message: 'Invalid token data',
		})
		return
	}

	// check if token username matches provided username
	if (decryptedToken.username !== data.username) {
		res.statusCode = 406
		res.send({
			description: 'ERROR_TOKEN_FORMAT',
			message: 'Token does not match provided username',
		})
		return
	}

	// request is valid at this point
	const inputEarning = data.payload as EarningID

	try {
		const newEarningID = deleteEarning(
			decryptedToken.user_id!,
			inputEarning.earning_id
		)
		res.statusCode = 200
		res.send({
			description: 'SUCCESS',
			message: 'Data successfully deleted',
			newEarningID: newEarningID,
		})
	} catch (e) {
		res.statusCode = 500
		if ((e as Error).message === 'earning_id not found') {
			res.send({
				description: 'ERROR_ID_NOT_FOUND',
				message: `Earning ID ${inputEarning.earning_id} not found.`,
			})
		}

		res.send({
			description: 'ERROR_SERVER',
			message: 'Unexpected server error: ' + e,
		})
	}
}

export default handleDeleteEarning