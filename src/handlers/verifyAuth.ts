import { Request, Response } from "express"

import { User } from "../models/user";
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config();
const { TOKEN_SECRET } = process.env

export const getTokenByUser = (user: User) => {
  return jwt.sign({ user }, TOKEN_SECRET as string);
};

const verifyAuthToken = (req: Request, res: Response, next: Function) => {
  try {
    const authorizationHeader = req.headers.authorization
    const token = authorizationHeader?.split(' ')[1]
    if ( !token ) {
      return res.status(401).send('Token invalid')
    }
    jwt.verify(token, TOKEN_SECRET as string);
    next();
  } catch (err) {
    res.status(400).send('Access denied, invalid token');
    return;
  }
};

export default verifyAuthToken;