const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    published: Boolean,
    category: String
});
const product = mongoose.model('product', productSchema);

module.exports = product;