import React, { useState } from 'react'
import s from './User.module.scss'
import axios from '../../../utils/axios'
import { toast } from 'react-toastify'
import { DialogModal } from './DialogModal/DialogModal'

export const UserCard = ({ followReq, users }) => {
    const [reqSent, setReqSent] = useState(followReq.filter(el => el._id === users.userId).length !== 0)
    const [dialog, setDialogClose] = useState(false)

    const followUser = async () => {
        const data = new FormData();
        data.append('userId', users.userId)
        await axios.post('/users/follow', Object.fromEntries(data))
            .then((res) => {
                setReqSent(true)
                toast(res.data.message)
            })
    }

    const unfollowUser = async () => {
        const data = new FormData();
        data.append('userId', users.userId)
        await axios.post('/users/unfollow', Object.fromEntries(data))
            .then((res) => {
                setReqSent(false)
                toast(res.data.message)
            })
    }

    
    return (
        <div className={s.container}>
            <div className={s.profile}>
                <div className={s.image}>
                    <div className={s.circle1}></div>
                    <div className={s.circle2}></div>
                    <img src={users.img ? users.img : `https://img.freepik.com/free-icon/avatar_318-158392.jpg`} width="70" height="70" alt="Jessica Potter" />
                </div>
                <div className={s.infobox}>
                    <div className={s.name}>{users?.username}</div>
                    <div className={s.job}>{users?.job}</div>
                </div>

                <div className={s.actions}>
                    {
                        reqSent
                            ? <button className={s.btn} onClick={unfollowUser} >Unfollow</button>
                            : <button className={s.btn} onClick={followUser} >Follow</button>
                    }

                    <button className={s.btn} onClick={() => setDialogClose(true)}>Message</button>
                </div>
            </div>
            {
                dialog && <DialogModal setDialogClose={setDialogClose} dialog={dialog} users={users} />
            }
        </div>
    )
}
