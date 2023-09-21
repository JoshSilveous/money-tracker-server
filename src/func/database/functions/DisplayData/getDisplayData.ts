import SQLite from 'better-sqlite3'
import { getUserFilePath } from '../..'
// okay, this one's gonna be complicated.
// we need to accept parameters to limit how many results per page, and which page the user is on.
// also accepts ORDER BY parameters

// date seperation and such is handled on the front-end

// Y axis
// Timestamp  |  Name  |  Category  |  Amount  |  Account

function getDisplayData(
	user_id: number,
	resPerPage: number,
	thisPage: number,
	orderBy:
		| 'timestamp'
		| 'transaction_name'
		| 'category_name'
		| 'account_name'
		| 'amount',
	orderByDirection: 'ASC' | 'DESC'
) {
	const pageOffset = (thisPage - 1) * resPerPage

	const db = new SQLite(getUserFilePath(user_id))
	const sql = `
        SELECT 
            transaction_id, 
            transactions.name AS transaction_name, 
            timestamp, 
            amount, 
            categories.name AS category_name, 
            accounts.name AS account_name 
            FROM transactions 
                LEFT JOIN categories
                    ON transactions.category_id = categories.category_id
                LEFT JOIN accounts
                    ON transactions.account_id = accounts.account_id
            ORDER BY ${orderBy} ${orderByDirection}
            LIMIT ${resPerPage} OFFSET ${pageOffset}
        ;
    `
	const stmt = db.prepare(sql)
	const res = stmt.all() as DisplayData[]
	db.close()
	return res
}
export default getDisplayData
