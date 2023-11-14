-   [x] switch POSTs to GET
-   [ ] update all request handlers

    -   [x] handleDeleteUser
    -   [ ] handleGetDisplayData - figure out how to pass params
    -   [x] handleGetTransaction
    -   [x] handleInsertTransaction
    -   [x] handleUpdateTransaction
    -   [x] handleDeleteTransaction
    -   [x] handleGetCategory
    -   [x] handleGetAllCategories
    -   [x] handleInsertCategory
    -   [x] handleUpdateCategory
    -   [x] handleDeleteCategory
    -   [x] handleGetAccount
    -   [x] handleGetAllAccounts
    -   [x] handleInsertAccount
    -   [x] handleUpdateAccount
    -   [x] handleDeleteAccount
    -   [x] handleCreateUser
    -   [x] handleLoginUser

-   [ ] remove old type checking system
    -   [ ] validateToken ?
-   [ ] update tests

-   [ ] fix front-end fetch requests
    -   add `authorization` header to requests, with a value following this format: 'Bearer ${token}'
    -   add `category_id`, `account_id`, etc. headers
