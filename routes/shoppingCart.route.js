const express = require('express'); 
const router = express.Router(); 
const shoppingCartController = require("../controllers/shoppingCart.controller"); 

router.get('/', shoppingCartController.get); 
router.post('/',shoppingCartController.create);
router.put('/:id', shoppingCartController.modify); 
router.delete('/:id', shoppingCartController.delete); 

module.exports= router; 