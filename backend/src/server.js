require('module-alias/register');
require('dotenv').config('@root/.env');

const express = require('express');
const app = express();

const { dbConnect } = require('./config/db');
dbConnect();

app.get('/', (req, res) => {
    res.end('homepage');
});

const port = process.env.PORT || 1000;
app.listen(port, () => console.log(`server started port on ${port}`));