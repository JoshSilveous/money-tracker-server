import SQLite from 'better-sqlite3'
import { getUserFilePath } from '../..'

/**
 * Deletes a account from a user's database
 * @param user_id The user's ID
 * @param account_id The account's ID
 */
export function deleteAccount(user_id: number, account_id: number) {
	const db = new SQLite(getUserFilePath(user_id))
	const sql = `
        DELETE FROM accounts
			WHERE account_id = ?;
    `
	const stmt = db.prepare(sql)
	const res = stmt.run(account_id)
	db.close()
	if (res.changes === 0) {
		throw Error('account_id not found')
	}
	return
}
