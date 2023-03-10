import mongoose, { Schema } from 'mongoose'

const TaskSchema = new Schema({
    todoId: { type: String },
    text: { type: String },
    completed: { type: Boolean, default: false },
}, { timestamps: true })


export default mongoose.model('Task', TaskSchema)