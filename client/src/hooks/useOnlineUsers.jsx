import  { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { socketUrl } from '../utils/constant';

export const useOnlineUsers = () => {
    const [onlineUsers, setOnlineUsers] = useState([])
    const socket = useRef()
    const token = useSelector(state => state?.auth?.token)
    // Connect to Socket.io



    useEffect(() => {
        socket.current = io(socketUrl);
        socket.current.emit("new-user-add", token);
        socket.current.on("get-users", (users) => {
            setOnlineUsers(users);
        });
    }, [token]);

    useEffect(() => {
        // Tab has focus
        const handleFocus = async () => {
            socket.current.emit("new-user-add", token);
            socket.current.on("get-users", (users) => {
                setOnlineUsers(users);
            });
        };

        // // Tab closed
        const handleBlur = () => {
            if (token) {
                socket.current.emit("offline")
            }
        };

        // Track if the user changes the tab to determine when they are online
        window.addEventListener('focus', handleFocus);
        window.addEventListener('blur', handleBlur);

        return () => {
            window.removeEventListener('focus', handleFocus);
            window.removeEventListener('blur', handleBlur);
        };
    }, [token]);

    return onlineUsers
}
