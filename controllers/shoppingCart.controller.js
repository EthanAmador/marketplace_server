const ShoppingCart = require("../models/shoppingCart.model");
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

exports.create = function (req, res) {
  let _shopping = new ShoppingCart({
    productId: req.body.productId,
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    productPrice: req.body.productPrice,
    productImage: req.body.productImage,
    productCategory: {
      id: req.body.categoryId,
      name: req.body.categoryName
    },
    quantity: req.body.quantity
  });

  _shopping.save(function (err) {
    if (err) res.send(err);

    res.send("product added successfully");
  });
};

exports.modify = function (req, res) {
  let _shopping = new ShoppingCart({
    productId: req.body.productId,
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    productPrice: req.body.productPrice,
    productCategory: {
      id: req.body.categoryId,
      name: req.body.categoryName
    },
    quantity: req.quantity
  });
  _shopping.findByIdAndUpdate(req.params.id, { $set: _shopping }, function (
    err,
    shopping
  ) {
    if (err) return next(err);

    res.send("product modified successfully");
  });
};

exports.delete = function (req, res) {
  ShoppingCart.findByIdAndDelete(req.params.id, function (err) {
    if (err) return next(err);

    res.send("product successfully removed");
  });
};

exports.get = async function (req, res) {
  let _result = undefined;
  _query = {};

  //get Url
  let parsedUrl = url.parse(req.url);
  //get value QueruString 
  let parsedQs = querystring.parse(parsedUrl.query);

  let _pageindex =
    parsedQs.pageindex === undefined
      ? 1
      : Number.parseInt(parsedQs.pageindex);
  let _pagesize =
    parsedQs.pagezise === undefined
      ? 10
      : Number.parseInt(parsedQs.pagezise);

  if (parsedQs.name && parsedQs.categoryId)
    _query = { productName: { $regex: ".*" + parsedQs.name + ".*" }, "productCategory.id": parsedQs.categoryId };
  else if (parsedQs.name) {
    _query = { productName: { $regex: ".*" + parsedQs.name + ".*" } };
  } else if (parsedQs.categoryId) {
    _query = { "productCategory.id": parsedQs.categoryId};
  }

  let _optionsQuery = {
    page: _pageindex,
    limit: _pagesize,
    customLabels: myCustomLabels,
    select:
      "_id productId productName productDescription productPrice productCategory quantity total productImage",
    sort: { createDate: -1 }
  };

  _result = await ShoppingCart.paginate(_query, _optionsQuery, function (
    err,
    shoppingCarts
  ) {
    if (err) return err;
    return shoppingCarts;
  });

  return res.send(_result);
};
