const express = require("express")
const mongoose = require("mongoose")

// import routes
const User_routes = require('./Routes/User.routes.js')


// import models
const User_model = require('./Models/User.model.js')
const Product_model = require('./Models/Products.model.js')

// middle ware
const app = express()
mongoose.connect("mongodb://localhost:27017/express").then((e) => {
    console.log("Database connected")
}).catch((err) => {
    console.log("Database connection failed",err)
})
app.use(express.json())

// api routes
app.use("/user", User_routes)


app.listen(3000, () => {
    console.log(`Server is running on port 3000  `)   
    console.log(`Url : ${`http://localhost:3000/`}`)   
})