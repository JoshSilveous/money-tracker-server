import isTypeProfile from '../isTypeProfile'
import decryptToken from './decryptToken'
import { Response } from 'express'

/**
 * Runs a token through some tests to check if the request is valid.
 * If any issues are detected, this function sends an error response.
 * @param username The provided username
 * @param token The undecrypted token string
 * @param res The Express `Response` object
 * @returns `true` if no issues are found, otherwise `false`.
 */
function validateToken(username: string, token: string, res: Response) {
	// check for issues decrypting token
	try {
		decryptToken(token)
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
		return false
	}

	const decryptedToken = decryptToken(token)

	// check if token payload matches format
	if (!isTypeProfile(decryptedToken, 'TokenData')) {
		res.statusCode = 406
		res.send({
			description: 'ERROR_TOKEN_FORMAT',
			message: 'Invalid token data',
		})
		return false
	}

	// check if token username matches provided username
	if (decryptedToken.username !== username) {
		res.statusCode = 406
		res.send({
			description: 'ERROR_TOKEN_FORMAT',
			message: 'Token does not match provided username',
		})
		return false
	}
	return true
}

export default validateToken
