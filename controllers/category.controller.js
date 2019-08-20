const Category = require("../models/category.model");

//customLabels from pagination
const myCustomLabels = {
  docs: "data",
  totalDocs: "itemCount",
  page: "pageIndex",
  limit: "pageZise",
  totalPages: "pageCount"
};

exports.create = function(req, res) {
  let _category = new Category({
    name: req.body.name,
    description: req.body.description
  });

  _category.save(function(err) {
    if (err) return next(err);

    res.send("Category created succesfully");
  });
};


exports.get = async function(req, res) {
  let _result = {},
      _query = {};

  let _optionsQuery = {
    customLabels: myCustomLabels,
    select: "_id name",
    sort: { createDate: -1 }
  };

  _result = await Category.paginate(_query, _optionsQuery, function(
    err,
    categories
  ) {
    if (err) return err;
    return categories;
  });

  return res.send(_result);
 };