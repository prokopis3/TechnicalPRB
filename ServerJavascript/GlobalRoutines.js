"use strict";function generateUUID(version){switch(version){case"timestamp":return require("uuid/v1")();case"random":return require("uuid/v5")();default:var uuidv5=require("uuid/v5");return uuidv5("mail.technicalprb.com",uuidv5.URL),uuidv5.URL}}function getUserSession(req,machineId){var source=req.header("user-agent"),us=useragent.parse(source||{});return{agent:{isMobile:us?us.isMobile:"",isBot:us?us.isBot:"",browser:us?us.browser:"",version:us?us.version:"",os:us?us.os:"",platform:us?us.platform:"",source:source||""},referrer:req.header("referrer")||"",ip:req.header("x-forwarded-for")||req.connection.remoteAddress,device:{OsUUID:machineId,type:req.device.type.toUpperCase()}}}var useragent=require("express-useragent");module.exports.getUserSession=getUserSession,module.exports.generateUUID=generateUUID;