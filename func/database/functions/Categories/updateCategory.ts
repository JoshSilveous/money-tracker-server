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
	const res = stmt.run(
		category.name,
		category.description,
		category.category_id
	)
	db.close()
	if (res.changes === 0) {
		throw Error('category_id not found')
	}
	return
}
export default updateCategory
