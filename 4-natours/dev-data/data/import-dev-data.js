const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection'));

//reade json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

//import data to the database
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded 😀');
  } catch (err) {
    console.error(err);
  }
  process.exit();
};

//delete all data from the database
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted 😀');
  } catch (err) {
    console.error(err);
  }
  process.exit();
};

// // node ./dev-data/data/import-dev-data.js --import
if (process.argv[2] === '--import') {
  importData();
  // node ./dev-data/data/import-dev-data.js --delete
} else if (process.argv[2] === '--delete') {
  deleteData();
}
//console.log(process.argv)
