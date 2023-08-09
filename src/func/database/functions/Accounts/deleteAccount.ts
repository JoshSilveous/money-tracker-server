import SQLite from 'better-sqlite3'
import { getUserFilePath } from '../..'

function deleteAccount(user_id: number, account_id: number) {
	const db = new SQLite(getUserFilePath(user_id))
	const sql = `
        DELETE FROM accounts
			WHERE account_id = ?;
    `
	const stmt = db.prepare(sql)
	const res = stmt.run(account_id)
	db.close()
	if (res.changes === 0) {
		throw Error('account_id not found')
	}
	return
}
export default deleteAccount
