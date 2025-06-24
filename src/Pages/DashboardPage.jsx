import React from 'react'
import { Cards } from '../Components/Dashboard/cards'
import { Sales } from '../Components/Dashboard/Sales'
import { Bank } from '../Components/Dashboard/Bank'

export function DashboardPage() {
    

    return (
        <>
            <div className='py-8 px-8'>
              <div>
                <Cards/>
              </div>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4'>
                <div>
                   <Sales/>
                </div>
                <div>
                  <Bank/>
                </div>
              </div>
            </div>
        </>
    )
}
