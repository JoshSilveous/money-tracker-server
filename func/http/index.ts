import handleCreateUserSRC from './functions/handleCreateUser'
import handleLoginUserSRC from './functions/handleLoginUser'
import handleRequestDataSRC from './functions/handleRequestData'
import handleInsertTransactionSRC from './functions/handleInsertTransaction'

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

export const handleInsertTransaction = handleInsertTransactionSRC
