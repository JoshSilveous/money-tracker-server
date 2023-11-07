import SQLite from 'better-sqlite3'
import { getUserFilePath } from '../..'

/**
 * Inserts a account into a user's database
 * @param user_id The user's ID
 * @param account The `NewAccount` object (no ID)
 * @returns The newly created `account_id`
 */
export function insertAccount(user_id: number, account: NewAccount) {
	const db = new SQLite(getUserFilePath(user_id))
	const sql = `
        INSERT INTO accounts
			(name, description) 
			VALUES (?, ?);
    `
	const stmt = db.prepare(sql)
	const res = stmt.run(account.name, account.description)
	db.close()
	return res.lastInsertRowid as number
}
