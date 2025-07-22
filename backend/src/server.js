require('module-alias/register');
require('dotenv').config('@root/.env');

const cors = require("cors");
const express = require('express');
const app = express();

const authRouter = require('./routes/auth');

const { dbConnect } = require('./config/db');
dbConnect();

// middlewares 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.end('homepage');
});

app.use('/api/auth/', authRouter);


// Unknown route
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Page not found'
    });
});

const port = process.env.PORT || 1000;
app.listen(port, () => console.log(`server started port on ${port}`));