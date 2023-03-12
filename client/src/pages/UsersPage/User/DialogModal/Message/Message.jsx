import React, { useEffect, useState } from 'react'
import s from './Message.module.scss'

export const Message = ({ el, isMe, user }) => {
   

    const setTime = (timestamp) => {
        let hours = new Date(timestamp).getHours()
        let minutes = new Date(timestamp).getMinutes()

        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        return `${hours}:${minutes}`
    }
    return (
        <div className={isMe ? `${s.isMe} ${s.message}` : s.message}>
            <img src={'https://w7.pngwing.com/pngs/529/832/png-transparent-computer-icons-avatar-user-profile-avatar.png'} />
            <div className={s.text}>
                <h6>{isMe ? "Me" : user.username}</h6>
                <span>{el.messageBody}</span>
                <div className={s.msgTime}>{setTime(el.createdAt)}</div>
            </div>
        </div>
    )
}
