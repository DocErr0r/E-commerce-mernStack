import express from 'express'
import dotenv from "dotenv";
import connectTODB from './config/db.js';
import userRouter from './routes/authuser.js';
import cookieParser from 'cookie-parser';
dotenv.config({ path: '../.env' });
const port = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(cookieParser())

connectTODB()

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use('/api/auth', userRouter)

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})