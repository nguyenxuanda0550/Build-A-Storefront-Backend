import Client from '../database'

export type Order_Products = {
    id?: any;
    product_id: number;
    order_id: number;
    quantity: number;
}

export type Order = {
    id?: any;
    user_id: number,
}

export class OrderStore {
    
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

    async delete(id: number): Promise<Order> {
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