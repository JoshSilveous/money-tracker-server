import { db } from './users_connection'

export function getUser(user: UserCredentials): UserInfo | undefined {
	const sql = 'SELECT * FROM user WHERE username = ? AND password = ?;'
	const stmt = db.prepare(sql)
	const res = stmt.all(user.username, user.password) as UserInfo[]
	if (res.length) {
		return res[0]
	} else {
		// if credentials don't match, check if the username exists
		const sql = 'SELECT * FROM user WHERE username = ?'
		const stmt = db.prepare(sql)
		const res = stmt.all(user.username) as UserInfo[]
		if (res.length) {
			throw new Error('Incorrect password')
		} else {
			throw new Error('User does not exist')
		}
	}
}
export default getUser
