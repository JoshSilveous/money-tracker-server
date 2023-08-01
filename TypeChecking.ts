interface TypeProfile {
	keyNames: string[]
	keyTypes: string[]
}
function isTypeProfile(object: any, TypeProfile: TypeProfile) {
	const objectKeys = Object.keys(object)
	if (JSON.stringify(objectKeys) !== JSON.stringify(TypeProfile.keyNames)) {
		return false
	}

	const objectValueTypes = Object.values(object).map((val) => typeof val)
	if (
		JSON.stringify(objectValueTypes) !==
		JSON.stringify(TypeProfile.keyTypes)
	) {
		return false
	}

	return true
}
