import fs from 'fs'
function verifyDBFileExists(user_id: number): boolean {
	const parentFilePath = __dirname.split('\\')
	parentFilePath.pop()
	const userFilePath =
		parentFilePath.join('\\') + '\\data\\userdata\\' + user_id + '.db'

	return fs.existsSync(userFilePath)
}
export default verifyDBFileExists
