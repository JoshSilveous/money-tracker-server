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
app.delete('/api/deleteuser', httpFunc.handleDeleteUser)

app.get('/api/getdisplaydata', httpFunc.handleGetDisplayData)

app.get('/api/gettransaction', httpFunc.handleGetTransaction)
app.post('/api/inserttransaction', httpFunc.handleInsertTransaction)
app.put('/api/updatetransaction', httpFunc.handleUpdateTransaction)
app.delete('/api/deletetransaction', httpFunc.handleDeleteTransaction)

app.get('/api/getcategory', verifyToken, httpFunc.handleGetCategory)
app.get('/api/getallcategories', httpFunc.handleGetAllCategories)
app.post('/api/insertcategory', httpFunc.handleInsertCategory)
app.put('/api/updatecategory', httpFunc.handleUpdateCategory)
app.delete('/api/deletecategory', httpFunc.handleDeleteCategory)

app.get('/api/getaccount', httpFunc.handleGetAccount)
app.get('/api/getallaccounts', httpFunc.handleGetAllAccounts)
app.post('/api/insertaccount', httpFunc.handleInsertAccount)
app.put('/api/updateaccount', httpFunc.handleUpdateAccount)
app.delete('/api/deleteaccount', httpFunc.handleDeleteAccount)

export { app }
