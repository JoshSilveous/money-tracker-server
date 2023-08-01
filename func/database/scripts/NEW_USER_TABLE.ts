const NEW_USER_TABLE = `
    CREATE TABLE transactions (
        transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR,
        amount INTEGER
    );
`
export default NEW_USER_TABLE
