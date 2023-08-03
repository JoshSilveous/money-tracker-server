// UserCredentials
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
		iat: number
		exp: number
	}
	interface UserDataRequest {
		username: string
		token: string
	}
	interface UserInsertTransactionRequest {
		username: string
		token: string
		transaction: NewTransaction
	}

	interface Category {
		category_id: number
		name: string
		description: string | undefined
	}
	interface NewCategory {
		name: string
		description: string | undefined
	}
	interface Account {
		account_id: number
		name: string
		description: string | undefined
	}
	interface NewAccount {
		name: string
		description: string | undefined
	}
	interface Transaction {
		transaction_id: number
		name: string
		timestamp: number
		notes: string | undefined
		amount: number
		category_id: number  | undefined
		account_id: number | undefined
	}
	interface NewTransaction {
		name: string
		timestamp: number
		notes: string | undefined
		amount: number
		category_id: number | undefined
		account_id: number | undefined
	}
	interface Earning {
		earning_id: number
		name: string
		timestamp: number
		notes: string | undefined
		amount: number
		account_id: number | undefined
	}
	interface NewEarning {
		name: string
		timestamp: number
		notes: string | undefined
		amount: number
		account_id: number
	}
}
const typeProfiles: TypeProfile[] = [
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
			keyNames: ['iat', 'exp'],
			keyTypes: ['number', 'number'],
		},
	},
	{
		name: 'UserDataRequest',
		profile: {
			keyNames: ['username', 'token'],
			keyTypes: ['string', 'string'],
		},
	},
	{
		name: 'UserInsertTransactionRequest',
		profile: {
			keyNames: ['username', 'token', 'transaction'],
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
			keyNames: ['transaction_id', 'name', 'timestamp', '?notes', 'amount', '?category_id', '?account_id'],
			keyTypes: ['number', 'string','number', 'string', 'number', 'number', 'number'],
		},
	},
	{
		name: 'NewTransaction',
		profile: {
			keyNames: ['name', 'timestamp', '?notes', 'amount', '?category_id', '?account_id'],
			keyTypes: ['string', 'number', 'string', 'number', 'number', 'number'],
		},
	},
	{
		name: 'Earning',
		profile: {
			keyNames: ['earning_id', 'name', 'timestamp', '?notes', 'amount', '?account_id'],
			keyTypes: ['number', 'string','number', 'string', 'number', 'number'],
		},
	},
	{
		name: 'NewEarning',
		profile: {
			keyNames: ['name', 'timestamp', '?notes', 'amount', '?account_id'],
			keyTypes: ['string','number', 'string', 'number', 'number'],
		},
	},
	{
		name: "test",
		profile: {
			keyNames: ['one', '?two'],
			keyTypes: ['string', 'string']
		}
	}
]

interface TypeProfile {
	name: string
	profile: { keyNames: string[]; keyTypes: string[] }
}
/**
 * Checks an object's type, compared to it's TypeProfile (defined in `TypeChecking.ts`)
 * @param object The object to check
 * @param typeProfile The TypeProfile's name, should be identicle to `Interface` name.
 * Error thrown if typeProfile doesn't exist
 *
 * Union types can be used
 *
 * (e.x. `"UserData & TokenData"`)
 * @returns Boolean
 */
export function isTypeProfile(object: any, typeProfile: string): boolean {
	// create array from provided typeProfile
	const inputTypeProfilesArr = typeProfile.split(' & ')

	let tempTypeProfile: TypeProfile | undefined
	if (inputTypeProfilesArr.length > 1) {
		// if user provided multiple types

		inputTypeProfilesArr.forEach((inputTypeProf, inputTypeProfIndex) => {
			// loop over each type provided
			let typeProfileFound = false
			typeProfiles.some((typeProf) => {
				// loop over each TypeProfile defined in this file

				if (typeProf.name === inputTypeProf) {
					// if a matching typeProfile is found
					typeProfileFound = true
					if (inputTypeProfIndex === 0) {
						// for the first provided TypeProfile, create a copy
						tempTypeProfile = {
							name: typeProf.name,
							profile: {
								keyNames: [...typeProf.profile.keyNames],
								keyTypes: [...typeProf.profile.keyTypes],
							},
						}
					} else {
						tempTypeProfile!.name += ' & ' + inputTypeProf
						// for each subsequent TypeProfile, merge the key data to the temporary
						typeProf.profile.keyNames.forEach((keyName) => {
							tempTypeProfile!.profile.keyNames.push(keyName)
						})
						typeProf.profile.keyTypes.forEach((keyType) => {
							tempTypeProfile!.profile.keyTypes.push(keyType)
						})
					}
					return true // stop the iteration
				}
			})
			if (!typeProfileFound) {
				throw Error(`Type Profile ${inputTypeProf} doesn't exist!`)
			}
		})
	} else {
		typeProfiles.some((typeProf) => {
			if (typeProf.name === inputTypeProfilesArr[0]) {
				tempTypeProfile = { ...typeProf }
				return true // stop the iteration
			}
		})
	}

	

	if (tempTypeProfile !== undefined) {

		const objectKeys = Object.keys(object)
		const objectValueTypes = Object.values(object).map((val) => typeof val)

		// identify optional attributes
		console.log(tempTypeProfile)
		console.log(objectKeys)
		console.log(objectValueTypes)


		let isMatch = true

		// compare each key
		tempTypeProfile.profile.keyNames.some((keyName, index) => {

			const thisKeyType = tempTypeProfile!.profile.keyTypes[index]
			const actualKeyName = objectKeys[index]
			const actualValueType = objectValueTypes[index]

			// if a key is optional (indicated with "?keyname")
			// remove the ? and set isOptional to true
			let isOptional = keyName[0] === '?'
			if (isOptional) {keyName = keyName.slice(1)}

			// compare object keyName with profile keyName
			if (keyName !== actualKeyName) {
				isMatch = false
				return true // exit loop
			}

			// compare object valueType with profile valueType
			if (actualValueType !== thisKeyType) {

				// if they do not match, but isOptional is true,
				// check for "undefined"
				// otherwise, return false
				if (!(isOptional && actualValueType === "undefined")) {
					console.log('passed optional')
					isMatch = false
					return true // exit loop
				}
			}

		})
		return isMatch
	} else {
		throw Error(`Type Profile ${typeProfile} doesn't exist!`)
	}
}

export default {
	isTypeProfile,
}
