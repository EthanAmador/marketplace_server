// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url ="mongodb+srv://eamador:ethan921013@cluster0-nhien.mongodb.net/MarketPlace?retryWrites=true&w=majority";
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB,{useNewUrlParser:true,useFindAndModify:false});
mongoose.Promise = global.Promise;

let db = mongoose.connection;
//db.on('error', console.error.bind(console, 'MongoDB connection error:'));
module.exports = db;