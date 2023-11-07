import fs from 'fs'

/**
 * Checks if a user has an existing DB file
 * @return `Boolean`
 */
export function verifyDBFileExists(user_id: number): boolean {
	const parentFilePath = __dirname.split('\\')
	parentFilePath.pop()
	parentFilePath.pop()
	const userFilePath =
		parentFilePath.join('\\') + '\\data\\userdata\\' + user_id + '.db'

	return fs.existsSync(userFilePath)
}
