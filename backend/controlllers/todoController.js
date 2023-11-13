const asyncHandler = require('express-async-handler');
const Todo = require('../models/todoModel')
const User = require('../models/userModel');
// @desc GET TODOS
//@route /api/todos
//@access private
const getTodos = asyncHandler(async (req,res) => {
    // console.log("yes",req.user.id)
    const todos = await Todo.find({user: req.user.id});
    res.status(200).json(todos)
})
// @desc post TODOS
//@route /api/todos
//@access private
const setTodo = asyncHandler(async (req,res) => {
    if(!req.body.text) {
        res.status(400);
        throw new Error("please add the text field")
    }
    const todo = await Todo.create({
        text: req.body.text,
        completed: req.body.completed,
        user: req.user.id,
    })
    res.status(200).json(todo)
})
// @desc put TODOS
//@route /api/todos/:id
//@access private
const updateTodo = asyncHandler(async (req,res) => {
    const todo = await Todo.findById(req.params.id)
    
    if(!todo) {
        res.status(400);
        throw new Error('Todo not found')
    } 
    const user = await User.findById(req.user.id)

    if(!user)  {
        res.status(401);
        throw new Error("User not found")
    }
    if(todo.user.toString() !== user.id) {
        res.status(401);
        throw new Error("User not authorized")
    }
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
    })
    res.status(200).json(updatedTodo)
})
// @desc delete TODOS
//@route /api/todos/:id
//@access private
const deleteTodo = asyncHandler(async (req,res) => {
    console.log(req.params)
    const todo = await Todo.findById(req.params.id)
    if(!todo) {
        res.status(400);
        throw new Error('Todo not found')
    } 
    const user = await User.findById(req.user.id)

    if(!user)  {
        res.status(401);
        throw new Error("User not found")
    }
    if(todo.user.toString() !== user.id) {
        res.status(401);
        throw new Error("User not authorized")
    }
    await Todo.deleteOne({ _id: req.params.id });

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getTodos,
    setTodo,
    updateTodo,
    deleteTodo,
}