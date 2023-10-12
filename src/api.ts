import express from 'express'
import bodyParser from 'body-parser'
import * as httpFunc from './func/http'
import cors from 'cors'

const app = express()

app.use(cors())
app.use((_req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
	next()
})
app.use(bodyParser.json())

app.post('/api/createuser', httpFunc.handleCreateUser)
app.post('/api/loginuser', httpFunc.handleLoginUser)
app.get('/api/requestdata', httpFunc.handleRequestData)
app.post('/api/deleteuser', httpFunc.handleDeleteUser)

app.post('/api/getdisplaydata', httpFunc.handleGetDisplayData)

app.post('/api/gettransaction', httpFunc.handleGetTransaction)
app.post('/api/inserttransaction', httpFunc.handleInsertTransaction)
app.post('/api/updatetransaction', httpFunc.handleUpdateTransaction)
app.post('/api/deletetransaction', httpFunc.handleDeleteTransaction)

app.post('/api/getcategory', httpFunc.handleGetCategory)
app.post('/api/insertcategory', httpFunc.handleInsertCategory)
app.post('/api/updatecategory', httpFunc.handleUpdateCategory)
app.post('/api/deletecategory', httpFunc.handleDeleteCategory)

app.post('/api/getaccount', httpFunc.handleGetAccount)
app.post('/api/insertaccount', httpFunc.handleInsertAccount)
app.post('/api/updateaccount', httpFunc.handleUpdateAccount)
app.post('/api/deleteaccount', httpFunc.handleDeleteAccount)

export { app }
