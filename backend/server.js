// const path = require('path');
const express = require('express')
const colors = require('colors')
const cors = require('cors')
const {errorHandler} = require('./middleware/todoMiddleware')
const connectDB = require('./config/db')

const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000

// const dev = process.env.NODE_ENV !== 'production';
// const next = require('next');
// const nextjs = next({ dev });
// const handle = nextjs.getRequestHandler();




connectDB()
const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.use('/api/todos',require('./routes/todosRoutes'))
app.use('/api/users',require('./routes/userRoutes'))


// if (process.env.NODE_ENV === 'production') {
    // app.use(express.static(path.join(__dirname, '../frontend/build')));
    // app.use(express.static(path.join(__dirname, '../frontend/public')));
    // app.all('*', (req, res) => {
    //     return handle(req, res);
    // });
  
    // app.get('*', (req, res) =>
    //   res.sendFile(
    //     path.resolve(__dirname, '../', 'frontend', '.next', 'index.html')
    //   )
    // );
//   } else {
//     app.get('/', (req, res) => res.send('Please set to production'));
// }

app.use(errorHandler)
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`))