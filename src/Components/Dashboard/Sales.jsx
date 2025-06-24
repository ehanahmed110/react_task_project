import { Chart } from 'primereact/chart'
import React from 'react'

export function Sales() {
    const data = {
        datasets :[
            {
                label: "Sales",
                backgroundColor:"green"
            },
            {
                label :"purchase",
                backgroundColor:"orange"
            }
        ]
    }

    return (
        <>
            <div className='bg-white shadow-lg  border border-gray-100 px-4 py-6 '>
                <h1 className='text-2xl font-bold mb-6'>Sales vs Purchase</h1>
                <div className='h-[400px] w-full'>
                     <Chart type='bar' data={data} 
                     pt={{
                        canvas:{className:"!h-[380px]"}
                     }}
                     />
                </div>
            </div>
        </>
    )
}
