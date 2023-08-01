import createUserSRC from './functions/createUser'
import getUserSRC from './functions/getUser'
import verifyDBFileExistsSRC from './functions/verifyDBFileExists'

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
 * @param user_id the user's ID (also the file name)
 * @return `Boolean`
 */
export const verifyDBFileExists = verifyDBFileExistsSRC
