const express = require('express');
const router = express.Router();
const Product = require('../model/product.model'); // Adjust the path as needed


//const express = require('express');
const bodyParser = require('body-parser'); 
//const app = express(); 
//router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Define the routes
router.get('/products', (req, res) => {
  Product.find()
    .then(products => res.status(200).json(products))
    .catch(err => res.status(400).json({ error: err }));
});

router.get('/products/:id', (req, res) => {
  Product.findById(req.params.id)
    .then(product => res.status(200).json(product))
    .catch(err => res.status(400).json({ error: err }));
});

router.post('/products', (req, res) => {
  const newProduct = new Product(req.body);
  newProduct.save()
    .then(savedProduct => res.status(200).json(savedProduct))
    .catch(err => res.status(400).json({ error: err }));
});

router.put('/products/:id', (req, res) => {
    console.log(req.body);
    Product.findById(req.params.id)
      .then(product => {        
        // Update fields
        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;
        product.published = req.body.published;
        product.category = req.body.category;
  
        product.save()
          .then(updatedProduct => res.status(200).json(updatedProduct))
          .catch(err => res.status(400).json({ error: err }));
      })
      .catch(err => res.status(400).json({ error: err }));
  });
  
// GET products by name using query parameter
router.get('/products', (req, res) => {
  const name = req.query.name;
  if (name) {
    Product.find({ name: { $regex: name, $options: 'i' } })
      .then(products => res.status(200).json(products))
      .catch(err => res.status(400).json({ error: err }));
  } else {
    res.status(400).json({ error: 'Please provide a name parameter for the search.' });
  }
});

// DELETE a product by ID
router.delete('/products/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id)
      .then(() => res.status(204).end()) // Use 204 for no content
      .catch(err => res.status(400).json({ error: err }));
  });
  
// DELETE all products
router.delete('/products', (req, res) => {
Product.deleteMany({})
    .then(() => res.status(204).end()) // Use 204 for no content
    .catch(err => res.status(400).json({ error: err }));
});

module.exports = router;
