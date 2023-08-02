import SQLite from 'better-sqlite3'
import { getUserFilePath } from '..'

function insertTransaction(user_id: number, transaction: NewTransaction) {
	const db = new SQLite(getUserFilePath(user_id))
	const sql = `
        INSERT INTO transactions (name, amount) VALUES (?, ?);
    `
	const stmt = db.prepare(sql)
	const res = stmt.run(
		transaction.name,
		Math.round(transaction.amount * 100) / 100
	)
	db.close()
	return res.lastInsertRowid as number
}
export default insertTransaction
