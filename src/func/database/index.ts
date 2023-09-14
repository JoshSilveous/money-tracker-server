import createUserSRC from './functions/Users/createUser'
import getUserSRC from './functions/Users/getUser'
import verifyDBFileExistsSRC from './functions/Users/verifyDBFileExists'
import getUserDataSRC from './functions/Users/getUserData'
import getUserFilePathSRC from './functions/Users/getUserFilePath'
import deleteUserSRC from './functions/Users/deleteUser'

import getDisplayDataSRC from './functions/DisplayData/getDisplayData'

import getTransactionSRC from './functions/Transactions/getTransaction'
import getAllTransactionsSRC from './functions/Transactions/getAllTransactions'
import insertTransactionSRC from './functions/Transactions/insertTransaction'
import updateTransactionSRC from './functions/Transactions/updateTransaction'
import deleteTransactionSRC from './functions/Transactions/deleteTransaction'

import getEarningSRC from './functions/Earnings/getEarning'
import getAllEarningsSRC from './functions/Earnings/getAllEarnings'
import insertEarningSRC from './functions/Earnings/insertEarning'
import updateEarningSRC from './functions/Earnings/updateEarning'
import deleteEarningSRC from './functions/Earnings/deleteEarning'

import getCategorySRC from './functions/Categories/getCategory'
import getAllCategoriesSRC from './functions/Categories/getAllCategories'
import insertCategorySRC from './functions/Categories/insertCategory'
import updateCategorySRC from './functions/Categories/updateCategory'
import deleteCategorySRC from './functions/Categories/deleteCategory'

import getAccountSRC from './functions/Accounts/getAccount'
import getAllAccountsSRC from './functions/Accounts/getAllAccounts'
import insertAccountSRC from './functions/Accounts/insertAccount'
import updateAccountSRC from './functions/Accounts/updateAccount'
import deleteAccountSRC from './functions/Accounts/deleteAccount'

/* ---------------- */
/*  USER FUNCTIONS  */
/* ---------------- */

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
 * Deletes a user from the database, and removes their file.
 * @param user_id
 */
export const deleteUser = deleteUserSRC

/**
 * Get's a chunk of DisplayData for the user, sorted by parameters.
 * @param user_id
 * @param resPerPage Results per page
 * @param thisPage The page requested
 * @param orderBy The category name to be ordered by
 * @param orderByDirection `"ASC"` or `"DESC"`
 * @returns An array of `DataDisplay` objects
 */
export const getDisplayData = getDisplayDataSRC

/* ----------------------- */
/*  TRANSACTION FUNCTIONS  */
/* ----------------------- */

/**
 * Retrieves a Transaction from the user's database
 * @param user_id The user's ID
 * @param transaction_id The transaction's ID
 * @returns The `Transaction` object
 */
export const getTransaction = getTransactionSRC

/**
 * Retrieves all Transactions from the user's database
 * @param user_id The user's ID
 * @returns The `Transaction` object array
 */
export const getAllTransactions = getAllTransactionsSRC

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

/* ------------------- */
/*  EARNING FUNCTIONS  */
/* ------------------- */

/**
 * Retrieves a Earning from the user's database
 * @param user_id The user's ID
 * @param earning_id The earning's ID
 * @returns The `Earning` object
 */
export const getEarning = getEarningSRC

/**
 * Retrieves all Earnings from the user's database
 * @param user_id The user's ID
 * @returns The `Earning` object array
 */
export const getAllEarnings = getAllEarningsSRC

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

/* -------------------- */
/*  CATEGORY FUNCTIONS  */
/* -------------------- */

/**
 * Retrieves a Category from the user's database
 * @param user_id The user's ID
 * @param category_id The category's ID
 * @returns The `Category` object
 */
export const getCategory = getCategorySRC

/**
 * Retrieves all Categories from the user's database
 * @param user_id The user's ID
 * @returns The `Category` object array
 */
export const getAllCategories = getAllCategoriesSRC

/**
 * Inserts a category into a user's database
 * @param user_id The user's ID
 * @param earning The `NewCategory` object (no ID)
 * @returns The newly created `category_id`
 */
export const insertCategory = insertCategorySRC

/**
 * Updates a category in a user's database
 * @param user_id The user's ID
 * @param earning The `Category` object (WITH ID)
 */
export const updateCategory = updateCategorySRC

/**
 * Deletes a category from a user's database
 * @param user_id The user's ID
 * @param earning_id The category's ID
 */
export const deleteCategory = deleteCategorySRC

/* ------------------- */
/*  ACCOUNT FUNCTIONS  */
/* ------------------- */

/**
 * Retrieves a Account from the user's database
 * @param user_id The user's ID
 * @param account_id The account's ID
 * @returns The `Account` object
 */
export const getAccount = getAccountSRC

/**
 * Retrieves all Accounts from the user's database
 * @param user_id The user's ID
 * @returns The `Account` object array
 */
export const getAllAccounts = getAllAccountsSRC

/**
 * Inserts a account into a user's database
 * @param user_id The user's ID
 * @param earning The `NewAccount` object (no ID)
 * @returns The newly created `account_id`
 */
export const insertAccount = insertAccountSRC

/**
 * Updates a account in a user's database
 * @param user_id The user's ID
 * @param earning The `Account` object (WITH ID)
 */
export const updateAccount = updateAccountSRC

/**
 * Deletes a account from a user's database
 * @param user_id The user's ID
 * @param earning_id The account's ID
 */
export const deleteAccount = deleteAccountSRC
