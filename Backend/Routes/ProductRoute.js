import express from 'express'
import { createProduct,getAllProducts,updateProduct,deleteProduct } from '../Controllers/product.js'

const router = express.Router()

//Create
router.post('/',createProduct);

//Get
router.get('/', getAllProducts);

//Update
router.put('/:id',updateProduct);

//Delete
router.delete('/:id',deleteProduct);

export default router;