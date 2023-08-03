import SQLite from 'better-sqlite3'
import { getUserFilePath } from '..'

function insertTransaction(user_id: number, transaction: NewTransaction) {
	const db = new SQLite(getUserFilePath(user_id))
	const sql = `
        INSERT INTO transactions 
			(name, timestamp, notes, amount, category_id, account_id) 
			VALUES (?, ?, ?, ?, ?, ?);
    `
	const stmt = db.prepare(sql)
	const res = stmt.run(
		transaction.name,
		Math.round(transaction.amount * 100) / 100,
		transaction.notes,
		transaction.amount,
		transaction.category_id,
		transaction.account_id
	)
	db.close()
	return res.lastInsertRowid as number
}
export default insertTransaction
