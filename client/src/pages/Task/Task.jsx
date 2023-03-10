import React, { useEffect, useState } from 'react'
import { VscTrash } from 'react-icons/vsc'
import { RiEditBoxLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { deleteTasks, updateTaskStatus } from '../../redux/fetures/todos/todosSlice';
import Edit from './Edit/Edit';


export const Task = ({ state }) => {
    const [edit, setEdit] = useState(false)

    const dispatch = useDispatch();

    const deleteItem = () => {
        const data = new FormData();
        data.append('taskId', state._id)
        data.append('todoId', state.todoId)
        dispatch(deleteTasks(Object.fromEntries(data)))
        toast(`task is successfully deleted`)
    }

    const checkTask = () => {
        const data = new FormData();
        data.append('taskId', state._id)
        data.append('todoId', state.todoId)
        data.append('status', !state.completed)
        dispatch(updateTaskStatus(Object.fromEntries(data)))
    }



    if (edit) {
        return <Edit state={state} setEdit={setEdit} />
    }


    return (
        <label className={`max-w-[15rem] flex items-center px-1 border-[1px] rounded-md
        ${state.completed
                ? 'text-indigo-900 bg-indigo-300 border-indigo-500'
                : 'text-indigo-800 bg-indigo-100 border-indigo-300'}   `}>
            <input type='checkbox' checked={state.completed} onChange={checkTask} className='flex-10' />
            <span className='flex-1 p-1' style={{ maxWidth: '84%', wordWrap: 'break-word' }}>{state.text}</span>
            <div className='flex gap-1 flex-8'>
                <button
                    onClick={() => setEdit(true)}
                    className='text-sm text-indigo-800 p-1 bg-transparent
             outline-none border-[1px] rounded-sm border-indigo-300'><RiEditBoxLine /></button>
                <button
                    onClick={deleteItem}
                    className='text-sm text-indigo-800 p-1 bg-transparent
             outline-none border-[1px] rounded-sm border-indigo-300'><VscTrash /></button>
            </div>
        </label>
    )
}
