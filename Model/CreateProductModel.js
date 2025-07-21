import mongoose from 'mongoose';

// Define the product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
export default Product;




// -------------------------------------------------------------------------


// import mongoose from 'mongoose';
// const productSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Product name is required'],
//     trim: true,
//     unique: true
//   },
//   description: {
//     type: String,
//     required: [true, 'Product description is required'],
//     trim: true
//   },
//   category: {
//     type: String,
//     required: [true, 'Product category is required'],
//     enum: ['Loan', 'Deposit', 'Investment', 'Card'],
//     default: 'Loan'
//   },
//   isActive: {
//     type: Boolean,
//     default: true
//   },
//   features: {
//     type: [String],
//     required: true
//   },
//   bank: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Bank',
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// // Update the updatedAt field before saving
// productSchema.pre('save', function(next) {
//   this.updatedAt = Date.now();
//   next();
// });

// const Product = mongoose.model('Product', productSchema);

// export default Product;
