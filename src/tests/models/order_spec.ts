import { User, UserStore } from "../../models/user"

import { OrderStore } from "../../models/order"
import { ProductStore } from "../../models/product"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import express from 'express';
import supertest from "supertest";

const app: express.Application = express();
const request = supertest(app)

dotenv.config()
const { SALT_ROUNDS, BCRYPT_PASSWORD } = process.env

const userStore = new UserStore()
const productStore = new ProductStore();
const orderStore = new OrderStore();


const productInit = {
  name: "apple",
  price: 2,
  category: "fruit"
}

describe("Order", () => {

  it("should have a INDEX method", () => {
    expect(orderStore.index).toBeDefined()
  })

  it("INDEX method order", async () => {
    const result = await orderStore.index()
    expect(result).toEqual([])
  })

  it("CREATE Order Product method ", async () => {
    const tokenRequest: any = userStore.getTokenByUser({
      username: "shopping_test",
      password: "password123",
      firstname: "",
      lastname: ""
    })
    request
      .post('/orders/products')
      .set('Authorization', `bearer ${tokenRequest.token}`)
      .send({
        product_id: 1,
        order_id: 1,
        quantity: 4,
      })
      .expect(200)
    })

  it("DELETE order product method", async () => {
    const result = await orderStore.deleteOrderProduct("3");
    // @ts-ignore
    expect(result).toEqual(undefined)
  });
})

