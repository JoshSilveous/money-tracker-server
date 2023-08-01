import express from 'express'
import bodyParser from 'body-parser'
import { isTypeProfile } from './TypeChecking'

console.log(
	isTypeProfile({ username: 'dsasd', password: 'asdds' }, 'UserCredentials')
)

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
