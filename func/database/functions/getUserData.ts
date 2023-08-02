import SQLite from 'better-sqlite3'
import { getUserFilePath } from '..'

function getUserData(user_id: number) {
	const db = new SQLite(getUserFilePath(user_id))

	const sql = `
        SELECT * FROM transactions;
    `
	const stmt = db.prepare(sql)
	const res = stmt.all() as Transaction[]
	db.close()
	return res
}
export default getUserData
