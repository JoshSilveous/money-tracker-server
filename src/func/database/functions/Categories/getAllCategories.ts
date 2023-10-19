import SQLite from 'better-sqlite3'
import { getUserFilePath } from '../..'

function getAllCategories(user_id: number) {
	const db = new SQLite(getUserFilePath(user_id))
	const sql = `
        SELECT category_id, name
            FROM categories
			ORDER BY category_id ASC;
    `
	const stmt = db.prepare(sql)
	const res = stmt.all()
	db.close()
	return res as Category[]
}
export default getAllCategories
