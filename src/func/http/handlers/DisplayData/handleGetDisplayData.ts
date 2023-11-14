import { RequestHandler } from 'express'
import { getDisplayData } from '../../../database'
import encryptToken from '../../token/encryptToken'
import { displayDataRequestSchema } from '../../schemas'

/**
 * handles HTTP Request for `/getDisplayData`
 */
export const handleGetDisplayData: RequestHandler = function (req, res) {
	const user_id = req.user_id
	const username = req.username

	if (
		typeof req.headers['resPerPage'] !== 'string' ||
		typeof req.headers['thisPage'] !== 'string' ||
		typeof req.headers['orderBy'] !== 'string' ||
		typeof req.headers['orderByDirection'] !== 'string'
	) {
		res.statusCode = 406
		res.statusMessage = 'ERROR_MISSING_HEADER'
		res.send()
		return
	}

	const requestParams: DisplayDataRequest = {
		resPerPage: parseInt(req.headers['resPerPage']),
		thisPage: parseInt(req.headers['thisPage']),
		orderBy: req.headers['orderBy'] as DisplayDataRequest['orderBy'],
		orderByDirection: req.headers[
			'orderByDirection'
		] as DisplayDataRequest['orderByDirection'],
	}

	if (displayDataRequestSchema.validate(requestParams).error) {
		// this catches any NaN, nulls, and makes sure orderBy and
		// orderByDirection only contain the allowed strings.
		res.statusCode = 406
		res.statusMessage = 'ERROR_HEADER_FORMAT'
		res.send()
		return
	}

	try {
		const displayData = getDisplayData(
			user_id,
			requestParams.resPerPage,
			requestParams.thisPage,
			requestParams.orderBy,
			requestParams.orderByDirection
		)

		const refreshedToken = encryptToken({
			user_id: user_id,
			username: username,
		})

		res.statusCode = 200
		res.send({
			displayData: displayData,
			refreshedToken: refreshedToken,
		})
	} catch (e) {
		res.statusCode = 500
		res.statusMessage = 'ERROR_SERVER: ' + e
		res.send()
	}
}
