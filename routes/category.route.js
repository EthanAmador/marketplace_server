const express = require("express");
const router = express.Router();

const categoryControllers = require("../controllers/category.controller");

 router.post("/", categoryControllers.create);
 router.get("/", categoryControllers.get);

module.exports = router; 