// imports
const express = require('express');
const app = express();
const port = 8080;
//const productController = require('./controllers/productController');

//const express = require('express');
const bodyParser = require('body-parser'); 
//const app = express(); 
app.use(bodyParser.urlencoded({ extended: true })); 
//app.post('/post-test', (req, res) => {     console.log('Got body:', req.body);     res.sendStatus(200); }); 
//app.listen(8080, () => console.log(`Started server at http://localhost:8080!`));

// listen on port
app.listen(port, () => {
  console.info(`listening on port ${port}`);
})

// setup models
const category = require('./model/category.model');
const product = require('./model/product.model');

// run seeder scripts
//const { seedCategories } = require('./seeder/seedCategories'); // Adjust the path as needed
//seedCategories(); // You can call this function when needed in your app

// setup mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://kmmramos:NYwYMQuj6d9L0TcX@cluster0.rsugnbh.mongodb.net/?retryWrites=true&w=majority',
{useNewUrlParser:true});
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("DB connected......")
})


function seedCategories() {
    //const { category } = require('./model/category.model'); // Adjust the path as needed
    const category = require('./model/category.model.js'); //model\category.model.js

    const categoriesToInsert = [
    { name: 'Men' },
    { name: 'Women' },
    { name: 'Teens' },
    ];

    return new Promise(async (resolve, reject) => {
        try {
          const existingCategories = await category.find().exec();
          const existingCategoryNames = existingCategories.map((category) => category.name);
    
          const categoriesToInsertFiltered = categoriesToInsert.filter(
            (category) => !existingCategoryNames.includes(category.name)
          );
    
          if (categoriesToInsertFiltered.length === 0) {
            console.log('Categories already exist, no new categories added.');
            resolve('Categories already exist');
          } else {
            await category.insertMany(categoriesToInsertFiltered);
            console.log('Categories inserted successfully.');
            resolve('Categories inserted successfully');
          }
        } catch (err) {
          console.error('Error checking or inserting categories:', err);
          reject(err);
        }
      });
}

seedCategories()
  .then((result) => {
    // Handle success
    console.log(result);
  })
  .catch((error) => {
    // Handle error
    console.error(error);
  });

// Import the route
const productRoutes = require('./routes/productRoutes'); // Adjust the path as needed

// Use the route
app.use('/api', productRoutes);

// setup views
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('', (req, res) => {
    //res.sendFile(__dirname + '/views/index.html');
    res.render('index', {text: 'This is EJS!'});
});


