import { RequestHandler } from 'express'
import { deleteUser } from '../../../database'

/**
 * Handles HTTP Request for `/deleteuser`
 */
export const handleDeleteUser: RequestHandler = function (req, res) {
	const user_id = req.user_id

	try {
		deleteUser(user_id)
		res.statusCode = 200
		res.send()
	} catch (e) {
		if ((e as Error).message === 'user_id not found') {
			/* 	Since user_id is derived from the JWT token, it
				should always reflect the requestor's user_id.
				This error should never actually occur.
			*/
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
