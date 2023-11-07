import { getUserFilePath } from '../..'
import { db } from './users_connection'
import fs from 'fs'

/**
 * Deletes a user from the database, and removes their file.
 * @param user_id
 */
export function deleteUser(user_id: number) {
	const sql = 'DELETE FROM user WHERE user_id = ?;'
	const stmt = db.prepare(sql)
	const res = stmt.run(user_id)
	if (res.changes === 0) {
		throw Error(`user_id doesn't exist`)
	}

	const userDBFile = getUserFilePath(user_id)
	fs.unlink(userDBFile, (err) => {
		if (err) {
			throw Error(err.message)
		}
	})
	return
}
