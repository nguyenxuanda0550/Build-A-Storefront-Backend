import Client from '../database'
import bcrypt from 'bcrypt'

export type User = {
    firstname: string,
    lastname: string,
    email:string,
    password: string,
}

export class UserStore {
    async create(u: User): Promise<User> {
        try {
            const conn = await Client.connect()
            const sql = 'INSERT INTO users (firstname, lastname, email, password) VALUES($1, $2, $3, $4)'
            const hash = bcrypt.hashSync(
                u.password + process.env.BCRYPT_PASSWORD, 
                parseInt(process.env.SALT_ROUNDS as string)
             );
            const result = await conn.query(sql, [u.firstname, u.lastname, u.email, hash])
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

    async show(id: string): Promise<User> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM users WHERE id=($1)'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Count not find user ${id}. Error:${error}`)
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