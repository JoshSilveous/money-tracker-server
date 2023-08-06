function getUserFilePath(user_id: number) {
	const parentFilePath = __dirname.split('\\')
	parentFilePath.pop()
	const userFilePath =
		parentFilePath.join('\\') + '\\data\\userdata\\' + user_id + '.db'
	return userFilePath
}
export default getUserFilePath
