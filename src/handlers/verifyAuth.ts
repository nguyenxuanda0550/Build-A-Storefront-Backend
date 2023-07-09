import { Request, Response } from "express"

import { User } from "../models/user";
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config();
const { TOKEN_SECRET } = process.env

const verifyAuthToken = (req: Request, res: Response, next: any) => {
  try {
    const authorizationHeader = req.headers.authorization
    const token = authorizationHeader?.split(' ')[1]
    console.log(token)
    console.log(authorizationHeader)
    if ( !token ) {
      return res.status(401).send('Token invalid')
    }
    jwt.verify(token, TOKEN_SECRET as string)
    next()
  } catch (err) {
    res.status(400).send('Access denied, invalid token')
    return
  }
};

export default verifyAuthToken