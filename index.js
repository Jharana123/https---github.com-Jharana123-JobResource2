const express=require('express');
const app=express();
const mongoose=require('mongoose');
let session = require("express-session");
let passport = require("passport");
let localStrategy = require("passport-local");
let path = require("path");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));


let methodOverride = require("method-override");
let User = require("./models/user_DB");
app.use(methodOverride("_method"));
let jobRoutes = require("./Routes/routes");

let notifRoutes = require('./Routes/notifications');
let authRoutes = require("./Routes/auth");

app.use(express.static(path.join(__dirname, "public")));
mongoose
  .connect(
    "mongodb+srv://admin2:admin2@cluster0.wfnxz4a.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(function () {
    console.log("db working");
  })
  .catch(function (err) {
    console.log(err);
  });

  app.use(
    session({
      secret: "SuperSecretPasswordForJharu",
      resave: false,
      saveUninitialized: true,
      cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24,
        maxAge: 1000 * 60 * 60 * 24,
      },
    })
  );
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(authRoutes);
app.use(jobRoutes);
app.use(notifRoutes);
app.listen(4000,()=>{
    console.log('Server is Running in port 4000');
})