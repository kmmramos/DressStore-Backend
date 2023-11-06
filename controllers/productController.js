// const express = require('express');
// const router = express.Router();
// const Product = require('../model/product.model'); // Adjust the path as needed

// // Create a new product
// // router.post('/add', (req, res) => {
// //   const newProduct = new Product(req.body);
// //   newProduct.save()
// //     .then(savedProduct => res.status(200).json(savedProduct))
// //     .catch(err => res.status(400).json({ error: err.message }));
// // });
// // Create a new product
// const createProduct = async (req, res) => {
//     console.log(req.body);
//     try {
//         const newProduct = new Product(req.body);
//         console.log(req.body);
//         //console.log(newProduct);
//         const savedProduct = await newProduct.save();
//         res.json(savedProduct);
//         //console.log(savedProduct.name);
//         //res.json({ message: 'Product created successfully'});
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// // // Retrieve all products
// // router.get('/', (req, res) => {
// //   Product.find()
// //     .then(products => res.status(200).json(products))
// //     .catch(err => res.status(400).json({ error: err.message }));
// // });

// // // Retrieve a product by ID
// // router.get('/:id', (req, res) => {
// //   Product.findById(req.params.id)
// //     .then(product => res.status(200).json(product))
// //     .catch(err => res.status(400).json({ error: err.message }));
// // });

// // // Update a product by ID
// // router.post('/update/:id', (req, res) => {
// //   Product.findById(req.params.id)
// //     .then(product => {
// //       product.name = req.body.name;
// //       product.description = req.body.description;
// //       product.price = req.body.price;
// //       product.published = req.body.published;
// //       product.category = req.body.category;

// //       product.save()
// //         .then(updatedProduct => res.status(200).json(updatedProduct))
// //         .catch(err => res.status(400).json({ error: err.message }));
// //     })
// //     .catch(err => res.status(400).json({ error: err.message }));
// // });

// // // Delete a product by ID
// // router.delete('/delete/:id', (req, res) => {
// //   Product.findByIdAndRemove(req.params.id)
// //     .then(() => res.status(200).json({ message: 'Product deleted successfully' }))
// //     .catch(err => res.status(400).json({ error: err.message }));
// // });

// // // Delete all products
// // router.delete('/deleteAll', (req, res) => {
// //   Product.deleteMany({})
// //     .then(() => res.status(200).json({ message: 'All products deleted successfully' }))
// //     .catch(err => res.status(400).json({ error: err.message }));
// // });

// // // Search products by name
// // router.get('/search', (req, res) => {
// //   const { name } = req.query;
// //   Product.find({ name: { $regex: name, $options: 'i' } })
// //     .then(products => res.status(200).json(products))
// //     .catch(err => res.status(400).json({ error: err.message }));
// // });



// module.exports = createProduct;


//const product = require('./model/product.model.js');
const product = require('../model/product.model'); // Adjust the path as needed
const category = require('../model/category.model'); // Adjust the path as needed


// // Create a new product
// const createProduct = async (req, res) => {
//     try {
//         const newProduct = new product(req.body);
//         console.log(newProduct);
//         const savedProduct = await newProduct.save();
//         res.json(savedProduct);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// Create a new product
const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        const categoryName = productData.category;

        // Check if the category exists
        const retrievedCategory = await category.findOne({ name: categoryName });
        if (!retrievedCategory) {
            return res.status(400).json({ error: `Category '${categoryName}' does not exist.` });
        }

        // Create the product with the existing category
        const newProduct = new product(productData);
        const savedProduct = await newProduct.save();

        res.json(savedProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Retrieve all products
const getAllProducts = async (req, res) => {
    try {
        const products = await product.find();
        res.json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Retrieve a product by ID
const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const retrievedProduct = await product.findById(id);
        res.json(retrievedProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a product by ID
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const productData = req.body;
    const newProduct = new product(productData);
    try {
        const updatedProduct = await product.findByIdAndUpdate(id, 
            {
                id: id,
                name: newProduct.name,
                description: newProduct.description,
                price: newProduct.price,
                category: newProduct.category,
                published: newProduct.published
            }, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await product.findByIdAndRemove(id);
        res.json({ message: 'product deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete all products
const deleteAllProducts = async (req, res) => {
    try {
        await product.deleteMany({});
        res.json({ message: 'All products deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Search products by name
const searchProductsByName = async (req, res) => {
    const { name } = req.query;
    try {
        const products = await product.find({ name: { $regex: name, $options: 'i' } });
        res.json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Export the createProduct function (if using CommonJS modules)
module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    deleteAllProducts,
    searchProductsByName
};
