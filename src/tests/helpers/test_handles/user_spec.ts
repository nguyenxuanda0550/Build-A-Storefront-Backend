import { UserStore } from "../../../models/user";
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
  lastname: "Nguyen",
  password: "password123"
}

const userInitPassword = "password123"

describe("User", () => {
  
  it("Show All user: INDEX method users", async () => {
    const tokenRequest: any = store.getTokenByUser({
        username: "shopping_test",
        password: "password123",
        firstname: "",
        lastname: ""
      })
      request
        .get('/users')
        .set('Authorization', `bearer ${tokenRequest.token}`)
        .expect(200)
  })

  it("Show detail user: Show method users", async () => {
    const tokenRequest: any = store.getTokenByUser({
        username: "shopping_test",
        password: "password123",
        firstname: "",
        lastname: ""
      })
      request
        .get('/users')
        .set('Authorization', `bearer ${tokenRequest.token}`)
        .send(`username=${userInit.lastname}`)
        .expect(200)
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
        firstName: 'da2',
        lastName: 'nguyen',
        password: 'password1234',
      })
      .expect(200)
    })

  
    it("DELETE method user ", async () => {
        request
        .delete('/users')
        .send({username:userInit.lastname})
        expect(200)
  })

})


  


