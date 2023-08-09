import SQLite from 'better-sqlite3'
import { getUserFilePath } from '../..'

function insertAccount(user_id: number, account: NewAccount) {
	const db = new SQLite(getUserFilePath(user_id))
	const sql = `
        INSERT INTO accounts
			(name, description) 
			VALUES (?, ?);
    `
	const stmt = db.prepare(sql)
	const res = stmt.run(account.name, account.description)
	db.close()
	return res.lastInsertRowid as number
}
export default insertAccount
