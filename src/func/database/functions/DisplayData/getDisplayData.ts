import SQLite from 'better-sqlite3'
import { getUserFilePath } from '../..'

/**
 * Get's a chunk of DisplayData for the user, sorted by parameters.
 * @param user_id
 * @param resPerPage Results per page
 * @param thisPage The page requested
 * @param orderBy The category name to be ordered by
 * @param orderByDirection `"ASC"` or `"DESC"`
 * @returns An array of `DataDisplay` objects
 */
export function getDisplayData(
	user_id: number,
	resPerPage: number,
	thisPage: number,
	orderBy: 'timestamp' | 'name' | 'category_name' | 'account_name' | 'amount',
	orderByDirection: 'ASC' | 'DESC'
) {
	const pageOffset = (thisPage - 1) * resPerPage

	const db = new SQLite(getUserFilePath(user_id))
	const sql = `
        SELECT 
            transaction_id, 
            transactions.name AS name, 
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
	const res = stmt.all() as DisplayTransaction[]
	db.close()
	return res
}
