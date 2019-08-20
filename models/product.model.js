  const mongoose = require("mongoose");
  const mongoosePaginate = require("mongoose-paginate-v2");
  const Schema = mongoose.Schema;

let ProductSchema = new Schema({
  name: { type: String, required: true, max: 100, lowercase:true },
  description: { type: String, required: false, lowercase:true },
  price: { type: Number, required: true },
  createDate:{ type:Date, default:Date.now },
  categoryId: {type:String,required:true},
  categoryName: {type:String, required:true,max:100, lowercase:true},
  //images: [{ image: { trype: String }, main: { type: Boolean, require: true } }]
},{collection:'Products'});

ProductSchema.plugin(mongoosePaginate); 

module.exports = mongoose.model("Products", ProductSchema,);
