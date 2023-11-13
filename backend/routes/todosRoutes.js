const express = require('express')
const router = express.Router();
const {getTodos,setTodo,updateTodo,deleteTodo} = require('../controlllers/todoController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect,getTodos).post(protect,setTodo);
router.route('/:id').delete(protect,deleteTodo).put(protect,updateTodo);
// router.get('/', getTodos)

// router.post('/', setTodo)

// router.put('/:id', updateTodo)

// router.delete('/:id',deleteTodo)

module.exports = router