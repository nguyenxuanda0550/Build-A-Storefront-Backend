import { User, UserStore } from "../../models/user"

import bcrypt from "bcrypt"
import dotenv from "dotenv"

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
    })
    request
      .post('/users/sign-in')
      .set('Authorization', `bearer ${tokenRequest.token}`)
      .send({
        id: '2',
        firstName: 'da',
        lastName: 'nguyen',
        password: 'password1234',
      })
      .expect(200)
    })
    // const pepperedPassword = "password123"
    // const salt = parseInt(SALT_ROUNDS as string);
    // const hashPassword = await bcrypt.hashSync(pepperedPassword, salt) as string;
    // console.log("hashPassword", hashPassword)
    // const user: User = {
    //   ...userInit,
    //   password: `${hashPassword}`,
    // }
    // const newUser = await store.create(user);
    // console.info("userList", newUser)

    
    // expect({ email }).toEqual({
    //   email: userInit.email,
    // })
  })

  it("SHOW method user", async () => {
    const result = await store.show("1")

    expect(result).toEqual({
      id: 1,
      firstname: "Da",
      lastname: "Nguyen",
      password: "password1234"
    })
  })


  it("DELETE method user ", async () => {
    await store.delete("1");
    const result = await store.show("1");

    // @ts-ignore
    expect(result).toBe(undefined)
  })
})