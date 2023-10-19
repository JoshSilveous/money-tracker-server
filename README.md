# API Docs
## Transactions
### Get Transaction
  URI: `/api/gettransaction`

  Request Format:
  ```
  {
    username: string,
    token: string,
    payload: {
      transaction_id: number
    }
  }
  ```
  
  Response Body Format:
  ```
  {
    transaction: {
      transaction_id: number,
      name: string,
      timestamp: number,
      notes: string | null,
      amount: number,
      category_id: number | null,
      account_id: number | null
    }
  }
  ```

### Insert Transaction
URI: `/api/inserttransaction`

  Request Format:
  ```
  {
    username: string,
    token: string,
    payload: {
      name: string,
      timestamp: number,
      notes: string | null,
      amount: number,
      category_id: number | null,
      account_id: number | null
    }
  }
  ```
  
  Response Body Format:
  ```
  {
    transaction_id: number
  }
  ```

### Update Transaction
URI: `/api/updatetransaction`

  Request Format:
  ```
  {
    username: string,
    token: string,
    payload: {
      transaction_id: number
      name: string,
      timestamp: number,
      notes: string | null,
      amount: number,
      category_id: number | null,
      account_id: number | null
    }
  }
  ```
  
  No response body
  
## Users

## Category

## Account

## Transactions

## Other
