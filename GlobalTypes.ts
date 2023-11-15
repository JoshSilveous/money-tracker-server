declare module 'express-serve-static-core' {
	// allow appending user_id and username for authenticated requests
	interface Request {
		user_id: number
		username: string
	}
}
