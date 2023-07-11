import { UserStore } from '../../../models/user';
import express from 'express';
import supertest from "supertest";

const app: express.Application = express();
const request = supertest(app)
const userStore = new UserStore()

const product = {
    name: "apple",
    price: 10,
    category: "fruit"
  };

describe("Product handlers", () => {
  it("Show product name", async () => {
    const tokenRequest: any = userStore.getTokenByUser({
      username: "shopping_test",
      password: "password123",
      firstname: "",
      lastname: ""
    })
    request
      .get('/products/')
      .set('Authorization', `bearer ${tokenRequest.token}`)
      .send({productName: product.name})
      .expect(200)
  })

  it("INDEX method product", async () => {
    request
      .get('/products')
      .expect(200)
  })

  it("Create product ", async () => {
    const tokenRequest: any = userStore.getTokenByUser({
        username: "shopping_test",
        password: "password123",
        firstname: "",
        lastname: ""
      })
    request
    .post("/products")
    .set('Authorization', `bearer ${tokenRequest.token}`)
    .send(product)
    .expect(200)
})

  it("DELETE method product ", async () => {
    const tokenRequest: any = userStore.getTokenByUser({
        username: "shopping_test",
        password: "password123",
        firstname: "",
        lastname: ""
      })
    request
    .delete("/products")
    .set('Authorization', `bearer ${tokenRequest.token}`)
    .send({productName: product.name})
    .expect(200)
})

})