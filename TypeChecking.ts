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
 * @returns Boolean
 */
export function isTypeProfile(object: any, typeProfile: string) {
	let thisTypeProfile: TypeProfile | undefined
	typeProfiles.forEach((typeProf) => {
		if (typeProf.name === typeProfile) {
			thisTypeProfile = typeProf
		}
	})

	if (thisTypeProfile == undefined) {
		throw Error(`Type Profile ${typeProfile} doesn't exist!`)
	} else {
		const objectKeys = Object.keys(object)
		if (
			JSON.stringify(objectKeys) !==
			JSON.stringify(thisTypeProfile.profile.keyNames)
		) {
			return false
		}
		const objectValueTypes = Object.values(object).map((val) => typeof val)
		if (
			JSON.stringify(objectValueTypes) !==
			JSON.stringify(thisTypeProfile.profile.keyTypes)
		) {
			return false
		}

		return true
	}
}

export default {
	isTypeProfile,
}
