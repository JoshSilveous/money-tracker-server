import SQLite from 'better-sqlite3'
import { getUserFilePath } from '../..'
function updateAccount(user_id: number, account: Account) {
	const db = new SQLite(getUserFilePath(user_id))
	const sql = `
        UPDATE categories SET
			name = ?,
            description = ?
			WHERE account_id = ?;
    `
	const stmt = db.prepare(sql)
	stmt.run(account.name, account.description, account.account_id)
	db.close()
	return
}
export default updateAccount
