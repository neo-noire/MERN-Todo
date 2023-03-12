import React, { useEffect, useState } from 'react'
import s from './DialogModal.module.scss'
import { useFetch } from '../../../../hooks/useFetch'
import { RiSendPlane2Line } from 'react-icons/ri'
import { Message } from './Message/Message'
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux'
import { socketUrl } from '../../../../utils/constant'

export const DialogModal = ({ setDialogClose, users }) => {
    const [socket, setSocket] = useState(null)
    const [text, setText] = useState('')
    const [dialog, setDialog] = useState([])
    const [dialogId, setDialogId] = useState(null)
    const [isTyping, setIsTyping] = useState(false)
    const [typingTimeout, setTypingTimeout] = useState(null)
    const token = useSelector(state => state?.auth?.token)


    const { data, loading } = useFetch('/dialog/get', { recieverId: users.userId })
    useEffect(() => {
        if (data?.dialog) {
            setDialog(data?.dialog?.messages.reverse())
            // console.log(data?.dialog?.messages.reverse().reduce((acc, curr) =>
            //  ,[]))
            setDialogId(data?.dialog?._id)
        }
    }, [data])

    useEffect(() => {
        dialogId && socket.emit('join', { chat: dialogId })
    }, [dialogId])

    useEffect(() => {
        setSocket(io(socketUrl))
    }, [])

    useEffect(() => {
        if (!socket) return
        socket.on('from-server-message', (data) => {
            console.log(data)
            setDialog(data?.messages.reverse())
        })
        socket.on('user-typing-from-server', () => {
            setIsTyping(true)
        })
        socket.on('stop-typing-from-server', () => {
            setIsTyping(false)
        })

    }, [socket])





    const sendMessage = async () => {
        const isEmpty = (str) => {
            return !str.trim().length;
        }
        if (isEmpty(text)) return;
        socket.emit('send-message', {
            text: text.trim(),
            token: token,
            dialogId
        })
        setText('')
    }

    const handleTyping = (e) => {
        setText(e.target.value)

        socket.emit('user-start-typing', dialogId)
        if (typingTimeout) clearTimeout(typingTimeout)

        setTypingTimeout(setTimeout(() => {
            socket.emit('user-stop-typing', dialogId)
        }, 1500))
    }


    return (
        <div onClick={() => setDialogClose(false)} className={s.container}>

            <div onClick={(e) => e.stopPropagation()} className={s.body}>

                <div className={s.top}>
                    <h3 className="text-xl font-semibold text-gray-900">
                        {`Dialog with ${users.username}:`}
                        {isTyping && <div>Typing...</div>}
                    </h3>
                    <button onClick={() => setDialogClose(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                {
                    loading
                        ? <div className='h-[100%] flex-1'>Loading...</div>
                        : <>
                            <div className={s.center}>
                                <div className={s.scrollbar}>
                                    {
                                        dialog && dialog
                                            .map((el, idx) => 
                                                <Message key={el._id} el={el} user={users} isMe={users.userId !== el.sender} />
                                            )
                                    }
                                </div>
                            </div>

                            <div className={s.bottom}>
                                <textarea value={text} onChange={handleTyping} placeholder='Write a message' />
                                <button onClick={sendMessage}><RiSendPlane2Line className={s.icon} /></button>
                            </div>
                        </>
                }

            </div>

        </div>
    )
}
