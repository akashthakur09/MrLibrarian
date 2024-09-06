const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const uri = process.env.MONGO_URI;

const DBConnection = mongoose.connect(uri)
.then(()=>{
    console.log('Connected to MongoDB')
})
.catch((err)=>{
    console.log(`Error connecting to MongoDB ${err}`)
})

module.exports = DBConnection;

