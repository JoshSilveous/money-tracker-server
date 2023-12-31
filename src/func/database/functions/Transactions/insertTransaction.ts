import SQLite from 'better-sqlite3'
import { getUserFilePath } from '../..'

/**
 * Inserts a transaction into a user's database
 * @param user_id The user's ID
 * @param transaction The `NewTransaction` object (no ID)
 * @returns The newly created `transaction_id`
 */
export function insertTransaction(
	user_id: number,
	transaction: NewTransaction
) {
	const db = new SQLite(getUserFilePath(user_id))
	const sql = `
        INSERT INTO transactions 
			(name, timestamp, notes, amount, category_id, account_id) 
			VALUES (?, ?, ?, ?, ?, ?);
    `
	const stmt = db.prepare(sql)
	const res = stmt.run(
		transaction.name,
		transaction.timestamp,
		transaction.notes,
		Math.round(transaction.amount * 100) / 100,
		transaction.category_id,
		transaction.account_id
	)
	db.close()
	return res.lastInsertRowid as number
}
