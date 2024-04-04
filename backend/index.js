import express from 'express'
import dotenv from "dotenv";
import connectTODB from './config/db.js';
dotenv.config({path:'../.env'});
const port = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectTODB()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})