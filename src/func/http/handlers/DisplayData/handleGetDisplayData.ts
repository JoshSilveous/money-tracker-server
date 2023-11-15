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
		typeof req.headers['res_per_page'] !== 'string' ||
		typeof req.headers['this_page'] !== 'string' ||
		typeof req.headers['order_by'] !== 'string' ||
		typeof req.headers['order_by_direction'] !== 'string'
	) {
		res.statusCode = 406
		res.statusMessage = 'ERROR_MISSING_HEADER'
		res.send()
		return
	}

	const requestParams: DisplayDataRequest = {
		resPerPage: parseInt(req.headers['res_per_page']),
		thisPage: parseInt(req.headers['this_page']),
		orderBy: req.headers['order_by'] as DisplayDataRequest['orderBy'],
		orderByDirection: req.headers[
			'order_by_direction'
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
