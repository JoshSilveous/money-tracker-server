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
	interface Transaction {
		transaction_id: number
		name: string
		amount: number
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
		name: 'Transaction',
		profile: {
			keyNames: ['transaction_id', 'name', 'amount'],
			keyTypes: ['number', 'string', 'number'],
		},
	},
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
 * Union types can be used
 *
 * (e.x. `"UserData & TokenData"`)
 * @returns Boolean
 */
export function isTypeProfile(object: any, typeProfile: string) {
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
						tempTypeProfile = typeProf
					} else {
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
				tempTypeProfile = typeProf
				return true // stop the iteration
			}
		})
	}

	if (tempTypeProfile == undefined) {
		throw Error(`Type Profile ${typeProfile} doesn't exist!`)
	} else {
		const objectKeys = Object.keys(object)
		if (
			JSON.stringify(objectKeys) !==
			JSON.stringify(tempTypeProfile.profile.keyNames)
		) {
			return false
		}
		const objectValueTypes = Object.values(object).map((val) => typeof val)
		if (
			JSON.stringify(objectValueTypes) !==
			JSON.stringify(tempTypeProfile.profile.keyTypes)
		) {
			return false
		}

		return true
	}
}

export default {
	isTypeProfile,
}
