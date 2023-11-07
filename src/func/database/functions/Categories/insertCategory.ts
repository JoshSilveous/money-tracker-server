import SQLite from 'better-sqlite3'
import { getUserFilePath } from '../..'

/**
 * Inserts a category into a user's database
 * @param user_id The user's ID
 * @param category The `NewCategory` object (no ID)
 * @returns The newly created `category_id`
 */
export function insertCategory(user_id: number, category: NewCategory) {
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
