import React from 'react'
import { Navbar } from './Navbar'

export const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <div className='container mx-auto max-w-5xl px-3'>
                <Navbar />
                {children}
            </div>
        </React.Fragment>
    )
}
