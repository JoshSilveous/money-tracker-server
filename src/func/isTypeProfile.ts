import { typeProfiles } from '../../GlobalTypes'
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
function isTypeProfile(object: any, typeProfile: string): boolean {
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
		const objectValues = Object.values(object)

		// compare lengths
		if (
			objectKeys.length !== tempTypeProfile.profile.keyNames.length ||
			objectValueTypes.length !== tempTypeProfile.profile.keyTypes.length
		) {
			return false
		}

		let isMatch = true

		// compare each key
		tempTypeProfile.profile.keyNames.some((keyName, index) => {
			const thisKeyType = tempTypeProfile!.profile.keyTypes[index]
			const actualKeyName = objectKeys[index]
			const actualValueType = objectValueTypes[index]

			// if a key is optional (indicated with "?keyname")
			// remove the ? and set isOptional to true
			let isOptional = keyName[0] === '?'
			if (isOptional) {
				keyName = keyName.slice(1)
			}

			// compare object keyName with profile keyName
			if (keyName !== actualKeyName) {
				isMatch = false
				return true // exit loop
			}

			// compare object valueType with profile valueType
			if (actualValueType !== thisKeyType) {
				// if they do not match, but isOptional is true,
				// check for "null"
				// otherwise, return false
				if (
					!(
						isOptional &&
						actualValueType === 'object' &&
						objectValues[index] !== 'null'
					)
				) {
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

export default isTypeProfile
