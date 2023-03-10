import React, { useState } from 'react'
import { AiOutlineCheckSquare } from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { editTaskText } from '../../../redux/fetures/todos/todosSlice';

export default function Edit({ state, setEdit }) {
    const dispatch = useDispatch();
    const [text, setText] = useState(state.text);
    const [close, setClose] = useState(false)

    const submitChanges = () => {
        const timer = () => setTimeout(() => {
            setEdit(false)
        }, 1000);

        if (text !== state.text) {
            const data = new FormData();
            data.append('taskId', state._id)
            data.append('todoId', state.todoId)
            data.append('text', text)
            dispatch(editTaskText(Object.fromEntries(data)))
                .then((res) => toast(res.payload.message))
        }

        setClose(true)
        timer()

        clearTimeout(timer)
    }

    return (
        <label className='relative max-w-[15rem] flex gap-1 items-center px-1 py-2  text-indigo-800 bg-indigo-200 border-[1px] rounded-md border-indigo-300'>
            <input type='checkbox' readOnly={true} checked={state.completed} className='flex-10' />
            <textarea value={text} onChange={e => setText(e.currentTarget.value)} className=' p-1 rounded-lg' />
            <div className='flex gap-1 flex-9'>
                <button
                    onClick={submitChanges}
                    className='text-sm text-indigo-800 p-1 bg-transparent
     outline-none border-[1px] rounded-sm border-indigo-300'><AiOutlineCheckSquare className={`${close && 'animate-ping text-green-500 scale-150'}`} /></button>
            </div>
        </label>
    )
}
