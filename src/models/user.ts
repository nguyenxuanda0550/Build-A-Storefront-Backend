import Client from '../database'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from "jsonwebtoken";

dotenv.config();
const { TOKEN_SECRET } = process.env

export type User = {
    id?: any,
    firstname: string,
    lastname: string,
    username?: string,
    password: string,
};
  

export class UserStore {
    getTokenByUser = (user: User) => {
        return jwt.sign({ UserName: user.username, password: user.password }, TOKEN_SECRET as string);
      };

    async create(u: User): Promise<User> {
        try {
            const conn = await Client.connect()
            const sql = 'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3)'
            const result = await conn.query(sql, [u.firstname, u.lastname, u.password])
            const user = result.rows[0]
            conn.release()
            return user
        } catch (error) {
            throw new Error(`Unable create user. Error: ${error}`)
        }
    }

    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM users'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Cannot get users ${err}`)
        }
    }

    async show(username: string): Promise<User> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM users WHERE firstname=($1)'
            const result = await conn.query(sql, [username])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Count not find user ${username}. Error:${error}`)
        }
    }

    async delete(id: string): Promise<User> {
        try {
            const conn = await Client.connect()
            const sql = 'DELETE FROM users WHERE id=($1)'
            const result = await conn.query(sql, [id])
            const user = result.rows[0]
            conn.release()
            return user
        } catch (error) {
            throw new Error(`Could not delete user ${id}. Error: ${error}`)
        }
    }

    async authenticate(username: string, password: string): Promise<User | null> {
        const conn = await Client.connect()
        const sql = 'SELECT password FROM users WHERE username=($1)'
    
        const result = await conn.query(sql, [username])
    
        // console.log(password+pepper)
    
        if(result.rows.length) {
    
          const user = result.rows[0]
    
          console.log(user)
    
          if (bcrypt.compareSync(password+process.env.BCRYPT_PASSWORD, user.password)) {
            return user
          }
        }
    
        return null
      }
}