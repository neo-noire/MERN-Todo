//mongodb+srv://mykola_matus:<password>@cluster0.wqtibjq.mongodb.net/?retryWrites=true&w=majority

import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

import authRoute from './routes/auth.js';
import todoRoute from './routes/todo.js';
import tasksRoute from './routes/tasks.js';
import usersRoute from './routes/usersList.js';
import dialogsRoute from './routes/dialogs.js';
import path from "path";
import { fileURLToPath } from "url";
import sockets from "./socket/sockets.js";

mongoose.set('strictQuery', false);

const app = express();
const httpServer = http.createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: ['http://localhost:3000']
    }
})

dotenv.config()

//Constants 
const PORT = process.env.PORT || 3009
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//Middleware
app.use(cors())
app.use(express.json())

//Routes 
app.use('/api/auth', authRoute)
app.use('/api/todo', todoRoute)
app.use('/api/tasks', tasksRoute)
app.use('/api/users', usersRoute)
app.use('/api/dialog', dialogsRoute)


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', sockets)

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.wqtibjq.mongodb.net/?retryWrites=true&w=majority`)
        httpServer.listen(PORT, () => console.log(`server running at port ${PORT}...`))
    } catch (err) {
        console.log(err.message);
    }
}

start()
