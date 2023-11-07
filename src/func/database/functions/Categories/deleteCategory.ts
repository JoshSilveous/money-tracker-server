import SQLite from 'better-sqlite3'
import { getUserFilePath } from '../..'

/**
 * Deletes a category from a user's database
 * @param user_id The user's ID
 * @param category_id The category's ID
 */
export function deleteCategory(user_id: number, category_id: number) {
	const db = new SQLite(getUserFilePath(user_id))
	const sql = `
        DELETE FROM categories
			WHERE category_id = ?;
    `
	const stmt = db.prepare(sql)
	const res = stmt.run(category_id)
	db.close()
	if (res.changes === 0) {
		throw Error('category_id not found')
	}
	return
}
