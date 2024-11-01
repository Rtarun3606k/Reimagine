const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// import routes
const User_routes = require("./Routes/User.routes.js");
const Login_Register_routes = require("./Routes/Login_Register.routes.js");
const Product_routes = require("./Routes/Products.routes.js");
const check_tokens_routes = require("./Routes/CheckTokens.routes.js");
const image_routess = require("./Routes/Image_upload.js");

// import models
const User_model = require("./Models/User.model.js");
const Product_model = require("./Models/Products.model.js");

// middle ware
const app = express();
mongoose
  .connect("mongodb://localhost:27017/express")
  .then((e) => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });
app.use(express.json());

app.use(cors());
// api routes
app.use("/user", User_routes);
app.use("/login_register", Login_Register_routes);
app.use("/products", Product_routes);
app.use("/check_tokens", check_tokens_routes);
app.use("/image", image_routess);

app.listen(3000, () => {
  console.log(`Server is running on port 3000  `);
  console.log(`Url : ${`http://localhost:3000/`}`);
});
