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

// const corsOptions = {
//     origin: 'https://655248499c2d0f0008299d54--timely-starburst-30fda2.netlify.app/', // Allow any origin
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//     optionsSuccessStatus: 204,
// };
const options = {
    credentials: true,
    origin: ["hhttps://main--moonlit-bublanina-511e66.netlify.app"],
};
  
app.use(cors(options));
  
app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.use('/api/todos',require('./routes/todosRoutes'))
app.use('/api/users',require('./routes/userRoutes'))

app.use(errorHandler)
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`))