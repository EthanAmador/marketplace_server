const express = require('express'); 
const router = express.Router(); 

const productController = require('../controllers/product.controller'); 

router.get('/test', productController.test); 
router.post('/',productController.create); 
router.get('/:id', productController.getById); 
router.put('/:id',productController.put); 
router.delete('/:id',productController.delete);
//router.get('/:pageindex/:pagezise/:name?/:cartegoryId?', productController.get); 
router.get('/', productController.get); 
module.exports = router;
