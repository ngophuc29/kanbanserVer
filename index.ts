import express from 'express'
import dotenv from "dotenv"
import mongoose from 'mongoose'

import userRouter from "./src/routers/user"
dotenv.config()

const app = express()

const dbURL = `mongodb+srv://${process.env.DATABASENAME}:${process.env.DATABASEPASSWORD}@cluster0.p45nm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const connectDb = async () => {

    try {
        await mongoose.connect(dbURL)
        console.log("Connect to MongoDB server successfully")
    }
    catch (err) {
        console.log("Connect to MongoDB server Failed", err)

    }
}

connectDb().then(() => {
    app.listen(process.env.PORT || 8001, () => {


        console.log(`listening on ${process.env.PORT}`)
    })
}).catch((err) => {
    console.log("Connect to MongoDB server Failed", err)

})
