import { User, UserStore } from "../../../models/user"

import { OrderStore } from "../../../models/order"
import { ProductStore } from "../../../models/product"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import express from 'express';
import supertest from "supertest";

const app: express.Application = express();
const request = supertest(app)

dotenv.config()
const { SALT_ROUNDS, BCRYPT_PASSWORD, TOKEN_SECRET} = process.env

const userStore = new UserStore()
const productStore = new ProductStore();
const orderStore = new OrderStore();


const userInstance = {
  firstname: "Stephen",
  lastname: "Lynn"
};

const userInstancePassword = "GuoUo1ayD";

const productInit = {
  name: "apple",
  price: 2,
  category: "fruit"
}

describe("Order handle test", () => {

  it("READ all orders", async () => {
    request
      .get('/orders')
      .expect(200)
  });

  it("should return success for CREATE order with product quantity and product id", async () => {
    const tokenRequest: any = userStore.getTokenByUser({
      username: "shopping_test",
      password: "password123",
      firstname: "",
      lastname: ""
    })
    request
      .post("/orders/products")
      .set('Authorization', `bearer ${tokenRequest.token}`)
      .send({ quantity: 5, orderId: 1, productId: 1 })
      .expect(200)
  })

  it("should return success for DELETE order product with order product id", async () => {
    const tokenRequest: any = userStore.getTokenByUser({
      username: "shopping_test",
      password: "password123",
      firstname: "",
      lastname: ""
    })
    request
      .delete("/orders/products")
      .set('Authorization', `bearer ${tokenRequest.token}`)
      .send({ orderProductId: "1" })
      .expect(200)
  })
})

