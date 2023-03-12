import mongoose, { model, Schema } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    isOnline: { type: Boolean, default: false },
    todos: [{
        type: new mongoose.Schema({
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
    }],
    followers: [{
        userId: { type: String },
        username: { type: String },
        isConfirmed: { type: Boolean, default: false },
    }],
    followRequestsFromUsers: [{
        userId: { type: String },
        username: { type: String },
    }],
    userFollowRequests: [{
        userId: { type: String },
        username: { type: String },
    }]
}, { timestamps: true })


export default model('User', UserSchema)