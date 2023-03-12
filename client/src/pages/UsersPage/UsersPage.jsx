
import React from 'react'
import { useFetch } from '../../hooks/useFetch'
import { UserCard } from './User/UserCard'

export const UsersPage = () => {
    const { data, loading } = useFetch('/users')
    
    
    if (loading) {
        return (
            <div>Loading...</div>
        )
    }


    return (
        <>
            <div className='flex gap-x-3 gap-y-5 mt-8 justify-around flex-wrap'>
                {
                    data && data.users.map(el => <UserCard users={el} followReq={data.followRequests} />)
                }
            </div>
        </>
    )
}
