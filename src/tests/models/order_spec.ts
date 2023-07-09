import { User, UserStore } from "../../models/user"

import { OrderStore } from "../../models/order"
import { ProductStore } from "../../models/product"
import bcrypt from "bcrypt"
import dotenv from "dotenv"

dotenv.config()
const { SALT_ROUNDS, BCRYPT_PASSWORD } = process.env

const userStore = new UserStore()
const productStore = new ProductStore();
const orderStore = new OrderStore();

const userInit = {
  firstname: "Da",
  lastname: "Nguyen",
  email: "daguyen@gmail.com"
}

const productInit = {
  name: "apple",
  price: 2,
  category: "fruit"
}

const userInitPassword = "password123"

describe("Order", () => {

  it("should have a INDEX method", () => {
    expect(orderStore.index).toBeDefined()
  })


  it("should have a DELETE method", () => {
    expect(orderStore.delete).toBeDefined()
  })

  it("INDEX method order", async () => {
    // const [{ user_id, status}] = await orderStore.index()
    const result = await orderStore.index()

    expect(result).toEqual([])
  })

  it("DELETE method order ", async () => {
    orderStore.delete(1);
    const result = await orderStore.index()
    // @ts-ignore
    expect(result).toEqual([])
  })
})

