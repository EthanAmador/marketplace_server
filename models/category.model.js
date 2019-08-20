const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

let CategorySchema = new Schema({
    name:{type:String, required:true,max:100, lowercase:true},
    description:{type:String, required:false,lowercase:true}, 
    createDate:{ type:Date, default:Date.now }
},{collection:"Cateory"}); 

CategorySchema.plugin(mongoosePaginate); 
module.exports = mongoose.model("Category",CategorySchema); 

