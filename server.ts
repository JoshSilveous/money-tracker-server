import express from 'express'
import bodyParser from 'body-parser'
import * as httpFunc from './func/http'

const app = express()
const port = 3000

app.use((_req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
	next()
})
app.use(bodyParser.json())

app.post('/createuser', httpFunc.handleCreateUser)
app.post('/loginuser', httpFunc.handleLoginUser)

app.listen(port, () => {
	console.log('listening on port 3000')
})
