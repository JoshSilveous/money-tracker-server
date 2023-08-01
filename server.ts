import express from 'express'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import { isTypeProfile } from './TypeChecking'

console.log(
	isTypeProfile({ username: 'dsasd', password: 'asdds' }, 'UserCredentials')
)

// const jwtSecretKey = 'wcxgVJ1QKCr23Oe72o7Ch8Nyj4itXE2I'

// const payload = {
// 	userId: 123,
// 	username: 'exampleuser',
// 	role: 'admin',
// }
// const options = {
// 	expiresIn: '1h',
// }

// const token = jwt.sign(payload, jwtSecretKey, options)

// console.log('signed token:')
// console.log(token)

// try {
// 	const decodedToken = jwt.verify(token, jwtSecretKey)
// 	console.log('Decoded Token:', decodedToken)
// } catch (error) {
// 	console.error('Error decoding token:', (error as Error).message)
// }

// const app = express()
// const port = 3000

// app.use(bodyParser.json())

// app.use((_req, res, next) => {
// 	res.setHeader('Access-Control-Allow-Origin', '*')
// 	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
// 	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
// 	next()
// })

// app.listen(port, () => {
// 	console.log('listening on port 3000')
// })
