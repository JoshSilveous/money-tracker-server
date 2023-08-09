import handleCreateUserSRC from './handlers/handleCreateUser'
import handleLoginUserSRC from './handlers/handleLoginUser'
import handleRequestDataSRC from './handlers/handleRequestData'

import handleGetTransactionSRC from './handlers/Transactions/handleGetTransaction'
import handleInsertTransactionSRC from './handlers/Transactions/handleInsertTransaction'
import handleUpdateTransactionSRC from './handlers/Transactions/handleUpdateTransaction'
import handleDeleteTransactionSRC from './handlers/Transactions/handleDeleteTransaction'

import handleGetEarningSRC from './handlers/Earnings/handleGetEarning'
import handleInsertEarningSRC from './handlers/Earnings/handleInsertEarning'
import handleUpdateEarningSRC from './handlers/Earnings/handleUpdateEarning'
import handleDeleteEarningSRC from './handlers/Earnings/handleDeleteEarning'

import handleGetCategorySRC from './handlers/Categories/handleGetCategory'
import handleInsertCategorySRC from './handlers/Categories/handleInsertCategory'
import handleUpdateCategorySRC from './handlers/Categories/handleUpdateCategory'
import handleDeleteCategorySRC from './handlers/Categories/handleDeleteCategory'

import handleGetAccountSRC from './handlers/Accounts/handleGetAccount'
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

/* ------------------- */
/*  EARNING FUNCTIONS  */
/* ------------------- */

/**
 * Handles HTTP Request for `/getearning`
 */
export const handleGetEarning = handleGetEarningSRC

/**
 * Handles HTTP Request for `/insertearning`
 */
export const handleInsertEarning = handleInsertEarningSRC

/**
 * Handles HTTP Request for `/updateearning`
 */
export const handleUpdateEarning = handleUpdateEarningSRC

/**
 * Handles HTTP Request for `/deleteearning`
 */
export const handleDeleteEarning = handleDeleteEarningSRC

/* -------------------- */
/*  CATEGORY FUNCTIONS  */
/* -------------------- */

/**
 * Handles HTTP Request for `/getcategory`
 */
export const handleGetCategory = handleGetCategorySRC

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
