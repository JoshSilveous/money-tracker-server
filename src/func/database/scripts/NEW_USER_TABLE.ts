const NEW_USER_TABLE = `
    CREATE TABLE categories (
        category_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR UNIQUE NOT NULL,
        description VARCHAR
    );
    CREATE TABLE accounts (
        account_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR NOT NULL,
        description VARCHAR
    );
    CREATE TABLE transactions (
        transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR NOT NULL,
        timestamp DATETIME,
        notes VARCHAR,
        amount INTEGER NOT NULL,
        category_id INTEGER,
        account_id INTEGER,
        FOREIGN KEY (category_id) REFERENCES categories(category_id),
        FOREIGN KEY (account_id) REFERENCES accounts(account_id)
    );
    CREATE TABLE earnings (
        earning_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR NOT NULL,
        timestamp DATETIME,
        notes VARCHAR,
        amount INTEGER NOT NULL,
        account_id INTEGER,
        FOREIGN KEY (account_id) REFERENCES accounts(account_id)
    );
`
export default NEW_USER_TABLE
