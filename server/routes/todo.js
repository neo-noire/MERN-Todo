import Router from "express";
import { createTodo, getTodo, deleteTodo } from "../controllers/todos.js";
import { checkAuth } from "../utils/check.js";


const router = new Router();

//Create Todo
//http://localhost:3001/api/todo
router.post('/', checkAuth, createTodo)

//Get Todo
//http://localhost:3001/api/todo/get
router.get('/get', checkAuth, getTodo)

//Delete todo
////http://localhost:3001/api/todo/delete
router.put('/delete', checkAuth, deleteTodo)


export default router;