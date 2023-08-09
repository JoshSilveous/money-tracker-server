import SQLite from 'better-sqlite3'
import { getUserFilePath } from '../..'

function getCategory(user_id: number, category_id: number) {
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
export default getCategory
