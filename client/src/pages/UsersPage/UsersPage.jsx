
import React, { useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { UserCard } from './User/UserCard'

export const UsersPage = () => {
    const { data, loading, error } = useFetch('/users')


    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

  
    return (
        <>
            <div className='flex gap-2 mt-8'>
                {
                    data && data.users.map(el => <UserCard users={el} followReq={data.followRequests} />)
                }
            </div>
        </>
    )
}
