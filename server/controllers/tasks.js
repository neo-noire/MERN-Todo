import Task from "../models/Task.js";
import Todo from "../models/Todo.js";
import User from "../models/User.js";

//Add Tasks
export const addTask = async (req, res) => {
    try {
        const { task, taskId } = req.body
        const todo = await Todo.findById(taskId)
        if (!todo) {
            return res.json({ message: 'cant find this todo' })
        }

        const newTask = {
            todoId: taskId,
            text: task,
        }

        await Todo.findByIdAndUpdate(taskId,
            {
                $push: { "tasks": newTask }
            })

        const updatedTodos = await Todo.findById(taskId)
        res.json({
            updatedTodos
        })
    } catch (error) {
        res.json({ message: `${error}` })
    }
}

//Delete Tasks
export const deleteTasks = async (req, res) => {
    try {
        const { taskId, todoId } = req.body;
        await Task.findByIdAndDelete(taskId)
        await Todo.updateOne(
            { _id: todoId },
            {
                $pull:
                {
                    tasks: { _id: taskId }
                }
            }
        )

        const updatedTodo = await Todo.find({ userId: { $in: req.userId } })

        res.json({ updatedTodo, message: 'You delete Task successfully' })
    } catch (error) {
        res.json({ message: `${error}` })
    }
}

//Update Task Status
export const updateTaskStatus = async (req, res) => {
    try {
        const { todoId, taskId, status } = req.body

        const task = await Todo.findById(taskId)
        const todo = await Todo.findById(todoId)

        if (!todo && !task) {
            return res.json({ message: 'cant find this task or todo' })
        }

        await Todo.updateOne(
            {
                _id: todoId, "tasks._id": taskId
            },
            {
                $set: { "tasks.$.completed": status }
            }
        )


        const updatedTasks = await Todo.findById(todoId)
        res.json({
            updatedTasks,
            message: `task status updated`
        })
    } catch (error) {
        res.json({ message: `${error}` })
    }
}

//Edit Task Text
export const editTaskText = async (req, res) => {
    try {
        const { todoId, taskId, text } = req.body

        const task = await Todo.findById(taskId)
        const todo = await Todo.findById(todoId)

        if (!todo && !task) {
            return res.json({ message: 'cant find this task or todo' })
        }

        await Todo.updateOne(
            {
                _id: todoId, "tasks._id": taskId
            },
            {
                $set: { "tasks.$.text": text }
            }
        )


        const updatedTasks = await Todo.findById(todoId)
        res.json({
            updatedTasks,
            message: `task edited`
        })
    } catch (error) {
        res.json({ message: `${error}` })
    }
}