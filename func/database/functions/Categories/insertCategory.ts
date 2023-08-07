import SQLite from 'better-sqlite3'
import { getUserFilePath } from '../..'

function insertCategory(user_id: number, category: NewCategory) {
	const db = new SQLite(getUserFilePath(user_id))
	const sql = `
        INSERT INTO categories
			(name, description) 
			VALUES (?, ?);
    `
	const stmt = db.prepare(sql)
	const res = stmt.run(category.name, category.description)
	db.close()
	return res.lastInsertRowid as number
}
export default insertCategory
