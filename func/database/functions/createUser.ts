import NEW_USER_TABLE from '../scripts/NEW_USER_TABLE'
import { db } from './users_connection'
import SQLite from 'better-sqlite3'

function createUser(user: UserCredentials) {
	const sql = 'INSERT INTO user (username, password) VALUES (?, ?);'
	const stmt = db.prepare(sql)
	const res = stmt.run(user.username, user.password)

	// create path to new user db file
	const thisFilePath = __dirname.split('\\')
	thisFilePath.pop()
	const newUsersDBFilePath =
		thisFilePath.join('\\') +
		'\\data\\userdata\\' +
		res.lastInsertRowid +
		'.db'

	// create new user db file and create tables
	const newUsersDBFile = new SQLite(newUsersDBFilePath)
	newUsersDBFile.exec(NEW_USER_TABLE)
	newUsersDBFile.exec(
		`INSERT INTO transactions (name, amount) VALUES ('testor', 123);
		INSERT INTO transactions (name, amount) VALUES ('testy', 1723);
		INSERT INTO transactions (name, amount) VALUES ('tesst', 1243);
		INSERT INTO transactions (name, amount) VALUES ('teast', 1213);`
	)
	newUsersDBFile.close()

	return res.lastInsertRowid as number
}

export default createUser
