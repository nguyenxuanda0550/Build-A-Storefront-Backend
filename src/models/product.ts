const Client = require('../database')

export type Product = {
    id?: any,
    name: string,
    price: number,
    category: string
}

export class ProductStore {
    async create(p: Product): Promise<Product> {
        try {
            const conn = await Client.connect()
            const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3)'
            const result = await conn.query(sql, [p.name, p.price, p.category])
            const product = result.rows[0]
            conn.release()
            return product
        } catch (error) {
            throw new Error(`Could not add new product. Error: ${error}`)
        }
    }

    async index(): Promise<Product[]> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM products'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Cannot get products ${err}`)
        }
    }

    async show(id: string): Promise<Product> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM products WHERE id=($1)'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Count not find product ${id}. Error:${error}`)
        }
    }

    async delete(id: string): Promise<Product> {
        try {
            const conn = await Client.connect()
            const sql = 'DELETE FROM products WHERE id=($1)'
            const result = await conn.query(sql, [id])
            const product = result.rows[0]
            conn.release()
            return product
        } catch (error) {
            throw new Error(`Could not delete product ${id}. Error: ${error}`)
        }
    }
}