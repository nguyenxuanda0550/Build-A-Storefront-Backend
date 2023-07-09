Home http://localhost:3000 [GET]

Products
Index: 'http://localhost:3000/products' [GET]
Show: 'http://localhost:3000/products/:productName' [GET]
Create: 'http://localhost:3000/products' [POST]
Delete: 'http://localhost:3000/products' [DELETE]

Users
Index: 'http://localhost:3000/users' [GET]
Show : 'http://localhost:3000/api/v1/users/:userid' [GET]
Create: 'http://localhost:3000/api/v1/users/auth/add/user' [POST]
Delete: 'http://localhost:3000/users' [DELETE]

Orders
Index: 'http://localhost:3000/orders' [GET]
Show: 'http://localhost:3000/orders/' [GET]
Create: 'http://localhost:3000/orders' [POST]
Delete: 'http://localhost:3000/orders' [DELETE]



Product
id
name
price
category

User
id
firstname
lastname
password

Orders
id
user_id


Order_Products
id
product_id
order_id
quantity
