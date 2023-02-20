const fs = require('fs');
const rfs = require("rotating-file-stream");
const path = require('path');


const logDirectory = path.join(__dirname,'../productionLogs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("file.log", {
  interval:'1d',
  size: '10M',
  path: logDirectory
})

const development = {
  name:"development",
  assest_path:'./assets',
  session_cookie_key:'blahsomething',
  db:'codeial_development',
  smtp:{
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'alchemy.cn18',
        pass: 'codingninjas'
    }
},
google_clientID: "313233209747-dnqmail3j800a2jvsuckqhohodhs7i63.apps.googleusercontent.com",
google_clientSecret: "0FXb5EBWa4xRfJ8jR-1HKMd2",
google_callbackURL: "http://localhost:8000/users/auth/google/callback",
jwt_secretOrKey : 'codeial',
morgan:{
  mode:'dev',
  options:{sream:accessLogStream}
}
}

const production = {
    name:"production",
    assest_path:process.env.CODEIAL_ASSEST_PATH,
    session_cookie_key:'HurSSrIfLg0ziEY9XPCdw0G10N8IqlKo',
    db:'codeial_production',
    smtp:{
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
          user: 'alchemy.cn18',
          pass: 'codingninjas'
      }
  },
  google_clientID: "313233209747-dnqmail3j800a2jvsuckqhohodhs7i63.apps.googleusercontent.com",
  google_clientSecret: "0FXb5EBWa4xRfJ8jR-1HKMd2",
  google_callbackURL: "http://localhost:8000/users/auth/google/callback",
  jwt_secretOrKey : 'wc9WPgfDfK6CUZGYADzeXmwKNIWTbaFy',
  morgan:{
    mode:'combined',
    options:{sream:accessLogStream}
  }
}

module.exports = eval(process.env.CODEIAL_ENVIOURMENT)==undefined ? development : eval(process.env.CODEIAL_ENVIOURMENT)