import SQLite from 'better-sqlite3'
import { getUserFilePath } from '../..'

/**
 * Deletes a transaction from a user's database
 * @param user_id The user's ID
 * @param transaction_id The transaction's ID
 */
export function deleteTransaction(user_id: number, transaction_id: number) {
	const db = new SQLite(getUserFilePath(user_id))
	const sql = `
        DELETE FROM transactions
			WHERE transaction_id = ?;
    `
	const stmt = db.prepare(sql)
	const res = stmt.run(transaction_id)
	db.close()
	if (res.changes === 0) {
		throw Error('transaction_id not found')
	}
	return
}
