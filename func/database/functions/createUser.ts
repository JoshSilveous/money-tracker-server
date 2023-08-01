import { db } from './users_connection'

/**
 * Creates a new user in the database.
 * @param user The `UserCredentials` object.
 * @returns The newly-created `user_id`.
 */
function createUser(user: UserCredentials) {
	const sql = 'INSERT INTO user (username, password) VALUES (?, ?);'
	const stmt = db.prepare(sql)
	const res = stmt.run(user.username, user.password)
	return res.lastInsertRowid as number
}
