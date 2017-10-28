"use strict";var fss=require("fs"),express=require("express"),favicon=require("serve-favicon"),fpath=require("path"),httpsecurity=require("https"),socket_io=require("socket.io"),cookieSession=require("cookie-session"),cookieParser=require("cookie-parser"),bodyParser=require("body-parser"),GBRoutines=require("./ServerJavascript/GlobalRoutines"),passport=require("passport"),session=require("express-session"),sessionOptions={},PORT=3e3,passport=require("passport"),app=express(),index=require("./routes"),tasks=require("./routes/task"),env=process.env.NODE_ENV||"production";"production"==env&&(PORT=process.env.PORT||PORT),sessionOptions={secret:GBRoutines.generateUUID("timestamp"),resave:!0,saveUninitialized:!0,cookie:{secure:!0},cookieName:"__UD",duration:18e5,activeDuration:3e5,secure:!0,ephemeral:!0},app.use(favicon(fpath.join(__dirname+"/public/dist/favicon.ico"))),app.use(express.static(fpath.join(__dirname+"/public/dist"))),app.set("views",express.static(fpath.join(__dirname+"/public/src/views"))),app.set("view engine","ejs"),app.engine("html",require("ejs").renderFile),app.use(cookieParser()),app.use(bodyParser.json({limit:"2mb"})),app.use(bodyParser.urlencoded({limit:"2mb",extended:!1})),app.use(cookieSession({keys:["Pame sta aperathou aurio?","Nai kai olo to kalokairi@@@"],secret:"tobo!",cookie:{maxAge:36e5}})),app.use(session(sessionOptions)),app.use(passport.initialize()),app.use(passport.session()),app.use("/",index),app.use("/task",tasks),app.all("*",function(req,res,next){var schema=(req.headers["x-forwarded-proto"]||"none").toLowerCase();"localhost"!=req.hostname&&"https"!=schema?(res.set("x-forwarded-proto","https"),res.redirect("https://"+req.get("host")+req.url)):res.sendFile(fpath.join(__dirname+"/public/dist/ind.html")),console.log("----\x3e New User connected https://"+req.headers.host+req.url),console.log("DATE: "+new Date+" "+req.connection.remoteAddress+" "+req.method+" "+req.url+" "),console.log("Cookies: ",req.cookies),console.log("Signed Cookies: ",req.signedCookies),console.log("session Cookies: ",req.session)}),"development"===app.get("env")&&app.use(function(err,req,res,next){res.status(err.status||500),res.render("error",{message:err.message,error:err})}),app.use(function(err,req,res,next){res.status(err.status||500),res.render("error",{message:err.message,error:{}})}),module.exports=app;