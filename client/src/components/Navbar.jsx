import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { checkIsAuth, logout } from '../redux/fetures/auth/authSlice';
import { io } from 'socket.io-client';
import { socketUrl } from '../utils/constant';


export const Navbar = () => {
    const [socket, setSocket] = useState(null)
    const isAuth = useSelector(checkIsAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state?.auth?.token)

    useEffect(() => {
        setSocket(io(socketUrl))
    }, [])

    const actiweStile = {
        color: 'white'
    }

    useEffect(() => {
        if (isAuth && token && socket) {
            socket.on('connect', token)
        }
    }, [socket])

    const handleLogout = () => {
        window.localStorage.removeItem('token')
        dispatch(logout())
        toast('You have logged out from system')
        navigate('/')
    }

    return (
        <div className='flex py-4 justify-between items-center'>
            <div>To Do List</div>
            {
                isAuth && (

                    <ul className='flex gap-8'>
                        <li><NavLink
                            to={'/'}
                            href='/'
                            className='text-x text-orange-600 hover:text-white'
                            style={({ isActive }) => isActive ? actiweStile : undefined}
                        >My Todos</NavLink></li>

                        <li><NavLink
                            to={'/users'}
                            href='#'
                            className='text-x text-orange-600 hover:text-white'
                            style={({ isActive }) => isActive ? actiweStile : undefined}
                        >Users</NavLink></li>
                        <li><NavLink
                            to={'/profile'}
                            href='#'
                            className='text-x text-orange-600 hover:text-white'
                            style={({ isActive }) => isActive ? actiweStile : undefined}
                        >Profile</NavLink></li>
                    </ul>)
            }
            {
                isAuth
                    ? <button
                        onClick={handleLogout}
                        className="bg-[#767ccd] hover:bg-blue-400 text-white  py-2 px-4 rounded"
                    >Log Out</button>
                    : <Link to={'/login'}
                        className="bg-[#767ccd] hover:bg-blue-400 text-white  py-2 px-4 rounded"
                    > Login</Link>
            }
        </div>
    )
}
