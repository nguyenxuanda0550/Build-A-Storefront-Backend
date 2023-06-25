import Client from '../database'

// const client = require("./../database")

export type Order_Products = {
    product_id: number;
    order_id: number;
    quantity: number;
}

export type Order = {
    user_id: number,
    status: boolean
}

export class OrderStore {
    async create(o: Order): Promise<Order> {
        try {
            const conn = await Client.connect()
            const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2)'
            const result = await conn.query(sql, [o.user_id, o.status])
            const order = result.rows[0]
            conn.release()
            return order
        } catch (error) {
            throw new Error(`Could not add new order. Error: ${error}`)
        }
    }

    async index(): Promise<Order[]> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM orders'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Cannot get orders ${err}`)
        }
    }

    async show(id: string): Promise<Order> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM orders WHERE id=($1)'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Count not find order ${id}. Error:${error}`)
        }
    }

    async delete(id: string): Promise<Order> {
        try {
            const conn = await Client.connect()
            const sql = 'DELETE FROM orders WHERE id=($1)'
            const result = await conn.query(sql, [id])
            const order = result.rows[0]
            conn.release()
            return order
        } catch (error) {
            throw new Error(`Could not delete order ${id}. Error: ${error}`)
        }
    }

    async createOrderProduct(o: Order_Products): Promise<Order> {
        try {
          const sql =
            "INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3)";
          const conn = await Client.connect();
          const result = await conn.query(sql, [o.order_id, o.product_id, o.quantity]);
          const order = result.rows[0];
          conn.release();
          return order;
          
        } catch (err) {
          throw new Error(
            `Unable to add order ${o.order_id} to product ${o.product_id}: ${err}`
          );
        }
      }
    
      async deleteOrderProduct(orderProductId: string): Promise<Order> {
        try {
          const sql = "DELETE FROM order_products WHERE id=($1)";
          const conn = await Client.connect();
          const result = await conn.query(sql, [orderProductId]);
          const order = result.rows[0];
          conn.release();
          return order;

        } catch (err) {
          throw new Error(
            `Unable to delete order product ${orderProductId}. Error: ${err}`
          );
        }
      }
}