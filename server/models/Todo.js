import mongoose, { Schema } from 'mongoose'

const TodoSchema = new Schema({
    userId: { type: String },
    title: { type: String, required: true },
    tasks: [{
        type: new mongoose.Schema({
            todoId: { type: String },
            text: { type: String },
            completed: { type: Boolean, default: false },
        }, { timestamps: true })
    }],
    isDone: { type: Boolean, default: false }
}, { timestamps: true })


export default mongoose.model('Todo', TodoSchema)