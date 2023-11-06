import SQLite from 'better-sqlite3'
import { getUserFilePath } from '../..'

/**
 * Updates a account in a user's database
 * @param user_id The user's ID
 * @param account The `Account` object (WITH ID)
 */
export function updateAccount(user_id: number, account: Account) {
	const db = new SQLite(getUserFilePath(user_id))
	const sql = `
        UPDATE accounts SET
			name = ?,
            description = ?
			WHERE account_id = ?;
    `
	const stmt = db.prepare(sql)
	const res = stmt.run(account.name, account.description, account.account_id)
	db.close()
	if (res.changes === 0) {
		throw Error('account_id not found')
	}
	return
}
