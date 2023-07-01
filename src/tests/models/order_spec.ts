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
  email: "danguyen@gmail.com"
}

const productInit = {
  name: "apple",
  price: 2,
  category: "fruit"
}

const userInitPassword = "password123"

describe("Order", () => {

  beforeAll(async () => {
    const pepperedPassword = `${userInitPassword}${BCRYPT_PASSWORD}`;
    const salt = await bcrypt.genSalt(parseInt(SALT_ROUNDS as string));
    const hashPassword = bcrypt.hashSync(pepperedPassword, salt);

    const user: User = {
      ...userInit,
      password: hashPassword as string,
    };
    await userStore.create(user);

    await productStore.create(productInit);
  });

  it("INDEX method", () => {
    expect(orderStore.index).toBeDefined()
  })

  it("SHOW method", () => {
    expect(orderStore.show).toBeDefined()
  })

  it("CREATE method", () => {
    expect(orderStore.create).toBeDefined()
  })

  it("DELETE method", () => {
    expect(orderStore.delete).toBeDefined()
  })

  it("CREATE method order", async () => {
    const { user_id, status } = await orderStore.create({
      user_id: 1,
      status: true
    })

    expect({ user_id, status }).toEqual({
      user_id: 1,
      status: true
    })
  })

  it("INDEX method order", async () => {
    const [{ user_id, status}] = await orderStore.index()

    expect({ user_id, status }).toEqual({
      user_id: 1,
      status: true
    })
  })

  it("SHOW method user", async () => {
    const { user_id, status } = await orderStore.show("1")

    expect({ user_id, status }).toEqual({
      user_id: 1,
      status: true
  })


  it("DELETE method order ", async () => {
    const result = await orderStore.delete(1);

    // @ts-ignore
    expect(result).toBe(undefined)
  })
})

})