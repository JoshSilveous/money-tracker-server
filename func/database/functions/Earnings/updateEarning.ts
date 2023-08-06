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
	stmt.run(
		earning.name,
		Math.round(earning.amount * 100) / 100,
		earning.notes,
		earning.amount,
		earning.account_id,
		earning.earning_id
	)
	db.close()
	return
}
export default updateEarning
