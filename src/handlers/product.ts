import { Product, ProductStore } from './../models/product';
import express, { Request, Response } from 'express'

import verifyAuthToken from './verifyAuth'

const store = new ProductStore()

const index = async (req: Request, res: Response) => {
    try {
        const products = await store.index()
        res.status(200).json(products)   
    } catch (err) {
        res.status(400)
        res.json(err)
    }  
}

const showProduct = async (req: Request, res: Response) => {
    const products = await store.show(req.body.productName)
    res.json(products)
}

const createProduct = async (req: Request, res: Response) => {
    const product: Product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    }
    const products = await store.create(product)
    res.json(products)
}

const deleteProduct = async (req: Request, res: Response) => {
    const products = await store.delete(req.body.productId)
    res.json(products)
}

const productRoutes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:productName', showProduct)
    app.post('/products', verifyAuthToken, createProduct)
    app.delete('/products',verifyAuthToken, deleteProduct)
}

export default productRoutes