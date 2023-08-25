const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.listen(port,function(){
    console.log("Chay code node js...");
})

//config session
const session = require("express-session");
app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: "abcdefghijklmnopqrstuvwxyz",
        cookie: {
            maxAge: 3600000, //miliseconds
            secure: false, 
        }
    })
);

require("./src/db/database");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const webrouter = require("./src/routes/web");
app.use("/", webrouter);
const userrouter = require("./src/routes/user");
app.use("/auth",userrouter);

const productrouter = require("./src/routes/product.router");
app.use("/auth",productrouter);

const categoryrouter = require("./src/routes/category.router");
app.use("/auth",categoryrouter);

const brandrouter = require("./src/routes/brand.router");
app.use("/auth",brandrouter);