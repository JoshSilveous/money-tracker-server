import SQLite from 'better-sqlite3'
import { getUserFilePath } from '../..'

/**
 * Retrieves all Accounts from the user's database
 * @param user_id The user's ID
 * @returns The `Account` object array
 */
export function getAllAccounts(user_id: number) {
	const db = new SQLite(getUserFilePath(user_id))
	const sql = `
        SELECT account_id, name
            FROM accounts
			ORDER BY account_id ASC;
    `
	const stmt = db.prepare(sql)
	const res = stmt.all()
	db.close()
	return res as Account[]
}
