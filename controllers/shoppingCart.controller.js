const ShoppingCart = require("../models/shoppingCart.model");

//customLabels from pagination
const myCustomLabels = {
  docs: "data",
  totalDocs: "itemCount",
  page: "pageIndex",
  limit: "pageZise",
  totalPages: "pageCount"
};

exports.create = function(req, res) {
  let _shopping = new ShoppingCart({
    productId: req.body.productId,
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    productPrice: req.body.productPrice,
    productCategory: {
      id: req.body.categoryId,
      name: req.body.categoryName
    },
    quantity: req.body.quantity
  });

  _shopping.save(function(err) {
    if (err) res.send(err);

    res.send("product added successfully");
  });
};

exports.modify = function(req, res) {
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
  _shopping.findByIdAndUpdate(req.params.id, { $set: _shopping }, function(
    err,
    shopping
  ) {
    if (err) return next(err);

    res.send("product modified successfully");
  });
};

exports.delete = function(req, res) {
  ShoppingCart.findByIdAndDelete(req.params.id, function(err) {
    if (err) return next(err);

    res.send("product successfully removed");
  });
};

exports.get = async function(req, res) {
  let _result = undefined;
  _query = {};

  if (req.params.name)
    _query = { name: { $regex: ".*" + req.params.name + ".*" } };

  let _pageindex =
    req.params.pageindex === undefined
      ? 1
      : Number.parseInt(req.params.pageindex);
  let _pagesize =
    req.params.pagezise === undefined
      ? 10
      : Number.parseInt(req.params.pagezise);

  let _optionsQuery = {
    page: _pageindex,
    limit: _pagesize,
    customLabels: myCustomLabels,
    select:
      "_id productId productName productDescription productPrice productCategory quantity",
    sort: { createDate: -1 }
  };

  _result = await ShoppingCart.paginate(_query, _optionsQuery, function(
    err,
    shoppingCarts
  ) {
    if (err) return err;
    return shoppingCarts;
  });

  return res.send(_result);
};
