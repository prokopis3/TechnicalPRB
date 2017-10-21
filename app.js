"use strict";var fss=require("fs"),express=require("express"),favicon=require("serve-favicon"),fpath=require("path"),httpsecurity=require("https"),socket_io=require("socket.io"),cookieParser=require("cookie-parser"),bodyParser=require("body-parser"),passport=require("passport"),sessionOptions={secret:"keyboard cat cat",resave:!0,saveUninitialized:!0,cookie:{secure:!0,httpOnly:!0}},PORT=3e3,passport=require("passport"),app=express(),index=require("./routes"),tasks=require("./routes/task"),env=process.env.NODE_ENV||"production";"production"==env&&(PORT=process.env.PORT||PORT),app.use(favicon(fpath.join(__dirname+"/public/dist/favicon.ico"))),app.use(express.static(fpath.join(__dirname+"/public/dist"))),app.set("views",express.static(fpath.join(__dirname+"/public/src/views"))),app.set("view engine","ejs"),app.engine("html",require("ejs").renderFile),app.use(express.static(fpath.join(__dirname+"/public/components"))),app.use(cookieParser()),app.use(bodyParser.json({limit:"2mb"})),app.use(bodyParser.urlencoded({limit:"2mb",extended:!1}));var cookieSession=require("cookie-session");app.use(cookieSession({keys:["keyboard cat cat1","keyboard cat cat2"],secret:"tobo!",cookie:{maxAge:36e5}})),app.use(passport.initialize()),app.use("/",index),app.use("/task",tasks),app.all("*",function(req,res,next){"https"!=(req.headers["x-forwarded-proto"]||"").toLowerCase()?(res.set("x-forwarded-proto","https"),res.redirect("https://"+req.get("host")+req.url)):res.sendFile(fpath.join(__dirname+"/public/dist/ind.html")),console.log("New User connected https://"+req.headers.host+req.url),console.log(new Date+" "+req.connection.remoteAddress+" "+req.method+" "+req.url+" "),console.log("Cookies: ",req.cookies),console.log("Signed Cookies: ",req.signedCookies),console.log("session Cookies: ",req.session)}),"development"===app.get("env")&&app.use(function(err,req,res,next){res.status(err.status||500),res.render("error",{message:err.message,error:err})}),app.use(function(err,req,res,next){res.status(err.status||500),res.render("error",{message:err.message,error:{}})}),module.exports=app;