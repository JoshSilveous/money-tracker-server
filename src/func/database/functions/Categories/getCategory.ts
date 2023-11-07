import SQLite from 'better-sqlite3'
import { getUserFilePath } from '../..'

/**
 * Retrieves a Category from the user's database
 * @param user_id The user's ID
 * @param category_id The category's ID
 * @returns The `Category` object
 */
export function getCategory(user_id: number, category_id: number) {
	const db = new SQLite(getUserFilePath(user_id))
	const sql = `
        SELECT *
            FROM categories
            WHERE category_id = ?;
    `
	const stmt = db.prepare(sql)
	const res = stmt.all(category_id)
	db.close()
	if (res.length === 0) {
		throw Error('category_id not found')
	}
	return res[0] as Category
}
