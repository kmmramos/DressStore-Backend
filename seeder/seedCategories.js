

function seedCategories() {
  //const { category } = require('./model/category.model'); // Adjust the path as needed
  //const category = require('./model/category.model.js'); //model\category.model.js
  const category = require('./model/category.model');

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

module.exports.seedCategories = seedCategories;