import React from 'react'
import { Login } from '../Components/Auth/Login'

export function LoginPage() {
    

    return (
        <>
            <div className='flex justify-center items-center min-h-screen'>
                <div className='px-6 py-10 bg-white shadow-lg rounded-lg border  border-gray-300 relative'>
                    <div className=' flex flex-col justify-center items-center'>
                   <img className='h-28' src="https://acc2.fe.supergitsa.com/images/supergit-01.png" alt="Super Git" />
                   <h1 className='capitalize text-2xl font-bold mt-6 mb-4'>login to your account</h1>
                   </div>
                   <Login/>
                </div>
            </div>
        </>
    )
}
