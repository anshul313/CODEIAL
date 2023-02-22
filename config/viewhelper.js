const env = require('./environment');
const fs = require('fs');
const path = require('path');
const { json } = require('express');
module.exports =(app)=>{
    app.locals.assestPath = function(filePath){
         if(env.name=='development'){
            return filePath;
         }
         return '/'+json.parse(fs.readFileSync(path.join(__dirname,'../public/assets/rev-manifest.json')))[filePath]
    }
}