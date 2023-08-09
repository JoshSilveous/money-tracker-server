import SQLite from 'better-sqlite3'
import { getUserFilePath } from '../..'

function insertEarning(user_id: number, earning: NewEarning) {
	const db = new SQLite(getUserFilePath(user_id))
	const sql = `
        INSERT INTO earnings 
			(name, timestamp, notes, amount, account_id) 
			VALUES (?, ?, ?, ?, ?);
    `
	const stmt = db.prepare(sql)
	const res = stmt.run(
		earning.name,
		Math.round(earning.amount * 100) / 100,
		earning.notes,
		earning.amount,
		earning.account_id
	)
	db.close()
	return res.lastInsertRowid as number
}
export default insertEarning
