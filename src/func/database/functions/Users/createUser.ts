import NEW_USER_TABLE from '../../scripts/NEW_USER_TABLE'
import { getUserFilePath } from './getUserFilePath'
import { db } from './users_connection'
import SQLite from 'better-sqlite3'

/**
 * Creates a new user in the database.
 * @param user The `UserCredentials` object.
 * @returns The newly-created `user_id`.
 */
export function createUser(user: UserCredentials) {
	const sql = 'INSERT INTO user (username, password) VALUES (?, ?);'
	const stmt = db.prepare(sql)
	const res = stmt.run(user.username, user.password)

	const newUsersDBFilePath = getUserFilePath(res.lastInsertRowid as number)

	// create new user db file and create tables
	const newUsersDBFile = new SQLite(newUsersDBFilePath)
	newUsersDBFile.exec(NEW_USER_TABLE)
	newUsersDBFile.close()

	return res.lastInsertRowid as number
}
