const mongoose = require('mongoose');

function dbConnect() {    
    mongoose.connect(process.env.DBURL)
    .then(() => console.log('mongodb running...'))
    .catch((error) => console.log('database connection failed.'));
}

module.exports = {
    dbConnect
};