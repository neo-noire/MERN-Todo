import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTasks, getTodos, deleteTodo } from '../redux/fetures/todos/todosSlice'
import { Task } from './Task/Task'

import { VscTrash } from 'react-icons/vsc'
import { toast } from 'react-toastify'

export const TodoCard = ({ state }) => {
    const list = [...state.tasks]


    const [taskInput, setTaskInput] = useState('')


    const dispatch = useDispatch()
    const taskHandler = () => {
        if (taskInput === '') return
        const data = new FormData()
        data.append('task', taskInput)
        data.append('taskId', state._id)
        dispatch(addTasks(Object.fromEntries(data)))
            .then(() => dispatch(getTodos()))
            .catch((err) => console.log(err))
        setTaskInput('')
    }

    const todoDeleteHandler = () => {
        const data = new FormData()
        data.append('todoId', state._id)
        dispatch(deleteTodo(Object.fromEntries(data)))
            .then(() => dispatch(getTodos()))
        toast('Todo List is successfully deleted')
    }

    return (
        <div className=" bg-slate-300 p-2 rounded-lg">
            <div className=" max-w-[15rem]">
                <h1 className='relative flex flex-col items-center justify-center'>{state.title}
                    <button onClick={todoDeleteHandler} className='absolute top-0 right-0'><VscTrash /></button>
                    <div className=' relative'>
                        <input type='text' value={taskInput} onChange={e => setTaskInput(e.target.value)}
                            placeholder='write your task'
                            className='max-w-[200px] px-2 pr-12 py-1 bg-transparent rounded-lg border-2 
                        border-indigo-500/75 focus:outline-none active:border-indigo-500 
                         focus:border-indigo-800' />
                        <button
                            onClick={taskHandler}
                            className=' absolute right-[2px] top-[2px] text-sm text-indigo-800 p-1 bg-transparent outline-none border-2 rounded-lg border-indigo-300'>Add</button>

                    </div>

                </h1>
                {
                    state.tasks &&
                    <div className='flex flex-col gap-2 mt-4'>
                        {
                            list
                                .sort((a, b) => a.completed - b.completed || new Date(b.updatedAt) - new Date(a.updatedAt) )
                                .map((el) => <Task key={el._id} state={el} />)
                        }
                    </div>
                }
            </div>
        </div>
    )
}
