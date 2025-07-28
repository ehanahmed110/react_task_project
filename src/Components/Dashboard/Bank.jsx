import { Chart } from 'primereact/chart'
import React from 'react'

export function Bank() {
        const data = {
        datasets :[
            {
                label: "Sales",
                backgroundColor:"blue"
            },
            {
                label :"purchase",
                backgroundColor:"pink"
            }
        ]
    }

    return (
        <>
              <div className='bg-white shadow-lg  border border-gray-100 px-4 py-6  '>
                            <h1 className='text-2xl font-bold mb-6'>Bank Flow vs Cash Flow</h1>
                            <div className='h-[360px] w-full'>
                                 <Chart type='bar' data={data} 
                                 pt={{
                                    canvas:{className:"!h-[350px]"}
                                 }}
                                 />
                            </div>
                        </div>
        </>
    )
}
