import SQLite from 'better-sqlite3'

// get absolute path to 'users.db' file
const thisFilePath = __dirname.split('\\')
thisFilePath.pop()
thisFilePath.pop()
const userFilePath = thisFilePath.join('\\') + '\\data\\users.db'

// create database connection
export const db = new SQLite(userFilePath)

db.exec(`
    CREATE TABLE IF NOT EXISTS user (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR NOT NULL,
        password VARCHAR NOT NULL,
        UNIQUE (username COLLATE NOCASE)
    );
`)

export default { db }
