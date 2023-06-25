import express, { Request, Response } from 'express'

import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import orderRoutes from './handlers/order'
import userRoutes from './handlers/user'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"



dotenv.config()
app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

orderRoutes(app)
userRoutes(app)

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
