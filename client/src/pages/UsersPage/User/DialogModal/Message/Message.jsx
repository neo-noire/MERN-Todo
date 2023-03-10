import React from 'react'
import s from './Message.module.scss'

export const Message = ({ el, isMe, user }) => {

    return (
        <div className={isMe ? `${s.isMe} ${s.message}` : s.message}>
            <img src={'https://w7.pngwing.com/pngs/529/832/png-transparent-computer-icons-avatar-user-profile-avatar.png'} />
            <div className={s.text}>
                <h6>{isMe ? "Me" : user.username}</h6>
                <span>{el.messageBody}</span>
            </div>
        </div>
    )
}
