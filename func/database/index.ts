import createUserSRC from './functions/createUser'
import getUserSRC from './functions/getUser'
import verifyDBFileExistsSRC from './functions/verifyDBFileExists'
import getUserDataSRC from './functions/getUserData'
import getUserFilePathSRC from './functions/getUserFilePath'
import insertTransactionSRC from './functions/insertTransaction'
import updateTransactionSRC from './functions/updateTransaction'
import deleteTransactionSRC from './functions/deleteTransaction'

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
