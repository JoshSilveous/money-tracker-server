import SQLite from 'better-sqlite3'
import { getUserFilePath } from '../..'
function getTransaction(user_id: number, transaction_id: number) {
	const db = new SQLite(getUserFilePath(user_id))
	const sql = `
        SELECT *
            FROM transactions
			WHERE transaction_id = ?;
    `
	const stmt = db.prepare(sql)
	const res = stmt.all(transaction_id)
	db.close()
	if (res.length === 0) {
		throw Error('transaction_id not found')
	}
	return res[0] as Transaction
}
export default getTransaction
