declare global {
	interface UserCredentials {
		username: string
		password: string
	}
	interface UserInfo {
		user_id: number
		username: string
		password: string
	}
	interface TokenData {
		user_id: number
		username: string
		iat: number
		exp: number
	}
	interface UserGetRequest {
		username: string
		token: string
	}
	interface UserPostRequest {
		username: string
		token: string
		payload: object
	}

	interface Category {
		category_id: number
		name: string
		description: string | null
	}
	interface NewCategory {
		name: string
		description: string | null
	}
	interface Account {
		account_id: number
		name: string
		description: string | null
	}
	interface NewAccount {
		name: string
		description: string | null
	}
	interface Transaction {
		transaction_id: number
		name: string
		timestamp: number
		notes: string | null
		amount: number
		category_id: number | null
		account_id: number | null
	}
	interface NewTransaction {
		name: string
		timestamp: number
		notes: string | null
		amount: number
		category_id: number | null
		account_id: number | null
	}
	interface TransactionID {
		transaction_id: number
	}
	interface Earning {
		earning_id: number
		name: string
		timestamp: number
		notes: string | null
		amount: number
		account_id: number | null
	}
	interface NewEarning {
		name: string
		timestamp: number
		notes: string | null
		amount: number
		account_id: number
	}
	interface TypeProfile {
		name: string
		profile: { keyNames: string[]; keyTypes: string[] }
	}
}
export const typeProfiles: TypeProfile[] = [
	{
		name: 'UserCredentials',
		profile: {
			keyNames: ['username', 'password'],
			keyTypes: ['string', 'string'],
		},
	},
	{
		name: 'UserInfo',
		profile: {
			keyNames: ['user_id', 'username', 'password'],
			keyTypes: ['number', 'string', 'string'],
		},
	},
	{
		name: 'TokenData',
		profile: {
			keyNames: ['user_id', 'username', 'iat', 'exp'],
			keyTypes: ['number', 'string', 'number', 'number'],
		},
	},
	{
		name: 'UserGetRequest',
		profile: {
			keyNames: ['username', 'token'],
			keyTypes: ['string', 'string'],
		},
	},
	{
		name: 'UserPostRequest',
		profile: {
			keyNames: ['username', 'token', 'payload'],
			keyTypes: ['string', 'string', 'object'],
		},
	},
	{
		name: 'Category',
		profile: {
			keyNames: ['category_id', 'name', '?description'],
			keyTypes: ['number', 'string', 'string'],
		},
	},
	{
		name: 'NewCategory',
		profile: {
			keyNames: ['name', '?description'],
			keyTypes: ['string', 'string'],
		},
	},
	{
		name: 'Account',
		profile: {
			keyNames: ['account_id', 'name', '?description'],
			keyTypes: ['number', 'string', 'string'],
		},
	},
	{
		name: 'NewAccount',
		profile: {
			keyNames: ['name', '?description'],
			keyTypes: ['string', 'string'],
		},
	},
	{
		name: 'Transaction',
		profile: {
			keyNames: [
				'transaction_id',
				'name',
				'timestamp',
				'?notes',
				'amount',
				'?category_id',
				'?account_id',
			],
			keyTypes: [
				'number',
				'string',
				'number',
				'string',
				'number',
				'number',
				'number',
			],
		},
	},
	{
		name: 'TransactionID',
		profile: {
			keyNames: ['transaction_id'],
			keyTypes: ['number'],
		},
	},
	{
		name: 'NewTransaction',
		profile: {
			keyNames: [
				'name',
				'timestamp',
				'?notes',
				'amount',
				'?category_id',
				'?account_id',
			],
			keyTypes: [
				'string',
				'number',
				'string',
				'number',
				'number',
				'number',
			],
		},
	},
	{
		name: 'Earning',
		profile: {
			keyNames: [
				'earning_id',
				'name',
				'timestamp',
				'?notes',
				'amount',
				'?account_id',
			],
			keyTypes: [
				'number',
				'string',
				'number',
				'string',
				'number',
				'number',
			],
		},
	},
	{
		name: 'NewEarning',
		profile: {
			keyNames: ['name', 'timestamp', '?notes', 'amount', '?account_id'],
			keyTypes: ['string', 'number', 'string', 'number', 'number'],
		},
	},
	{
		name: 'test',
		profile: {
			keyNames: ['one', '?two'],
			keyTypes: ['string', 'string'],
		},
	},
]
