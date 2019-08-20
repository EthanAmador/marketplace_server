const Product = require("../models/product.model");

//customLabels from pagination
const myCustomLabels = {
  docs: "data",
  totalDocs: "itemCount",
  page: "pageIndex",
  limit: "pageZise",
  totalPages: "pageCount"
};

exports.test = function(req, res) {
  res.send("Greetings from the Test controller!");
};

exports.create = function(req, res) {
  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    categoryId:req.body.categoryId,
    categoryName:req.body.categoryName
  });
  product.save(function(err) {
    if (err) return next(err);

    res.send("Product Created succesfully");
  });
};

exports.get = function(req, res) {
  Product.findById(req.params.id, function(err, product) {
    if (err) return next(err);
    res.send(product);
  });
};

exports.put = function(req, res) {
  Product.findByIdAndUpdate(req.params.id, { $set: req.body }, function(
    err,
    product
  ) {
    if (err) return next(err);

    res.send("Product udpated.");
  });
};

exports.delete = function(req, res) {
  Product.findByIdAndDelete(req.params.id, function(err) {
    if (err) return next(err);

    res.send("Deleted successfully!");
  });
};

exports.get = async function(req, res) {
  let _result = undefined;
  let _query = {};
  let _pageindex =
    req.params.pageindex === undefined
      ? 1
      : Number.parseInt(req.params.pageindex);
  let _pagesize =
    req.params.pagezise === undefined
      ? 10
      : Number.parseInt(req.params.pagezise);

  if (req.params.name)
    _query = { name: { $regex: ".*" + req.params.name + ".*" } };

  let _optionsQuery = {
    page: _pageindex,
    limit: _pagesize,
    customLabels: myCustomLabels,
    select: "_id name description price categoryId categoryName",
    sort: { createDate: -1 }
  };

  _result = await Product.paginate(_query, _optionsQuery, function(
    err,
    productos
  ) {
    if (err) return err;
    return productos;
  });

  return res.send(_result);
};
