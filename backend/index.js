import express from 'express'
import dotenv from "dotenv";
import connectTODB from './config/db.js';
import userRouter from './routes/authuser.js';
import productRouter from './routes/productRoutes.js';
import cookieParser from 'cookie-parser';
import cors from "cors";

dotenv.config({ path: '../.env' });
// dotenv.config();
const port = process.env.PORT || 5000

connectTODB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use('/api/auth', userRouter)
app.use('/api/products', productRouter)

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})