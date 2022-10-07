const express = require("express");
// const fileUpload = require("express-fileupload");
const app = express();
const dotenv = require("dotenv");
dotenv.config({path:'./config.env'});
const port = process.env.port || 9000;
const connection = require("./connection/connection");
const registration = require("./routers/auth");
const profile = require("./routers/profile");
const search = require("./routers/searchUser");
const letter = require("./routers/sendLetter");
const permissions = require("./routers/permissions");
const drafts = require("./routers/drafts");

/*
    inbuilt middleware of express
*/
// app.use(fileUpload,{useTempFiles : true});
app.use(express.json());
app.use(express.urlencoded({extended:false}))


app.use("/api/user/registration",registration);
app.use("/api/user/profile",profile);
app.use("/api/user/search",search);
app.use("/api/user/Letter/",letter);
app.use("/api/user/permissions",permissions);
app.use("/api/user/drafts",drafts);

//routers

app.listen(port, ()=>{console.log(`You are running on port : ${port}`)});
