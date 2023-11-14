import express from 'express'
import bodyParser from 'body-parser'
import * as httpFunc from './func/http'
import cors from 'cors'
import { verifyToken } from './func/http/token/verifyToken'

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
app.delete('/api/deleteuser', verifyToken, httpFunc.handleDeleteUser)

app.get('/api/getdisplaydata', verifyToken, httpFunc.handleGetDisplayData)

app.get('/api/gettransaction', verifyToken, httpFunc.handleGetTransaction)
app.post(
	'/api/inserttransaction',
	verifyToken,
	httpFunc.handleInsertTransaction
)
app.put('/api/updatetransaction', verifyToken, httpFunc.handleUpdateTransaction)
app.delete(
	'/api/deletetransaction',
	verifyToken,
	httpFunc.handleDeleteTransaction
)

app.get('/api/getcategory', verifyToken, httpFunc.handleGetCategory)
app.get('/api/getallcategories', verifyToken, httpFunc.handleGetAllCategories)
app.post('/api/insertcategory', verifyToken, httpFunc.handleInsertCategory)
app.put('/api/updatecategory', verifyToken, httpFunc.handleUpdateCategory)
app.delete('/api/deletecategory', verifyToken, httpFunc.handleDeleteCategory)

app.get('/api/getaccount', verifyToken, httpFunc.handleGetAccount)
app.get('/api/getallaccounts', verifyToken, httpFunc.handleGetAllAccounts)
app.post('/api/insertaccount', verifyToken, httpFunc.handleInsertAccount)
app.put('/api/updateaccount', verifyToken, httpFunc.handleUpdateAccount)
app.delete('/api/deleteaccount', verifyToken, httpFunc.handleDeleteAccount)

export { app }
