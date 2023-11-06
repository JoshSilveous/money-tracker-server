import SQLite from 'better-sqlite3'
import { getUserFilePath } from '../..'

/**
 * Retrieves a Account from the user's database
 * @param user_id The user's ID
 * @param account_id The account's ID
 * @returns The `Account` object
 */
export function getAccount(user_id: number, account_id: number) {
	const db = new SQLite(getUserFilePath(user_id))
	const sql = `
        SELECT *
            FROM accounts
			WHERE account_id = ?;
    `
	const stmt = db.prepare(sql)
	const res = stmt.all(account_id)
	db.close()
	if (res.length === 0) {
		throw Error('account_id not found')
	}
	return res[0] as Account
}
