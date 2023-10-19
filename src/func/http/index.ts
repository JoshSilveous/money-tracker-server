import handleCreateUserSRC from './handlers/User/handleCreateUser'
import handleLoginUserSRC from './handlers/User/handleLoginUser'
import handleRequestDataSRC from './handlers/User/handleRequestData'
import handleDeleteUserSRC from './handlers/User/handleDeleteUser'

import handleGetDisplayDataSRC from './handlers/DisplayData/handleGetDisplayData'

import handleGetTransactionSRC from './handlers/Transactions/handleGetTransaction'
import handleInsertTransactionSRC from './handlers/Transactions/handleInsertTransaction'
import handleUpdateTransactionSRC from './handlers/Transactions/handleUpdateTransaction'
import handleDeleteTransactionSRC from './handlers/Transactions/handleDeleteTransaction'

import handleGetCategorySRC from './handlers/Categories/handleGetCategory'
import handleGetAllCategoriesSRC from './handlers/Categories/handleGetAllCategories'
import handleInsertCategorySRC from './handlers/Categories/handleInsertCategory'
import handleUpdateCategorySRC from './handlers/Categories/handleUpdateCategory'
import handleDeleteCategorySRC from './handlers/Categories/handleDeleteCategory'

import handleGetAccountSRC from './handlers/Accounts/handleGetAccount'
import handleGetAllAccountsSRC from './handlers/Accounts/handleGetAllAccounts'
import handleInsertAccountSRC from './handlers/Accounts/handleInsertAccount'
import handleUpdateAccountSRC from './handlers/Accounts/handleUpdateAccount'
import handleDeleteAccountSRC from './handlers/Accounts/handleDeleteAccount'

/* ---------------- */
/*  USER FUNCTIONS  */
/* ---------------- */

/**
 * Handles HTTP Request for `/createuser`
 */
export const handleCreateUser = handleCreateUserSRC

/**
 * Handles HTTP Request for `/loginuser`
 */
export const handleLoginUser = handleLoginUserSRC

/**
 * Handles HTTP Request for `/requestdata`
 */
export const handleRequestData = handleRequestDataSRC

/**
 * Handles HTTP Request for `/loginuser`
 */
export const handleDeleteUser = handleDeleteUserSRC

/**
 * handles HTTP Request for `/getDisplayData`
 */
export const handleGetDisplayData = handleGetDisplayDataSRC

/* ----------------------- */
/*  TRANSACTION FUNCTIONS  */
/* ----------------------- */

/**
 * Handles HTTP Request for `/gettransaction`
 */
export const handleGetTransaction = handleGetTransactionSRC

/**
 * Handles HTTP Request for `/inserttransaction`
 */
export const handleInsertTransaction = handleInsertTransactionSRC

/**
 * Handles HTTP Request for `/updatetransaction`
 */
export const handleUpdateTransaction = handleUpdateTransactionSRC

/**
 * Handles HTTP Request for `/deletetransaction`
 */
export const handleDeleteTransaction = handleDeleteTransactionSRC

/* -------------------- */
/*  CATEGORY FUNCTIONS  */
/* -------------------- */

/**
 * Handles HTTP Request for `/getcategory`
 */
export const handleGetCategory = handleGetCategorySRC

/**
 * Handles HTTP Request for `/getallcategories`
 */
export const handleGetAllCategories = handleGetAllCategoriesSRC

/**
 * Handles HTTP Request for `/insertcategory`
 */
export const handleInsertCategory = handleInsertCategorySRC

/**
 * Handles HTTP Request for `/updatecategory`
 */
export const handleUpdateCategory = handleUpdateCategorySRC

/**
 * Handles HTTP Request for `/deletecategory`
 */
export const handleDeleteCategory = handleDeleteCategorySRC

/* ------------------- */
/*  ACCOUNT FUNCTIONS  */
/* ------------------- */

/**
 * Handles HTTP Request for `/getaccount`
 */
export const handleGetAccount = handleGetAccountSRC

/**
 * Handles HTTP Request for `/getallaccounts`
 */
export const handleGetAllAccounts = handleGetAllAccountsSRC

/**
 * Handles HTTP Request for `/insertaccount`
 */
export const handleInsertAccount = handleInsertAccountSRC

/**
 * Handles HTTP Request for `/updateaccount`
 */
export const handleUpdateAccount = handleUpdateAccountSRC

/**
 * Handles HTTP Request for `/deleteaccount`
 */
export const handleDeleteAccount = handleDeleteAccountSRC
