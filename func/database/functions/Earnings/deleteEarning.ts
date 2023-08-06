import SQLite from 'better-sqlite3'
import { getUserFilePath } from '../..'

function deleteEarning(user_id: number, earning_id: number) {
	const db = new SQLite(getUserFilePath(user_id))
	const sql = `
        DELETE FROM earnings
			WHERE earning_id = ?;
    `
	const stmt = db.prepare(sql)
	const res = stmt.run(earning_id)
	if (res.changes === 0) {
		throw Error('earning_id not found')
	}
	db.close()
	return
}
export default deleteEarning
