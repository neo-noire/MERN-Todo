import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, registerUser } from '../redux/fetures/auth/authSlice'
import { toast } from 'react-toastify'

export const AuthPage = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { status } = useSelector((state) => state.auth)
    const isAuth = useSelector(checkIsAuth)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (status) {
            toast(status)
        }
        if (isAuth) {
            navigate('/')
        }
    }, [status, isAuth, navigate])

    const handleSubmit = () => {
        try {
            if (password.length < 6) return toast('password length must be greater then 6');
            dispatch(registerUser({ email, username, password }))
            setEmail('')
            setPassword('')

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gradient-to-b from-cyan-500 to-pink-400">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Register your account
                    </h1>
                    <form class="space-y-4 md:space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label htmlFor="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your User Name</label>
                            <input type="text" value={username} onChange={e => setUsername(e.currentTarget.value)}
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                                 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                                  dark:placeholder-gray-400 dark:text-gray-500
                                 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="username" required={true} />
                        </div>
                        <div>
                            <label htmlFor="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" value={email} onChange={e => setEmail(e.currentTarget.value)}
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                                 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                                  dark:placeholder-gray-400 dark:text-gray-500
                                 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@company.com" required={true} />
                        </div>
                        <div>
                            <label htmlFor="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" value={password} onChange={e => setPassword(e.currentTarget.value)}
                                placeholder="Enter your password"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                            focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                            dark:placeholder-gray-400 dark:text-gray-500
                            dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
                        </div>

                        <button type="submit" onClick={handleSubmit}
                            class="w-full text-white bg-primary-600 hover:bg-primary-700 
                        focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm 
                        px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 
                        dark:focus:ring-primary-800">Register</button>
                        <p class="text-sm font-light text-white">
                            Already have an account? <Link to={'/login'} href={'/login'} class="font-medium hover:underline dark:text-blue-600 ">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}
