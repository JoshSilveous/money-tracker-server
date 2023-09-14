import SQLite from 'better-sqlite3'
import { getUserFilePath } from '../..'
function getAllEarnings(user_id: number) {
	const db = new SQLite(getUserFilePath(user_id))
	const sql = `
        SELECT *
			FROM earnings;
    `
	const stmt = db.prepare(sql)
	const res = stmt.all()
	db.close()
	return res as Earning[]
}
export default getAllEarnings
