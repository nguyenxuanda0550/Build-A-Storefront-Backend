import { ProductStore } from "../../models/product"
import { UserStore } from "../../models/user";
import express from 'express';
import supertest from "supertest";

const app: express.Application = express();
const request = supertest(app)
const Store = new ProductStore();
const userStore = new UserStore()

describe("Product", () => {

  it("should have an INDEX method", () => {
    expect(Store.index).toBeDefined()
  })

  it("should have an SHOW method", () => {
    expect(Store.show).toBeDefined()
  })

  it("should have an CREATE method", () => {
    expect(Store.create).toBeDefined()
  })

  it("should have an DELETE method", () => {
    expect(Store.delete).toBeDefined()
  })

  it("CREATE method product", async () => {
    const tokenRequest: any = userStore.getTokenByUser({
      username: "shopping_test",
      password: "password123",
      firstname: "",
      lastname: ""
    })
    request
      .post('/products')
      .set('Authorization', `bearer ${tokenRequest.token}`)
      .send({
        name: 'SAM SUNG',
        price: 3000,
        category: 'old'
      })
      .expect(200)

    // const result = await Store.create({
    //   name: 'apple',
    //   price: 5,
    //   category: 'fruit'
    // })

    // console.log("result",result)

    //   expect(result).toEqual({ 
    //     name: 'apple',
    //     price: 5,
    //     category: 'fruit'
    //   })
  })

  it("INDEX method product", async () => {
    const result = await Store.index()

    expect(result.length).not.toBeNaN()
  })

  it("SHOW method product", async () => {
    Store.create({name: 'apple', price: 5,category: 'fruit'})
    const result = await Store.show("apple")

    expect(result.name).toEqual("apple")
})

  it("DELETE method product ", async () => {
    Store.delete('1');
    const result = await Store.show("ca")
    // @ts-ignore
    expect(result).toBe(undefined)
  })
})
