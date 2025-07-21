import { InputText } from 'primereact/inputtext'
import React from 'react'

export function SearchInput({value,onChange,placeholder}) {
    

    return (
        <>
            <div>
                <InputText 
                value={value}
                onChange={onChange}
                placeholder={placeholder}
               // className='w-full'
                pt={{
                    root: {
                className:
                  "!py-1  !pl-1 focus:!border-[#fab768] !outline-none !shadow-none focus:!outline-none focus:!shadow-none hover:!border-[#fab768]",
              },
                }}
                />
            </div>
        </>
    )
}
