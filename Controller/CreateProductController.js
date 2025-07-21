import Product from '../Model/CreateProductModel.js';
import { ApiResponse } from '../Utils/ApiResponse.js';

const createProduct = async (req, res) => {
  try {
    const { name, features } = req.body;
    const newProduct = new Product({ name, features });
    await newProduct.save();
    res.status(201).json(new ApiResponse(200, { newProduct }, "Product created successfully"));
  } catch (err) {
    res.status(500).json({ message: 'Error creating product', error: err.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(new ApiResponse(200, products, "Products fetched successfully"));
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product', error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, features } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, features },
      { new: true }
    );
    res.status(200).json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
  } catch (err) {
    res.status(500).json({ message: 'Error updating product', error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product', error: err.message });
  }
};

export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};






// ----------------------------------------------------------------------------------

// import Product from '../models/Product.js';
// import Bank from '../models/Bank.js';

// // Create a new product
// export const createProduct = async (req, res) => {
//   const { bankId } = req.params;
//   const productData = { ...req.body, bank: bankId };

//   try {
//     const bank = await Bank.findById(bankId);
//     if (!bank) return res.status(404).json({ message: 'Bank not found' });

//     const newProduct = new Product(productData);
//     await newProduct.save();

//     // Add product to bank's products array
//     bank.products.push(newProduct._id);
//     await bank.save();

//     res.status(201).json(newProduct);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Get all products for a bank
// export const getBankProducts = async (req, res) => {
//   const { bankId } = req.params;

//   try {
//     const products = await Product.find({ bank: bankId });
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

// // Other CRUD operations can be added similarly