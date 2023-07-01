import { User, UserStore } from "../../models/user"

import bcrypt from "bcrypt"
import dotenv from "dotenv"

dotenv.config()
const { SALT_ROUNDS, BCRYPT_PASSWORD } = process.env

const store = new UserStore()

const userInit = {
  firstname: "Da",
  lastname: "Nguyen",
  email: "danguyen@gmail.com"
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
    const { firstname, lastname, email } = userList[0]

    expect([{ firstname, lastname, email }]).toEqual([userInit])
  })

  it("CREATE method user", async () => {
    const pepperedPassword = `${userInitPassword}${BCRYPT_PASSWORD}`
    const salt = await bcrypt.genSalt(parseInt(SALT_ROUNDS as string))
    const hashPassword = bcrypt.hashSync(pepperedPassword, salt)

    const user: User = {
      ...userInit,
      password: hashPassword as string,
    }
    const { email } = await store.create(user);
    expect({ email }).toEqual({
      email: userInit.email,
    })
  })

  it("SHOW method user", async () => {
    const { firstname, lastname, email } = await store.show(
      userInit.email
    )

    expect({ firstname, lastname, email }).toEqual(userInit)
  })


  it("DELETE method user ", async () => {
    await store.delete(userInit.email);
    const result = await store.show(userInit.email);

  // @ts-ignore
    expect(result).toBe(undefined)
  })
})