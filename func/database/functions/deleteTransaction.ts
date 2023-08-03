import SQLite from 'better-sqlite3'
import { getUserFilePath } from '..'

function deleteTransaction(user_id: number, transaction_id: number) {
	const db = new SQLite(getUserFilePath(user_id))
	const sql = `
        DELETE FROM transactions

			WHERE transaction_id = ?;
    `
	const stmt = db.prepare(sql)
	stmt.run(transaction_id)
	db.close()
	return
}
export default deleteTransaction
