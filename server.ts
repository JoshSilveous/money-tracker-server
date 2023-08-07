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
app.get('/requestdata', httpFunc.handleRequestData)
app.post('/inserttransaction', httpFunc.handleInsertTransaction)
app.post('/updatetransaction', httpFunc.handleUpdateTransaction)
app.post('/deletetransaction', httpFunc.handleDeleteTransaction)
app.post('/insertearning', httpFunc.handleInsertEarning)
app.post('/updateearning', httpFunc.handleUpdateEarning)
app.post('/deleteearning', httpFunc.handleDeleteEarning)
app.post('/insertcategory', httpFunc.handleInsertCategory)
app.post('/updatecategory', httpFunc.handleUpdateCategory)
app.post('/deletecategory', httpFunc.handleDeleteCategory)
app.post('/insertaccount', httpFunc.handleInsertAccount)
app.post('/updateaccount', httpFunc.handleUpdateAccount)
app.post('/deleteaccount', httpFunc.handleDeleteAccount)

app.listen(port, () => {
	console.log('listening on port 3000')
})
