// const path = require('path');
const express = require('express')
const colors = require('colors')
const cors = require('cors')
const {errorHandler} = require('./middleware/todoMiddleware')
const connectDB = require('./config/db')

const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000


connectDB()
const app = express();

const corsOptions = {
    origin: '*', // Allow any origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
  
app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.use('/api/todos',require('./routes/todosRoutes'))
app.use('/api/users',require('./routes/userRoutes'))

app.use(errorHandler)
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`))