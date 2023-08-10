import request from 'supertest'
import { app } from '../src/api'
import encryptToken from '../src/func/token/encryptToken'
import { getUser } from '../src/func/database'

let server
beforeAll(() => {
	server = app.listen(3000) // Start the server
})

afterAll((done) => {
	server.close(done) // Close the server when all tests are done
})

describe('Operations', () => {
	const newUserCredentials: UserCredentials = {
		username: 'jest_test_new_user',
		password: 'jest_test_new_user',
	}
	let token: string
	describe('User / Token Functions', () => {
		it('should create a new user', async () => {
			const response = await request(app)
				.post('/createuser')
				.send(newUserCredentials)
			expect(response.status).toBe(200)
		})

		it('should error due to duplicate username', async () => {
			const response = await request(app)
				.post('/createuser')
				.send({
					...newUserCredentials,
					password: 'example_unique_pass',
				})
			expect(response.status).toBe(406)
			expect(response.body.description).toBe('ERROR_DUPLICATE_USERNAME')
		})

		it('should error due to duplicate password', async () => {
			const response = await request(app)
				.post('/createuser')
				.send({
					...newUserCredentials,
					username: 'example_unique_username',
				})
			expect(response.status).toBe(406)
			expect(response.body.description).toBe('ERROR_DUPLICATE_PASSWORD')
		})

		it('should login as new user', async () => {
			const response = await request(app)
				.post('/loginuser')
				.send(newUserCredentials)

			expect(response.status).toBe(200)
			if (response.status === 200) {
				token = response.body.token
			}
		})

		it('should error due to token format', async () => {
			const response = await request(app)
				.post('/insertcategory')
				.send({
					username: newUserCredentials.username,
					token: 'Invalid Token Example',
					payload: {
						name: 'TestCategory',
						description: 'A new Category created by Jest.',
					},
				})
			expect(response.statusCode).toBe(406)
			expect(response.body.message).toContain(
				'Unexpected error decrypting token'
			)
		})

		it('should error due to mismatched token structure', async () => {
			const badToken = encryptToken({
				user_id: getUser(newUserCredentials).user_id,
				username: newUserCredentials.username,
				exampleBadStructure: 'Example Bad Structure',
			})
			const response = await request(app)
				.post('/insertcategory')
				.send({
					username: newUserCredentials.username,
					token: badToken,
					payload: {
						name: 'TestCategory',
						description: 'A new Category created by Jest.',
					},
				})
			expect(response.statusCode).toBe(406)
			expect(response.body.message).toBe('Invalid token data')
		})

		it('should error due to mismatched username', async () => {
			const badToken = encryptToken({
				user_id: getUser(newUserCredentials).user_id,
				username: 'Invalid Username Example',
			})
			const response = await request(app)
				.post('/insertcategory')
				.send({
					username: newUserCredentials.username,
					token: badToken,
					payload: {
						name: 'TestCategory',
						description: 'A new Category created by Jest.',
					},
				})
			expect(response.statusCode).toBe(406)
			expect(response.body.message).toBe(
				'Token does not match provided username'
			)
		})
	})

	let newCategoryID: number
	describe('Creating / Modifying Categories', () => {
		it('should create a new category', async () => {
			const response = await request(app)
				.post('/insertcategory')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						name: 'TestCategory',
						description: 'A new Category created by Jest.',
					},
				})
			expect(response.statusCode).toBe(200)
			if (response.statusCode === 200) {
				newCategoryID = response.body.newCategoryID
			}
		})
		it('should retrieve the new category info', async () => {
			const response = await request(app)
				.post('/getcategory')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						category_id: newCategoryID,
					},
				})
			expect(response.statusCode).toBe(200)
		})
		it('should update the new category', async () => {
			const response = await request(app)
				.post('/updatecategory')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						category_id: newCategoryID,
						name: 'TestCategoryUpdated',
						description: 'A new Category created by Jest.',
					},
				})
			expect(response.statusCode).toBe(200)
		})
		it('should retrieve the updated category info', async () => {
			const response = await request(app)
				.post('/getcategory')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						category_id: newCategoryID,
					},
				})
			expect(response.statusCode).toBe(200)
			expect(response.body.category.name).toBe('TestCategoryUpdated')
		})
		it('should receive 400 due to bad account_id', async () => {
			const response = await request(app)
				.post('/getcategory')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						category_id: newCategoryID + 1,
					},
				})
			expect(response.statusCode).toBe(400)
		})
	})

	let newAccountID: number
	describe('Creating / Modifying Accounts', () => {
		it('should create a new account', async () => {
			const response = await request(app)
				.post('/insertaccount')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						name: 'TestAccount',
						description: 'A new Account created by Jest.',
					},
				})
			expect(response.statusCode).toBe(200)
			if (response.statusCode === 200) {
				newAccountID = response.body.newAccountID
			}
		})
		it('should retrieve the new account info', async () => {
			const response = await request(app)
				.post('/getaccount')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						account_id: newAccountID,
					},
				})
			if (response.statusCode !== 200) {
				console.log(response.body)
			}
			expect(response.statusCode).toBe(200)
		})
		it('should update the new account', async () => {
			const response = await request(app)
				.post('/updateaccount')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						account_id: newAccountID,
						name: 'TestAccountUpdated',
						description: 'A new Account created by Jest.',
					},
				})
			expect(response.statusCode).toBe(200)
		})
		it('should retrieve the updated account info', async () => {
			const response = await request(app)
				.post('/getaccount')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						account_id: newAccountID,
					},
				})
			expect(response.statusCode).toBe(200)
			expect(response.body.account.name).toBe('TestAccountUpdated')
		})
		it('should receive 400 due to bad account_id', async () => {
			const response = await request(app)
				.post('/getaccount')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						account_id: newAccountID + 1,
					},
				})
			expect(response.statusCode).toBe(400)
		})
	})

	let newTransactionID: number
	describe('Creating / Modifying Transactions', () => {
		it('should create a new transaction', async () => {
			const response = await request(app)
				.post('/inserttransaction')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						name: 'TestTransaction',
						timestamp: 123,
						notes: null,
						amount: 123.45,
						category_id: null,
						account_id: null,
					},
				})
			expect(response.statusCode).toBe(200)
			if (response.statusCode === 200) {
				newTransactionID = response.body.newTransactionID
			}
		})
		it('should retrieve the new transaction info', async () => {
			const response = await request(app)
				.post('/gettransaction')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						transaction_id: newTransactionID,
					},
				})
			expect(response.statusCode).toBe(200)
		})
		it('should update the new transaction', async () => {
			const response = await request(app)
				.post('/updatetransaction')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						transaction_id: newTransactionID,
						name: 'TestTransactionUpdated',
						timestamp: 321,
						notes: 'Test notes',
						amount: 543.21,
						category_id: newCategoryID,
						account_id: newAccountID,
					},
				})
			expect(response.statusCode).toBe(200)
		})
		it('should retrieve the updated transaction info', async () => {
			const response = await request(app)
				.post('/gettransaction')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						transaction_id: newTransactionID,
					},
				})
			expect(response.statusCode).toBe(200)
			expect(response.body.transaction.name).toBe(
				'TestTransactionUpdated'
			)
		})
		it('should receive 400 due to bad transaction_id', async () => {
			const response = await request(app)
				.post('/gettransaction')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						transaction_id: newTransactionID + 1,
					},
				})
			expect(response.statusCode).toBe(400)
		})
	})

	let newEarningID: number
	describe('Creating / Modifying Earnings', () => {
		it('should create a new earning', async () => {
			const response = await request(app)
				.post('/insertearning')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						name: 'TestEarning',
						timestamp: 123,
						notes: null,
						amount: 123.45,
						account_id: null,
					},
				})
			expect(response.statusCode).toBe(200)
			if (response.statusCode === 200) {
				newEarningID = response.body.newEarningID
			}
		})
		it('should retrieve the new earning info', async () => {
			const response = await request(app)
				.post('/getearning')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						earning_id: newEarningID,
					},
				})
			expect(response.statusCode).toBe(200)
		})
		it('should update the new earning', async () => {
			const response = await request(app)
				.post('/updateearning')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						earning_id: newEarningID,
						name: 'TestEarningUpdated',
						timestamp: 321,
						notes: 'Test notes',
						amount: 543.21,
						account_id: newAccountID,
					},
				})
			expect(response.statusCode).toBe(200)
		})
		it('should retrieve the updated earning info', async () => {
			const response = await request(app)
				.post('/getearning')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						earning_id: newEarningID,
					},
				})
			expect(response.statusCode).toBe(200)
			expect(response.body.earning.name).toBe('TestEarningUpdated')
		})
		it('should receive 400 due to bad earning_id', async () => {
			const response = await request(app)
				.post('/getearning')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						earning_id: newEarningID + 1,
					},
				})
			expect(response.statusCode).toBe(400)
		})
	})

	describe('Deleting Transactions, Earnings, Categories, and Accounts', () => {
		it('should delete the new transaction', async () => {
			const response = await request(app)
				.post('/deletetransaction')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						transaction_id: newTransactionID,
					},
				})
			expect(response.statusCode).toBe(200)
		})
		it('should receive 400 due to bad transaction_id', async () => {
			const response = await request(app)
				.post('/gettransaction')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						transaction_id: newTransactionID,
					},
				})
			expect(response.statusCode).toBe(400)
		})
		it('should delete the new earning', async () => {
			const response = await request(app)
				.post('/deleteearning')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						earning_id: newEarningID,
					},
				})
			expect(response.statusCode).toBe(200)
		})
		it('should receive 400 due to bad earning_id', async () => {
			const response = await request(app)
				.post('/getearning')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						earning_id: newEarningID,
					},
				})
			expect(response.statusCode).toBe(400)
		})
		it('should delete the new account', async () => {
			const response = await request(app)
				.post('/deleteaccount')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						account_id: newAccountID,
					},
				})
			expect(response.statusCode).toBe(200)
		})
		it('should receive 400 due to bad account_id', async () => {
			const response = await request(app)
				.post('/getaccount')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						account_id: newAccountID,
					},
				})
			expect(response.statusCode).toBe(400)
		})
		it('should delete the new category', async () => {
			const response = await request(app)
				.post('/deletecategory')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						category_id: newCategoryID,
					},
				})
			expect(response.statusCode).toBe(200)
		})
		it('should receive 400 due to bad category_id', async () => {
			const response = await request(app)
				.post('/getcategory')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						category_id: newCategoryID,
					},
				})
			expect(response.statusCode).toBe(400)
		})
	})

	it('should delete the new user', async () => {
		const actualResponse = await request(app)
			.post('/deleteuser')
			.send({ username: newUserCredentials.username, token: token })
		expect(actualResponse.status).toBe(200)
	})
})
