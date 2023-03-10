import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, loginUser } from '../redux/fetures/auth/authSlice'
import { toast } from 'react-toastify'

export const LoginPage = () => {
    const [emailOrPassword, setEmailOrPassword] = useState('')
    const [password, setPassword] = useState('')


    const { status } = useSelector(state => state.auth)
    const isAuth = useSelector(checkIsAuth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        status && toast(status)

        isAuth && navigate('/')

    }, [status, isAuth, navigate])

    const handleLogin = () => {
        try {
            if (password.length < 6) return toast('password length must be greater then 6');
            dispatch(loginUser({ emailOrPassword, password }))
            setEmailOrPassword('')
            setPassword('')
        } catch (error) {
            toast(error);
        }
    }
    return (

        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gradient-to-b from-cyan-500 to-pink-400">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email or Username</label>
                            <input type="text" value={emailOrPassword} onChange={e => setEmailOrPassword(e.currentTarget.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                                 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                                  dark:placeholder-gray-400 dark:text-gray-500
                                 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@company.com" required="" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" value={password} onChange={e => setPassword(e.currentTarget.value)} placeholder="Enter your password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                            focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                            dark:placeholder-gray-400 dark:text-gray-500
                            dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>
                        {/* <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input  id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label  for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                </div>
                            </div>
                        </div> */}
                        <button type="submit" onClick={handleLogin} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                        <p className="text-sm font-light text-white">
                            Don’t have an account yet? <Link to={'/register'} href={'/register'} className="font-medium text-white-600 hover:underline dark:text-blue-500">Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}
