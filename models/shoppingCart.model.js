const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

let shoppingCartSchema = new Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true, max: 100, lowercase: true },
  productDescription: { type: String, required: false, lowercase: true },
  productPrice: { type: Number, required: true },
  productCategory: {
    id: { type: String, require: true },
    name: { type: String, required: true, max: 100, lowercase: true }
  },
  productImage:{type:String},
  quantity:{type:Number, required:true},
  //self-calculated field
  total:{ type:Number, default: function(){ return (this.productPrice * this.quantity)}},
  createDate:{ type:Date, default:Date.now },

},{collection:"shoppingCart"});

shoppingCartSchema.plugin(mongoosePaginate); 
module.exports = mongoose.model("shoppingCart",shoppingCartSchema); 

