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
	timestamp: string
	notes: string | null
	amount: number
	category_id: number | null
	account_id: number | null
}
interface NewTransaction {
	name: string
	timestamp: string
	notes: string | null
	amount: number
	category_id: number | null
	account_id: number | null
}
interface DisplayTransaction {
	transaction_id: number
	transaction_name: string
	timestamp: string
	amount: number
	category_name: string
	account_name: string
}
interface DisplayDataRequest {
	resPerPage: number
	thisPage: number
	orderBy: 'timestamp' | 'name' | 'category_name' | 'account_name' | 'amount'
	orderByDirection: 'ASC' | 'DESC'
}
interface TypeProfile {
	name: string
	profile: { keyNames: string[]; keyTypes: string[] }
}
