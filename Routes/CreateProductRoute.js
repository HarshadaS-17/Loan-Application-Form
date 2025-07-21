import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../Controller/CreateProductController.js";

const router = express.Router();

// Product Routes
router.post('/add-product', createProduct);
router.get('/get-product', getAllProducts);
router.get('/:id', getProductById);
router.put('/update-product/:id', updateProduct);
router.delete('/delete-product/:id', deleteProduct);

export default router;




// --------------------------------------------------------------------------


// import express from 'express';
// import { createProduct, getBankProducts } from '../controllers/productController.js';

// const router = express.Router();

// router.post('/:bankId/products', createProduct);
// router.get('/:bankId/products', getBankProducts);

// export default router;