import SQLite from 'better-sqlite3'
import { getUserFilePath } from '../..'
function updateAccount(user_id: number, account: Account) {
	const db = new SQLite(getUserFilePath(user_id))
	const sql = `
        UPDATE accounts SET
			name = ?,
            description = ?
			WHERE account_id = ?;
    `
	const stmt = db.prepare(sql)
	const res = stmt.run(account.name, account.description, account.account_id)
	db.close()
	if (res.changes === 0) {
		throw Error('account_id not found')
	}
	return
}
export default updateAccount
