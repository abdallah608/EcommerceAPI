process.on("uncaughtException",(err,req,res,next)=>{
    console.log(err);
})

import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import morgan from 'morgan'
import { connection } from './dataBase/connection/connection.js'
import { init } from './src/server/server.js';

const app = express()
const port = process.env.port || 8000
app.use(express.static(process.env.static))
app.use(express.urlencoded({extended:true}))
app.use((req, res, next) =>{
    if(req.originalUrl == '/order/webhook'){
        next()
    }else{
        express.json({})(req,res,next)
    }
})
app.use(express.json())
app.use(morgan(process.env.MOOD))
connection()


init(app)
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))





    

