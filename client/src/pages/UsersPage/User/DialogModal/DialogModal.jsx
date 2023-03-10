import React, { useEffect, useState } from 'react'
import s from './DialogModal.module.scss'
import axios from '../../../../utils/axios'
import { useFetch } from '../../../../hooks/useFetch'
import { RiSendPlane2Line } from 'react-icons/ri'
import { Message } from './Message/Message'
import { useInterval } from '../../../../hooks/useInterval'


export const DialogModal = ({ setDialogClose, users }) => {
    const [text, setText] = useState('')
    const [dialog, setDialog] = useState([])
     const { data, loading, error } = useFetch('/dialog/get', { recieverId: users.userId })
    //  const { data, loading, error } = useInterval('/dialog/get', { recieverId: users.userId }, 5000)
    
    useEffect(() => {
        if (data?.exist) {
            setDialog(data?.exist[0]?.messages.reverse())
        }
    }, [data])

    const sendMessage = async () => {
        const isEmpty = (str) => {
            return !str.trim().length;
        }

        if (isEmpty(text)) return;
        const msg = new FormData();
        msg.append('recieverId', users.userId)
        msg.append('text', text.trim())
        const { data } = await axios.post('/dialog/send', Object.fromEntries(msg))
        setDialog(data.dialog.messages.reverse())
        setText('')
    }

    return (
        <div onClick={() => setDialogClose(false)} className={s.container}>

            <div onClick={(e) => e.stopPropagation()} className={s.body}>

                <div className={s.top}>
                    <h3 className="text-xl font-semibold text-gray-900">
                        {`Dialog with ${users.username}:`}
                    </h3>
                    <button onClick={() => setDialogClose(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>

                <div className={s.center}>
                    <div className={s.scrollbar}>
                        {
                            dialog && dialog.map(el => <Message key={el._id} el={el} user={users} isMe={users.userId !== el.sender} />)
                        }
                    </div>
                </div>

                <div className={s.bottom}>
                    <textarea value={text} onChange={(e) => setText(e.currentTarget.value)} placeholder='Write a message' />
                    <button onClick={sendMessage}><RiSendPlane2Line className={s.icon} /></button>
                </div>

            </div>

        </div>
    )
}
