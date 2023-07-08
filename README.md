# Setup and connect to the database
npm install : to install all dependencies 
db-migrate up : to set up the database postgres

# Start PostgreSQL
$ psql -U postgres

# Create database dev env
$ CREATE DATABASE shopping;

# List out all databases
$ \dt

# Connect to database
$ \c shopping

# Port number
PORT=3000

# Database on port 5432

# default env
ENV = dev

# Environment variable
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=shopping
POSTGRES_TEST_DB=shopping_test
POSTGRES_USER=shopping_user
POSTGRES_PASSWORD=password123
ENV=dev
TOKEN_SECRET=danguyen123
BCRYPT_PASSWORD=nguyenxuanda12345
SALT_ROUNDS=10