import createUserSRC from './functions/Users/createUser'
import getUserSRC from './functions/Users/getUser'
import verifyDBFileExistsSRC from './functions/Users/verifyDBFileExists'
import getUserDataSRC from './functions/Users/getUserData'
import getUserFilePathSRC from './functions/Users/getUserFilePath'
import insertTransactionSRC from './functions/Transactions/insertTransaction'
import updateTransactionSRC from './functions/Transactions/updateTransaction'
import deleteTransactionSRC from './functions/Transactions/deleteTransaction'
import insertEarningSRC from './functions/Earnings/insertEarning'
import updateEarningSRC from './functions/Earnings/updateEarning'
import deleteEarningSRC from './functions/Earnings/deleteEarning'

/**
 * Creates a new user in the database.
 * @param user The `UserCredentials` object.
 * @returns The newly-created `user_id`.
 */
export const createUser = createUserSRC

/**
 * Checks if provided credentials match an existing account.
 * @param user The `UserCredentials` object.
 * @returns The `UserInfo` object, containing `user_id`, if match is found. Otherwise, returns `undefined`.
 */
export const getUser = getUserSRC

/**
 * Checks if a user has an existing DB file
 * @return `Boolean`
 */
export const verifyDBFileExists = verifyDBFileExistsSRC

/**
 * Get the path to a user's db file
 */
export const getUserFilePath = getUserFilePathSRC

/**
 * Gets all user data from the `transaction` table
 * @param user_id
 * @returns `Transaction[]`
 */
export const getUserData = getUserDataSRC

/**
 * Inserts a transaction into a user's database
 * @param user_id The user's ID
 * @param transaction The `NewTransaction` object (no ID)
 * @returns The newly created `transaction_id`
 */
export const insertTransaction = insertTransactionSRC

/**
 * Updates a transaction in a user's database
 * @param user_id The user's ID
 * @param transaction The `Transaction` object (WITH ID)
 */
export const updateTransaction = updateTransactionSRC

/**
 * Deletes a transaction from a user's database
 * @param user_id The user's ID
 * @param transaction_id The transaction's ID
 */
export const deleteTransaction = deleteTransactionSRC

/**
 * Inserts a earning into a user's database
 * @param user_id The user's ID
 * @param earning The `NewEarning` object (no ID)
 * @returns The newly created `earning_id`
 */
export const insertEarning = insertEarningSRC

/**
 * Updates a earning in a user's database
 * @param user_id The user's ID
 * @param earning The `Earning` object (WITH ID)
 */
export const updateEarning = updateEarningSRC

/**
 * Deletes a earning from a user's database
 * @param user_id The user's ID
 * @param earning_id The earning's ID
 */
export const deleteEarning = deleteEarningSRC
