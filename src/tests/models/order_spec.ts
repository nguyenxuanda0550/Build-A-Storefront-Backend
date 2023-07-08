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

  it("should have a SHOW method", () => {
    expect(orderStore.show).toBeDefined()
  })

  it("should have a CREATE method", () => {
    expect(orderStore.create).toBeDefined()
  })

  it("should have a DELETE method", () => {
    expect(orderStore.delete).toBeDefined()
  })

  it("CREATE method order", async () => {
    const result = await orderStore.create({
      user_id: 1,
      status: true
    })

    expect(result).toHaveBeenCalled()
  })

  it("INDEX method order", async () => {
    // const [{ user_id, status}] = await orderStore.index()
    const result = await orderStore.index()

    expect(result).toEqual([])
  })

  it("SHOW method user", async () => {
    const result = await orderStore.show("1")

    expect(result).toEqual({
      user_id: 1,
      status: true
  })


  it("DELETE method order ", async () => {
    orderStore.delete(1);
    const result = await orderStore.index()
    // @ts-ignore
    expect(result).toEqual([])
  })
})

})