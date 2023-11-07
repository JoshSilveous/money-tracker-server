import SQLite from 'better-sqlite3'
import { getUserFilePath } from '../..'

/**
 * Retrieves all Transactions from the user's database
 * @param user_id The user's ID
 * @returns The `Transaction` object array
 */
export function getAllTransactions(user_id: number) {
	const db = new SQLite(getUserFilePath(user_id))
	const sql = `
        SELECT *
            FROM transactions;
    `
	const stmt = db.prepare(sql)
	const res = stmt.all()
	db.close()
	return res as Transaction[]
}
