require('dotenv').config()
const express = require("express")
const app = express()
const router = require("./router.js")

app.listen(process.env.PORT, ()=>{
    console.log("Server running on port " + process.env.PORT)
})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use('/', router)