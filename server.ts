import express from 'express'
import bodyParser from 'body-parser'
import handleCreateUser from './func/http/handleCreateUser'
import handleLoginUser from './func/http/handleLoginUser'

const app = express()
const port = 3000

app.use((_req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
	next()
})
app.use(bodyParser.json())

app.post('/createuser', handleCreateUser)
app.post('/loginuser', handleLoginUser)

app.listen(port, () => {
	console.log('listening on port 3000')
})
