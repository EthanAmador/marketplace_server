const Product = require("../models/product.model");
const responseError = require("../viewmodels/responseError");
const url = require('url');
const querystring = require('querystring');

//customLabels from pagination
const myCustomLabels = {
  docs: "data",
  totalDocs: "itemCount",
  page: "pageIndex",
  limit: "pageZise",
  totalPages: "pageCount"
};

exports.test = function (req, res) {
  res.send("Greetings from the Test controller!");
};

exports.create = function (req, res) {
  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    categoryId: req.body.categoryId,
    categoryName: req.body.categoryName,
    image: req.body.image
  });
  product.save(function (err) {
    if (err)
      return res.status(500).send(responseError(err));

    res.status(200).send("Product Created succesfully");
  });
};

exports.getById = async function (req, res) {
  /*Product.findById(req.params.id, function(err, product) {
    if (err) return next(err);
    res.send({data:product});
  });*/
  let _result = undefined;
  let _query = { _id: req.params.id };

  let _optionsQuery = {
    customLabels: myCustomLabels,
    select: "_id name description price categoryId categoryName image",
    sort: { createDate: -1 }
  };

  _result = await Product.paginate(_query, _optionsQuery, function (
    err,
    productos
  ) {
    if (err) return err;
    return productos;
  });

  return res.send(_result);
};

exports.put = function (req, res) {
  Product.findByIdAndUpdate(req.params.id, { $set: req.body }, function (
    err,
    product
  ) {
    if (err) return next(err);

    res.send("Product udpated.");
  });
};

exports.delete = function (req, res) {
  Product.findByIdAndDelete(req.params.id, function (err) {
    if (err) return next(err);

    res.send("Deleted successfully!");
  });
};

exports.get = async function (req, res) {
  //get Url
  let parsedUrl = url.parse(req.url);
  //get value QueruString 
  let parsedQs = querystring.parse(parsedUrl.query);

  let _result = undefined;
  let _query = {};
  let _pageindex =
    parsedQs.pageIndex == undefined
      ? 1
      : Number.parseInt(parsedQs.pageIndex);
  let _pagesize =
      parsedQs.pageSize == undefined
      ? 10
      : Number.parseInt(parsedQs.pageSize);

  if (parsedQs.name && parsedQs.categoryId)
    _query = { name: { $regex: ".*" + parsedQs.name + ".*" }, categoryId: parsedQs.categoryId };
  else if(parsedQs.name){
    _query = { name: { $regex: ".*" + parsedQs.name + ".*" } };
  }else if(parsedQs.categoryId){
    _query = { categoryId: parsedQs.categoryId };
  }

  let _optionsQuery = {
    page: _pageindex,
    limit: _pagesize,
    customLabels: myCustomLabels,
    select: "_id name description price categoryId categoryName image",
    sort: { createDate: -1 }
  };

  _result = await Product.paginate(_query, _optionsQuery, function (
    err,
    productos
  ) {
    if (err) return err;
    return productos;
  });

  return res.send(_result);
};
