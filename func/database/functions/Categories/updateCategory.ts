import SQLite from 'better-sqlite3'
import { getUserFilePath } from '../..'
function updateCategory(user_id: number, category: Category) {
	const db = new SQLite(getUserFilePath(user_id))
	const sql = `
        UPDATE categories SET
			name = ?,
            description = ?
			WHERE category_id = ?;
    `
	const stmt = db.prepare(sql)
	stmt.run(category.name, category.description, category.category_id)
	db.close()
	return
}
export default updateCategory
