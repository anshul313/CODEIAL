const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');
const { Module } = require('module');


const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs('access.log', {
    interval: '1d',
    path: logDirectory
});



const development = {
    name: 'development',
    asset_path: process.env.CODEIAL_ASSEST_PATH,
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'alchemy.cn18',
            pass: 'codingninjas'
        }
    },
    google_client_id: "537996851020-v4jf7orsbdtavh94mk08cvhb8a5f0360.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}


const production =  {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSEST_PATH,
    session_cookie_key: 'blahsomething',
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'alchemy.cn18',
            pass: 'codingninjas'
        }
    },
    google_client_id: "537996851020-v4jf7orsbdtavh94mk08cvhb8a5f0360.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}



module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);
// module.exports = production;