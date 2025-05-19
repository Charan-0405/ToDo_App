const express=require('express')
const { addTodo, getTodos } = require('../controllers/todoControllers')
const router=express.Router()
router.get('/get-todos',getTodos)
router.post('/add-todo',addTodo) 
module.exports=  router