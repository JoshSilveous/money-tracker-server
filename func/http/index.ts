import handleCreateUserSRC from './handlers/handleCreateUser'
import handleLoginUserSRC from './handlers/handleLoginUser'
import handleRequestDataSRC from './handlers/handleRequestData'
import handleInsertTransactionSRC from './handlers/handleInsertTransaction'
import handleUpdateTransactionSRC from './handlers/handleUpdateTransaction'

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
