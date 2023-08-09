import SQLite from 'better-sqlite3'
import { getUserFilePath } from '../..'
function updateEarning(user_id: number, earning: Earning) {
	const db = new SQLite(getUserFilePath(user_id))
	const sql = `
        UPDATE earnings SET
			name = ?,
            timestamp = ?,
            notes = ?,
            amount = ?,
            account_id = ?
			WHERE earning_id = ?;
    `
	const stmt = db.prepare(sql)
	const res = stmt.run(
		earning.name,
		Math.round(earning.amount * 100) / 100,
		earning.notes,
		earning.amount,
		earning.account_id,
		earning.earning_id
	)
	db.close()
	if (res.changes === 0) {
		throw Error('earning_id not found')
	}
	return
}
export default updateEarning
