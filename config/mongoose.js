const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/codeial_development');
// mongoose.connect('mongodb+srv://anshul:anshul@cluster0.keupg7r.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;