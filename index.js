const express = require('express'); 
const bodyParser = require('body-parser'); 
const cors = require('cors');
const product = require('./routes/product.route'); 
const category = require("./routes/category.route"); 
const shoppingCart = require("./routes/shoppingCart.route"); 
const dataBase = require('./Repositories/acces.data'); 

const app = express(); 

// Set up mongoose connection
//const mongoose = require('mongoose');
//let dev_db_url ="mongodb+srv://eamador:ethan921013@cluster0-nhien.mongodb.net/test?retryWrites=true&w=majority";
//let mongoDB = process.env.MONGODB_URI || dev_db_url;
//mongoose.connect(mongoDB,{useNewUrlParser:true});
//mongoose.Promise = global.Promise;

//let db = mongoose.connection;
//db.on('error', console.error.bind(console, 'MongoDB connection error:'));
dataBase.on('error', console.error.bind(console, 'MongoDB connection error:')); 
//dataBase.close(); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors()); 
app.use('/products',product);
app.use('/category',category); 
app.use('/shopping', shoppingCart); 




let port = 8080;
app.listen(port, () => {console.log('Sever is up and running on port number '+ port)})