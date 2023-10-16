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
		if ((e as Error).message === 'jwt expired') {
			res.statusCode = 406
			res.statusMessage = 'ERROR_TOKEN_EXPIRED'
			res.send()
		} else {
			res.statusCode = 406
			res.statusMessage = 'ERROR_TOKEN:' + e
			res.send()
		}
		return false
	}

	const decryptedToken = decryptToken(token)

	// check if token payload matches format
	if (!isTypeProfile(decryptedToken, 'TokenData')) {
		res.statusCode = 406
		res.statusMessage = 'ERROR_TOKEN_FORMAT'
		res.send()
		return false
	}

	// check if token username matches provided username
	if (decryptedToken.username !== username) {
		res.statusCode = 406
		res.statusMessage = 'ERROR_TOKEN_USERNAME'
		res.send()
		return false
	}
	return true
}

export default validateToken
