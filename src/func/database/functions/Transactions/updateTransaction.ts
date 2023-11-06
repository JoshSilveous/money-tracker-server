import SQLite from 'better-sqlite3'
import { getUserFilePath } from '../..'

/**
 * Updates a transaction in a user's database
 * @param user_id The user's ID
 * @param transaction The `Transaction` object (WITH ID)
 */
export function updateTransaction(user_id: number, transaction: Transaction) {
	const db = new SQLite(getUserFilePath(user_id))
	const sql = `
        UPDATE transactions SET
			name = ?,
            timestamp = ?,
            notes = ?,
            amount = ?,
            category_id = ?,
            account_id = ?

			WHERE transaction_id = ?;
    `
	const stmt = db.prepare(sql)
	const res = stmt.run(
		transaction.name,
		Math.round(transaction.amount * 100) / 100,
		transaction.notes,
		transaction.amount,
		transaction.category_id,
		transaction.account_id,
		transaction.transaction_id
	)
	db.close()
	if (res.changes === 0) {
		throw Error('transaction_id not found')
	}
	return
}
