Home http://localhost:3000 [GET]

Products
Index: 'http://localhost:3000/products' [GET]
Show: 'http://localhost:3000/products/:productName' [GET]
Create: 'http://localhost:3000/products' [POST]
Delete: 'http://localhost:3000/products' [DELETE]

Users
Index: 'http://localhost:3000/users' [GET]
Show : 'http://localhost:3000/users/:userid' [GET]
Create: 'http://localhost:3000/users/auth/add/user' [POST]
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



# Products
    Index
    showProduct (args: product id)
    Create (args: product name, product price ...) [token required]
    Delete (args: product id) [token required]
# Users
    Index [token required]
    Show (args: username) [token required]
    Create (args: first name, last name, password)
    Delete (args: username)

# Orders
    Index
    Show (args: user id)
    Delete order product (args: order product id) [token required]
    Create order with product quantity and product id (args: quantity, order id, product id) [token required]

# --Database Schema

Product
id -- serial
name -- varchar
price -- number
category--varchar
id -- serial
firstName -- varchar
lastName -- varchar
password -- varchar

Orders-Product
id -- serial
product_id of each product in the order 
order_id -- base on type id in table order
quantity of each product in the order

Orders
-id -- serial 
-user_id -- id of user type base on type id in table user
    
