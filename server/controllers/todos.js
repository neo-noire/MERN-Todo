import Task from "../models/Task.js";
import Todo from "../models/Todo.js";
import User from "../models/User.js";

//Create Todo List
export const createTodo = async (req, res) => {
    try {
        const { title } = req.body

        const user = await User.findById(req.userId)

        const newTodo = new Todo({
            userId: user._id,
            title,
        })

        await newTodo.save()
        await User.findByIdAndUpdate(req.userId,
            {
                $push: { todos: newTodo }
            })

        return res.json({
            title,
            newTodo,
            message: 'post added'
        })
    } catch (error) {

        res.json({ message: `${req.body}` })
    }
}

//Get Todo List
export const getTodo = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        const todos = await Todo.find({ userId: { $in: req.userId } })

        if (!user) {
            return res.json({ message: 'cant find this user' })
        }

        res.json({
            todos
        })
    } catch (error) {
        res.json({ message: `${error}` })
    }
}

//Delete Todo List
export const deleteTodo = async (req, res) => {
    try {

        const { todoId } = req.body;

        await Todo.deleteOne({ _id: todoId })
        const todos = await Todo.find({ userId: { $in: req.userId } })
        await User.updateOne(
            { _id: req.userId },
            {
                $pull:
                {
                    todos: { _id: todoId }
                }
            }
        )

        res.json({ todos, message: 'You delete Task successfully' })
    } catch (error) {
        res.json({ message: `${error}` })
    }
}