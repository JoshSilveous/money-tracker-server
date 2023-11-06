/**
 * Get the path to a user's db file
 */
export function getUserFilePath(user_id: number) {
	const parentFilePath = __dirname.split('\\')
	parentFilePath.pop()
	parentFilePath.pop()
	const userFilePath =
		parentFilePath.join('\\') + '\\data\\userdata\\' + user_id + '.db'
	return userFilePath
}
