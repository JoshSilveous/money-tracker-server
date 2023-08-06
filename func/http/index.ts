import handleCreateUserSRC from './handlers/handleCreateUser'
import handleLoginUserSRC from './handlers/handleLoginUser'
import handleRequestDataSRC from './handlers/handleRequestData'
import handleInsertTransactionSRC from './handlers/Transactions/handleInsertTransaction'
import handleUpdateTransactionSRC from './handlers/Transactions/handleUpdateTransaction'
import handleDeleteTransactionSRC from './handlers/Transactions/handleDeleteTransaction'
import handleInsertEarningSRC from './handlers/Earnings/handleInsertEarning'
import handleUpdateEarningSRC from './handlers/Earnings/handleUpdateEarning'
import handleDeleteEarningSRC from './handlers/Earnings/handleDeleteEarning'

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
