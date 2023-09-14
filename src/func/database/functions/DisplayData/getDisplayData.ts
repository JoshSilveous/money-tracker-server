// okay, this one's gonna be complicated.
// we need to accept parameters to limit how many results per page, and which page the user is on.
// also accepts ORDER BY parameters

// date seperation and such is handled on the front-end

// Y axis
// Timestamp  |  Name  |  Category  |  Amount  |  Account

function getDisplayData(
	user_id: number,
	resPerPage: number,
	amtPerPage: number,
	orderBy: 'date' | 'name' | 'category' | 'account' | 'amount'
) {}
export default getDisplayData
