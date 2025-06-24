import React from 'react'
import { Navbar } from '../Shared/Navbar'

export function Layout({children}) {
    

    return (
        <>
        <div className='w-full  overflow-hidden'>
            <div>
                <Navbar/>
            </div>
            <main className='w-full overflow-hidden'>
                <div className='pt-15 h-[calc(100vh-30px )] overflow-y-auto'>
                    {children}
                </div>
            </main>
        </div>
            
        </>
    )
}
