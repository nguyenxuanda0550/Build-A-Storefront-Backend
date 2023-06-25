import { Order, OrderStore, Order_Products } from '../models/order'
import express, { Request, Response } from 'express'

import verifyAuthToken from './verifyAuth'

const store = new OrderStore()

const index = async (req: Request, res: Response) => {
    const orders = await store.index()
    res.json(orders)
}

const showOrder = async (req: Request, res: Response) => {
    const orders = await store.show(req.body.UserId)
    res.json(orders)
}

const createOrder = async (req: Request, res: Response) => {
    const order: Order = {
        user_id: req.body.userId,
        status: req.body.status
    }
    const orders = await store.create(order)
    res.json(orders)
}

const deleteOrder = async (req: Request, res: Response) => {
    const orders = await store.delete(req.body.orderId)
    res.json(orders)
}

const createOrderProducts = async (req: Request, res: Response) => {
    const orderProducts: Order_Products = {
        product_id: (req.body.product_id),
        order_id: (req.body.order_id),
        quantity: (req.body.quantity)
    }
    const addProduct = await store.createOrderProduct(orderProducts)
    res.json(addProduct)
}

const deleteOrderProducts = async (req: Request, res: Response) => {
    const orders = await store.deleteOrderProduct(req.body.orderProductId)
    res.json(orders)
}

const orderRoutes = (app: express.Application) => {
    app.get('/orders', index)
    app.get('/orders/:userId', showOrder)
    app.post('/orders', verifyAuthToken, createOrder)
    app.delete('/orders',verifyAuthToken, deleteOrder)
    app.post('/orders/products', verifyAuthToken, createOrderProducts)
    app.delete('/orders/products',verifyAuthToken, deleteOrderProducts)
}

export default orderRoutes