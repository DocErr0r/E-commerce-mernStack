import express from 'express'
import dotenv from "dotenv";
import connectTODB from './config/db.js';
import userRouter from './routes/authuser.js';
import categoryRouter from "./routes/categoryRouts.js";
import productRouter from './routes/productRoutes.js';
import orderRouter from "./routes/orderRoutes.js";
import uploadRoute from './routes/uploadRoute.js';
import cookieParser from 'cookie-parser';
// import path from "path";
// import { fileURLToPath } from 'url';

// import cors from "cors";

dotenv.config({ path: '../.env' });
dotenv.config();
const port = process.env.PORT || 5000

connectTODB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use('/api/auth', userRouter)
app.use('/api/category', categoryRouter)
app.use('/api/products', productRouter)
app.use('/api/order', orderRouter)
app.use('/api/uploads', uploadRoute)
app.use('/api/config/paypal', (req,res)=>{
    res.status(200).send({ clientId: process.env.PAYPAL_CLIENT_ID})
})

// app.use(express.static(path.resolve(fileURLToPath(import.meta.url), 'public')));

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})