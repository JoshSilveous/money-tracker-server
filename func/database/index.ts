import createUserSRC from './functions/createUser'
import getUserSRC from './functions/getUser'
import verifyDBFileExistsSRC from './functions/verifyDBFileExists'
import getUserDataSRC from './functions/getUserData'
import getUserFilePathSRC from './functions/getUserFilePath'

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
