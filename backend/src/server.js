require('module-alias/register');
require('dotenv').config('@root/.env');

const cors = require("cors");
const express = require('express');
const passport = require('passport');
const app = express();

require('@/auth/googleStrategy'); // Import Google Strategy

const { dbConnect } = require('./config/db');
dbConnect();

// middlewares 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// import middlewares
const authMiddleware = require('./middlewares/authMiddleware');
const protectRoute = require('./middlewares/protectRoute');

// routers
const authRouter = require('./routes/auth');
const teamRouter = require('./routes/team');
const memberRouter = require('./routes/member');
const taskRouter = require('./routes/task');

app.get('/', (req, res) => {
    res.end('homepage');
});

app.use('/api/auth/', authRouter);

app.use('/api/team/', authMiddleware, protectRoute(['admin']), teamRouter);

app.use('/api/member/', authMiddleware, protectRoute(['admin']), memberRouter);

app.use('/api/task/', authMiddleware, taskRouter);
    
// Unknown route
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Page not found'
    });
});

const port = process.env.PORT || 1000;
app.listen(port, () => console.log(`server started port on ${port}`));