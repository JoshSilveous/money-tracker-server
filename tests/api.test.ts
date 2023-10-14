import request from 'supertest'
import { app } from '../src/api'
import encryptToken from '../src/func/token/encryptToken'
import { getUser } from '../src/func/database'

let server
beforeAll(() => {
	server = app.listen(3000)
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
				.post('/api/createuser')
				.send(newUserCredentials)
			expect(response.status).toBe(201)
		})

		it('should error due to duplicate username', async () => {
			const response = await request(app)
				.post('/api/createuser')
				.send({
					...newUserCredentials,
					password: 'example_unique_pass',
				})
			expect(response.statusCode).toBe(406)
			// expect(response.statusText.toBe('ERROR_DUPLICATE_USERNAME'))
			// looks like supertest doesn't support statusText
		})

		it('should login as new user', async () => {
			const response = await request(app)
				.post('/api/loginuser')
				.send(newUserCredentials)

			expect(response.status).toBe(200)
			if (response.status === 200) {
				token = response.body.token
			}
		})

		it('should error due to token format', async () => {
			const response = await request(app)
				.post('/api/insertcategory')
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
				.post('/api/insertcategory')
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
				.post('/api/insertcategory')
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
				.post('/api/insertcategory')
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
				.post('/api/getcategory')
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
				.post('/api/updatecategory')
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
				.post('/api/getcategory')
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
				.post('/api/getcategory')
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
				.post('/api/insertaccount')
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
				.post('/api/getaccount')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						account_id: newAccountID,
					},
				})
			expect(response.statusCode).toBe(200)
		})
		it('should update the new account', async () => {
			const response = await request(app)
				.post('/api/updateaccount')
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
				.post('/api/getaccount')
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
				.post('/api/getaccount')
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
				.post('/api/inserttransaction')
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
				.post('/api/gettransaction')
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
				.post('/api/updatetransaction')
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
				.post('/api/gettransaction')
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
				.post('/api/gettransaction')
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

	describe('Deleting newly inserted data', () => {
		it('should delete the new transaction', async () => {
			const response = await request(app)
				.post('/api/deletetransaction')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						transaction_id: newTransactionID,
					},
				})
			expect(response.statusCode).toBe(200)
		})
		it('should delete the new category', async () => {
			const response = await request(app)
				.post('/api/deletecategory')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						category_id: newCategoryID,
					},
				})
			expect(response.statusCode).toBe(200)
		})
		it('should delete the new account', async () => {
			const response = await request(app)
				.post('/api/deleteaccount')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						account_id: newAccountID,
					},
				})
			expect(response.statusCode).toBe(200)
		})
	})

	describe('Retrieving Data Tables in Display formats', () => {
		const testCategories: Category[] = [
			{ category_id: null, name: 'TestCategory1', description: null },
			{ category_id: null, name: 'TestCategory2', description: null },
			{ category_id: null, name: 'TestCategory3', description: null },
		]
		const testAccounts: Account[] = [
			{ account_id: null, name: 'TestAccount1', description: null },
			{ account_id: null, name: 'TestAccount2', description: null },
			{ account_id: null, name: 'TestAccount3', description: null },
		]
		const testTransactions: Transaction[] = [
			{
				transaction_id: null,
				name: 'TestTransaction1',
				timestamp: 163,
				amount: -123.45,
				notes: null,
				category_id: 2,
				account_id: 2,
			},
			{
				transaction_id: null,
				name: 'TestTransaction2',
				timestamp: 12,
				amount: -1323.42,
				notes: null,
				category_id: 3,
				account_id: 4,
			},
			{
				transaction_id: null,
				name: 'TestTransaction3',
				timestamp: 1,
				amount: 474354.33,
				notes: null,
				category_id: 2,
				account_id: null,
			},
			{
				transaction_id: null,
				name: 'TestTransaction4',
				timestamp: 160000,
				amount: -21,
				notes: null,
				category_id: 2,
				account_id: 4,
			},
			{
				transaction_id: null,
				name: 'TestTransaction5',
				timestamp: 1424,
				amount: -13.22,
				notes: null,
				category_id: null,
				account_id: 2,
			},
			{
				transaction_id: null,
				name: 'TestTransaction6',
				timestamp: 12,
				amount: 13323.42,
				notes: null,
				category_id: 2,
				account_id: 3,
			},
			{
				transaction_id: null,
				name: 'TestTransaction7',
				timestamp: 6434,
				amount: -152.32,
				notes: null,
				category_id: 4,
				account_id: 4,
			},
			{
				transaction_id: null,
				name: 'TestTransaction8',
				timestamp: 13634,
				amount: -183.33,
				notes: null,
				category_id: 4,
				account_id: 3,
			},
			{
				transaction_id: null,
				name: 'TestTransaction9',
				timestamp: 43145,
				amount: -1333.42,
				notes: null,
				category_id: null,
				account_id: 2,
			},
			{
				transaction_id: null,
				name: 'TestTransaction10',
				timestamp: 1437,
				amount: -24.99,
				notes: null,
				category_id: null,
				account_id: null,
			},
			{
				transaction_id: null,
				name: 'TestTransaction11',
				timestamp: 434,
				amount: 823,
				notes: null,
				category_id: 3,
				account_id: null,
			},
			{
				transaction_id: null,
				name: 'TestTransaction12',
				timestamp: 6431345,
				amount: -393.33,
				notes: null,
				category_id: 4,
				account_id: 4,
			},
			{
				transaction_id: null,
				name: 'TestTransaction13',
				timestamp: 134643,
				amount: -999.99,
				notes: null,
				category_id: 2,
				account_id: 3,
			},
			{
				transaction_id: null,
				name: 'TestTransaction14',
				timestamp: 641364,
				amount: 32,
				notes: null,
				category_id: 2,
				account_id: 2,
			},
			{
				transaction_id: null,
				name: 'TestTransaction15',
				timestamp: 15122,
				amount: 0.01,
				notes: null,
				category_id: 3,
				account_id: 2,
			},
		]
		it('should create three new categories', async () => {
			testCategories.forEach(async (category) => {
				let response = await request(app)
					.post('/api/insertcategory')
					.send({
						username: newUserCredentials.username,
						token: token,
						payload: {
							name: category.name,
							description: 'A new Category created by Jest.',
						},
					})
				expect(response.statusCode).toBe(200)
				if (response.statusCode === 200) {
					category.category_id = response.body.newCategoryID
				}
			})
		})
		it('should create three new accounts', async () => {
			testAccounts.forEach(async (account) => {
				const response = await request(app)
					.post('/api/insertaccount')
					.send({
						username: newUserCredentials.username,
						token: token,
						payload: {
							name: account.name,
							description: 'A new Account created by Jest.',
						},
					})
				expect(response.statusCode).toBe(200)

				if (response.statusCode === 200) {
					account.account_id = response.body.newAccountID
				}
			})
		})

		it('should create fifteen new transactions', async () => {
			testTransactions.forEach(async (transaction) => {
				const response = await request(app)
					.post('/api/inserttransaction')
					.send({
						username: newUserCredentials.username,
						token: token,
						payload: {
							name: transaction.name,
							timestamp: transaction.timestamp,
							notes: transaction.notes,
							amount: transaction.amount,
							category_id: transaction.category_id,
							account_id: transaction.account_id,
						},
					})
				expect(response.statusCode).toBe(200)
			})
		})

		it('should retrieve the most recent 10 transactions', async () => {
			const response = await request(app)
				.post('/api/getdisplaydata')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						resPerPage: 10,
						thisPage: 1,
						orderBy: 'timestamp',
						orderByDirection: 'DESC',
					},
				})
			expect(response.statusCode).toBe(200)

			const results = response.body.displayData

			const expectedResultOrder = [12, 14, 4, 13, 9, 15, 8, 7, 10, 5]
			results.forEach((transaction, index) => {
				expect(transaction.transaction_name).toBe(
					`TestTransaction${expectedResultOrder[index]}`
				)
			})
		})
		it('should retrieve the least recent 10 transactions', async () => {
			const response = await request(app)
				.post('/api/getdisplaydata')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						resPerPage: 10,
						thisPage: 1,
						orderBy: 'timestamp',
						orderByDirection: 'ASC',
					},
				})
			expect(response.statusCode).toBe(200)

			const results = response.body.displayData

			const expectedResultOrder = [3, 2, 6, 1, 11, 5, 10, 7, 8, 15]
			results.forEach((transaction, index) => {
				expect(transaction.transaction_name).toBe(
					`TestTransaction${expectedResultOrder[index]}`
				)
			})
		})
		it('should retrieve the 5 most expensive transactions', async () => {
			const response = await request(app)
				.post('/api/getdisplaydata')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						resPerPage: 5,
						thisPage: 1,
						orderBy: 'amount',
						orderByDirection: 'ASC',
					},
				})
			expect(response.statusCode).toBe(200)

			const results = response.body.displayData

			const expectedResultOrder = [9, 2, 13, 12, 8]
			results.forEach((transaction, index) => {
				expect(transaction.transaction_name).toBe(
					`TestTransaction${expectedResultOrder[index]}`
				)
			})
		})
		it('should retrieve the next 5 most expensive transactions', async () => {
			const response = await request(app)
				.post('/api/getdisplaydata')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						resPerPage: 5,
						thisPage: 2,
						orderBy: 'amount',
						orderByDirection: 'ASC',
					},
				})
			expect(response.statusCode).toBe(200)

			const results = response.body.displayData

			const expectedResultOrder = [7, 1, 10, 4, 5]
			results.forEach((transaction, index) => {
				expect(transaction.transaction_name).toBe(
					`TestTransaction${expectedResultOrder[index]}`
				)
			})
		})
		it('should retrieve the 5 least expensive transactions', async () => {
			const response = await request(app)
				.post('/api/getdisplaydata')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						resPerPage: 5,
						thisPage: 1,
						orderBy: 'amount',
						orderByDirection: 'DESC',
					},
				})
			expect(response.statusCode).toBe(200)

			const results = response.body.displayData

			const expectedResultOrder = [3, 6, 11, 14, 15]
			results.forEach((transaction, index) => {
				expect(transaction.transaction_name).toBe(
					`TestTransaction${expectedResultOrder[index]}`
				)
			})
		})
		it('should retrieve the next 5 least expensive transactions', async () => {
			const response = await request(app)
				.post('/api/getdisplaydata')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						resPerPage: 5,
						thisPage: 2,
						orderBy: 'amount',
						orderByDirection: 'DESC',
					},
				})
			expect(response.statusCode).toBe(200)

			const results = response.body.displayData

			const expectedResultOrder = [5, 4, 10, 1, 7]
			results.forEach((transaction, index) => {
				expect(transaction.transaction_name).toBe(
					`TestTransaction${expectedResultOrder[index]}`
				)
			})
		})

		it('should retrieve all transactions, sorted by category_name', async () => {
			const response = await request(app)
				.post('/api/getdisplaydata')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						resPerPage: 15,
						thisPage: 1,
						orderBy: 'category_name',
						orderByDirection: 'ASC',
					},
				})
			expect(response.statusCode).toBe(200)

			const results = response.body.displayData

			// temporary function to grab IDs easier
			const testArr = []
			results.forEach((res) =>
				testArr.push(parseInt(res.transaction_name.slice(15)))
			)

			const expectedResultOrder = [
				5, 9, 10, 1, 3, 4, 6, 13, 14, 2, 11, 15, 7, 8, 12,
			]
			results.forEach((transaction, index) => {
				expect(transaction.transaction_name).toBe(
					`TestTransaction${expectedResultOrder[index]}`
				)
			})
		})

		it('should retrieve all transactions, sorted by account_name', async () => {
			const response = await request(app)
				.post('/api/getdisplaydata')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						resPerPage: 15,
						thisPage: 1,
						orderBy: 'account_name',
						orderByDirection: 'ASC',
					},
				})
			expect(response.statusCode).toBe(200)

			const results = response.body.displayData

			const expectedResultOrder = [
				3, 10, 11, 1, 5, 9, 14, 15, 6, 8, 13, 2, 4, 7, 12,
			]
			results.forEach((transaction, index) => {
				expect(transaction.transaction_name).toBe(
					`TestTransaction${expectedResultOrder[index]}`
				)
			})
		})
		it('should retrieve all transactions, sorted by transaction_name', async () => {
			const response = await request(app)
				.post('/api/getdisplaydata')
				.send({
					username: newUserCredentials.username,
					token: token,
					payload: {
						resPerPage: 15,
						thisPage: 1,
						orderBy: 'transaction_name',
						orderByDirection: 'ASC',
					},
				})
			expect(response.statusCode).toBe(200)

			const results = response.body.displayData

			const expectedResultOrder = [
				1, 10, 11, 12, 13, 14, 15, 2, 3, 4, 5, 6, 7, 8, 9,
			]
			results.forEach((transaction, index) => {
				expect(transaction.transaction_name).toBe(
					`TestTransaction${expectedResultOrder[index]}`
				)
			})
		})
	})

	it('should delete the new user', async () => {
		const actualResponse = await request(app)
			.post('/api/deleteuser')
			.send({ username: newUserCredentials.username, token: token })
		expect(actualResponse.status).toBe(200)
	})
})
