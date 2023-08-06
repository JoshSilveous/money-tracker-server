import handleCreateUserSRC from './handlers/handleCreateUser'
import handleLoginUserSRC from './handlers/handleLoginUser'
import handleRequestDataSRC from './handlers/handleRequestData'
import handleInsertTransactionSRC from './handlers/Transactions/handleInsertTransaction'
import handleUpdateTransactionSRC from './handlers/Transactions/handleUpdateTransaction'
import handleDeleteTransactionSRC from './handlers/Transactions/handleDeleteTransaction'

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
 * Handles HTTP Request for `/deleteTransaction`
 */
export const handleDeleteTransaction = handleDeleteTransactionSRC
