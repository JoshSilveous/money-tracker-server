import { Request, Response, NextFunction } from 'express-serve-static-core'
import decryptToken from './decryptToken'
import { tokenSchema } from '../schemas'

/**
 * Custom middlewear that check's a token's validity (for authenticated requests).
 *
 * If the token is valid, `user_id` and `username` will be appended as
 * properties on the `Request` object, and passed along to the next function.
 *
 * If the token isn't valid, a respective error code will be sent.
 */
export function verifyToken(req: Request, res: Response, next: NextFunction) {
	const bearerHeader = req.headers['authorization']

	if (typeof bearerHeader !== 'undefined') {
		const bearer = bearerHeader.split(' ')
		const encryptedToken = bearer[1]

		// check for issues decrypting token
		try {
			decryptToken(encryptedToken)
		} catch (e) {
			console.log('token decrypt issues!!!!')
			res.statusCode = 406
			if ((e as Error).message === 'jwt expired') {
				res.statusMessage = 'ERROR_TOKEN_EXPIRED'
				res.send()
			} else {
				res.statusMessage = 'ERROR_TOKEN: ' + e.message
				res.send()
			}
			return
		}

		const decryptedToken = decryptToken(encryptedToken)

		const validationResult = tokenSchema.validate(decryptedToken)
		if (validationResult.error) {
			res.statusCode = 406
			res.statusMessage = 'ERROR_TOKEN_FORMAT'
			res.send()
			return
		} else {
			/* request is now verified as valid.
               attach the user_id and username (extracted from the token)
               to the new authenticated request. */
			req.user_id = (decryptedToken as TokenData).user_id
			req.username = (decryptedToken as TokenData).username

			// then, proceed to the specific handler for this handler.
			next()
		}
	} else {
		res.statusCode = 406
		res.statusMessage = 'ERROR_NO_TOKEN'
		res.send()
	}
}
