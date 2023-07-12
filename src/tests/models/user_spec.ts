import { User, UserStore } from "../../models/user"

import bcrypt from "bcrypt"
import dotenv from "dotenv"
import express from 'express';
import supertest from "supertest";

const app: express.Application = express();
const request = supertest(app)

// import bcrypt from "bcrypt"


dotenv.config()
const { SALT_ROUNDS, BCRYPT_PASSWORD } = process.env

const store = new UserStore()

const userInit = {
  firstname: "Da",
  lastname: "Nguyen"
}

const userInitPassword = "password123"

describe("User", () => {
  it("INDEX method", () => {
    expect(store.index).toBeDefined()
  })

  it("SHOW method", () => {
    expect(store.show).toBeDefined()
  })

  it("CREATE method", () => {
    expect(store.create).toBeDefined()
  })

  it("DELETE method", () => {
    expect(store.delete).toBeDefined()
  })

  it("INDEX method users", async () => {
    const userList = await store.index()
    expect(userList.length).toBeGreaterThanOrEqual(0)
  })

  it("CREATE method user", async () => {
    const tokenRequest: any = store.getTokenByUser({
      username: "shopping_test",
      password: "password123",
      firstname: "",
      lastname: ""
    })
    request
      .post('/users')
      .set('Authorization', `bearer ${tokenRequest.token}`)
      .send({
        id: '2',
        firstName: 'da2',
        lastName: 'nguyen',
        password: 'password1234',
      })
      .expect(200)
    })


    it("SHOW method user", async () => {
      store.create({firstname: 'dane', lastname: 'nguyen', password: 'aaaaaa'})
      const result = await store.show("dane")
  
      console.log("Result SHOW method user",result)
      expect(result.firstname).toEqual("dane")
      // expect(result).not.toBeNaN()
    })
  
  
    it("DELETE method user ", async () => {
      await store.delete("2");
      const result = await store.show("2");
  
      // @ts-ignore
      expect(result).toBe(undefined)
    })
  })


  


