import { InputText } from 'primereact/inputtext'
import React from 'react'

export function SearchInput({value,onchange,placeholder}) {
    

    return (
        <>
            <div>
                <InputText 
                value={value}
                onChange={onchange}
                placeholder={placeholder}
               // className='w-full'
                pt={{
                    root: {
                className:
                  "!py-1  !pl-1 focus:!outline-none hover:!border-[#fab768]",
              },
                }}
                />
            </div>
        </>
    )
}
