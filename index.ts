import express from 'express'
import dotenv from "dotenv"
dotenv.config()

const app = express()

const dbURL=`mongodb+srv://${process.env.DATABASENAME}:${process.env.DATABASEPASSWORD}@cluster0.p45nm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

app.listen(process.env.PORT || 8001 , (  ) => {

  
    console.log(`listening on ${process.env.PORT}`)
})