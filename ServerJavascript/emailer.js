"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),nodemailer=require("nodemailer"),path=require("path"),acc={user:"info@technicalprb.com",host:"uk3.fcomet.com",pass:"For(Life!=0)",port:25,secure:!0},Emailer=function(){function Emailer(){_classCallCheck(this,Emailer);var email=require("emailjs");this.server=email.server.connect({user:acc.user,password:acc.pass,host:acc.host,port:acc.port,_secure:acc.secure})}return _createClass(Emailer,[{key:"emailjs",value:function(mailOptions){var message={text:mailOptions.text,from:mailOptions.from,to:mailOptions.to,subject:mailOptions.subject};this.server.send(message,function(err,message){var out=err||message;return console.log("emailjs ",out),err?{error:out}:{info:out}})}},{key:"send",value:function(emailContainer,callback){nodemailer.createTestAccount(function(err,account){var transporter=nodemailer.createTransport({host:acc.host,port:465,secure:acc.secure,requireTLS:!0,auth:{user:acc.user,pass:acc.pass},tls:{rejectUnauthorized:!1}}),mailOptions={from:'"'+emailContainer.name+'. 👻" <'+emailContainer.email+">",to:acc.user,subject:emailContainer.subject+" ✔ Page Form",text:""+emailContainer.message,html:"<b>"+emailContainer.message+"</b>"};transporter.sendMail(mailOptions,function(error,info){console.log("Message sent: %s",info&&info.messageId?info.messageId:error),error||callback(info&&info.messageId?info:{error:"error mail failure"})})})}},{key:"contactPromise",value:function(email,callback){this.send(email,function(res){var respond=res;if(respond&&respond.messageId)callback({info:respond.messageId});else{var rejected=new Error("Message could not sent ");console.log(rejected),callback({error:rejected})}console.log("contactPromise: ",respond)})}}]),Emailer}();module.exports=new Emailer;