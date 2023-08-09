import SQLite from 'better-sqlite3'
import { getUserFilePath } from '../..'
function getAccount(user_id: number, account_id: number) {
	const db = new SQLite(getUserFilePath(user_id))
	const sql = `
        SELECT *
            FROM categories
			WHERE account_id = ?;
    `
	const stmt = db.prepare(sql)
	const res = stmt.all(account_id)
	db.close()
	if (res.length === 0) {
		throw Error('account_id not found')
	}
	return res[0] as Account
}
export default getAccount
