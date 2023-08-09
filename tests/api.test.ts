import request from 'supertest'
import { app } from '../src/api'

let server
beforeAll(() => {
	server = app.listen(3000) // Start the server
})

afterAll((done) => {
	server.close(done) // Close the server when all tests are done
})

describe('User API', () => {
	const newUserCredentials: UserCredentials = {
		username: 'jest_test_new_user',
		password: 'jest_test_new_user',
	}

	it('should add a new user', async () => {
		const response = await request(app)
			.post('/createuser')
			.send(newUserCredentials)
		expect(response.status).toBe(200)
	})
	it('should login as new user', async () => {
		const actualResponse = await request(app)
			.post('/loginuser')
			.send(newUserCredentials)
		expect(actualResponse.status).toBe(200)
	})
})
