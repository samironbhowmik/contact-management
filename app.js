const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./connectDB/connectDB")
const route = require("./route/route")

const app = express()
dotenv.config()
app.use(express.json())
app.use(express.urlencoded())
app.use("/", route)

app.listen(process.env.PORT, async()=>{
    await connectDB()
    console.log(`Server is connected at port ${process.env.PORT}`);
})