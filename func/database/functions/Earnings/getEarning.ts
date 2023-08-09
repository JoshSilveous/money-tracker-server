import SQLite from 'better-sqlite3'
import { getUserFilePath } from '../..'
function getEarning(user_id: number, earning_id: number) {
	const db = new SQLite(getUserFilePath(user_id))
	const sql = `
        SELECT *
			FROM earnings
			WHERE earning_id = ?;
    `
	const stmt = db.prepare(sql)
	const res = stmt.all(earning_id)
	db.close()
	if (res.length === 0) {
		throw Error('earning_id not found')
	}
	return res[0] as Earning
}
export default getEarning
