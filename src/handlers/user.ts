import { User, UserStore } from '../models/user'
import express, { Request, Response } from 'express'

import verifyAuthToken from './verifyAuth';

const store = new UserStore()

const index = async (req: Request, res: Response) => {
    const users = await store.index();
    res.json(users)
}

const showUser = async (req: Request, res: Response) => {
    const user = await store.show(req.body.UserId);
    res.json(user)
}

const createUser = async (req: Request, res: Response) => {
    const user: User = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
    }
    const users = await store.create(user);
    res.json(users)
}

const deleteUser = async (req: Request, res: Response) => {
    const users = await store.delete(req.body.userId);
    res.json(users)
}

const authenticate = async (req: Request, res: Response) => {
    try {
      const username = (req.body.username as string)
      const password = (req.body.password as string)
      if (!password || !username ) {
        res.status(400);
        res.send('Required input username or password');
        return false;
      }
      const user: User | null = await store.authenticate(username, password);
      if (!user) {
        return res.status(401).send(`Password incorrect for user ${username}.`);
      }
    } catch (err) {
      res.status(400).json(err);
    }
  }

  const userRoutes = (app: express.Application) => {
    app.get('/users', index)
    app.get('/users/:username', showUser)
    app.post('/users', verifyAuthToken, createUser)
    app.delete('/users',verifyAuthToken, deleteUser)
    app.post('/users/authenticate', authenticate);
}

export default userRoutes

