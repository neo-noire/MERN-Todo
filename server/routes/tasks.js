import Router from "express";
import { addTask, updateTaskStatus, editTaskText, deleteTasks } from '../controllers/tasks.js'
import { checkAuth } from "../utils/check.js";


const router = new Router();


//Add Task
////http://localhost:3001/api/tasks
router.post('/', checkAuth, addTask)

//Update Task Status
////http://localhost:3001/api/tasks/update
router.post('/update', checkAuth, updateTaskStatus)

//Edit Task Text
////http://localhost:3001/api/tasks/edit
router.post('/edit', checkAuth, editTaskText)

//Delete Task
////http://localhost:3001/api/tasks/delete
router.put('/delete', checkAuth, deleteTasks)


export default router;