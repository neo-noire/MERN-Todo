import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth } from '../redux/fetures/auth/authSlice'
import { createTodo, getTodos } from '../redux/fetures/todos/todosSlice'
import { toast } from 'react-toastify'
import { TodoCard } from './TodoCard'

export const MainPage = () => {
    const error = useSelector(store => store.todos.error)

    useEffect(() => {
        error && toast(error)
    }, [error])
    const isAuth = useSelector(checkIsAuth)

    const [todoTitle, setTodoTitle] = useState('')
    const { todos } = useSelector(state => state.todos.todos)
    
    const orderedTodos = todos?.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    const dispatch = useDispatch();

    const makeTodosReq = () => {
        return dispatch(getTodos())
    }

    const handleSubmit = async () => {
        try {
            const data = new FormData();

            data.append('title', todoTitle)

            setTodoTitle('')
            dispatch(createTodo(Object.fromEntries(data)))
                .then(() => makeTodosReq())


            toast(`To Do List:  "${todoTitle}" has been started...`)
        } catch (error) {
            toast(error)
        }
    }



    useEffect(() => {
        makeTodosReq()
    }, [])


    return (
        <>
            {isAuth &&
                <form className=' mx-auto '
                    onSubmit={e => e.preventDefault()}>
                    <h2 className='flex justify-center items-center text-lg text-white'>
                        Write your Todo title:
                    </h2>
                    <div className='mt-2 text-xl text-white opacity-90 flex items-center justify-center '>
                        <input type='text' value={todoTitle} onChange={e => setTodoTitle(e.target.value)}
                            className=' px-2 py-1 bg-transparent rounded-lg border-2 
                        border-indigo-500/75 focus:outline-none active:border-indigo-500 
                         focus:border-indigo-800' />
                        <button
                            onClick={handleSubmit}
                            className='text-sm text-indigo-800 p-2 bg-indigo-200 outline-none border-2 rounded-lg border-indigo-300'>Add Todo</button>
                    </div>


                </form>
            }
            <div className='mx-auto flex justify-evenly mt-10 gap-3 flex-wrap'>

                {isAuth && orderedTodos ? orderedTodos.map((el) => <TodoCard key={el._id} state={el} />) : undefined}
            </div>

        </>
    )
}
