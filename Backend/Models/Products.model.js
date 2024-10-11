const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: Array,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  stock: {
    type: Number,
    required: true,
  },
  colors: {
    type: Array,
    required: true,
  },
  sizes: {
    type: Array,
    required: true,
  },
  reviews: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
// [
//     {
//         "name": "T-Shirt",
//         "price": 19.99,
//         "description": "A comfortable cotton t-shirt",
//         "image": "https://example.com/images/tshirt.jpg",
//         "stock": 100,
//         "colors": ["red", "blue", "green"],
//         "sizes": ["S", "M", "L", "XL"],
//         "reviews": [
//             {
//                 "user": "John Doe",
//                 "rating": 5,
//                 "comment": "Great quality!"
//             },
//             {
//                 "user": "Jane Smith",
//                 "rating": 4,
//                 "comment": "Very comfortable."
//             }
//         ]
//     },
//     {
//         "name": "Jeans",
//         "price": 49.99,
//         "description": "Stylish denim jeans",
//         "image": "https://example.com/images/jeans.jpg",
//         "stock": 50,
//         "colors": ["blue", "black"],
//         "sizes": ["32", "34", "36", "38"],
//         "reviews": [
//             {
//                 "user": "Alice Johnson",
//                 "rating": 4,
//                 "comment": "Fits perfectly."
//             },
//             {
//                 "user": "Bob Brown",
//                 "rating": 3,
//                 "comment": "A bit tight around the waist."
//             }
//         ]
//     }
// ]
