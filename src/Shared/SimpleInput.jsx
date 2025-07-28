import { InputText } from 'primereact/inputtext'
import React from 'react'

export function SimpleInput({label,icon,className='',type,placeholder,...props}) {
    

    return (
        <React.Fragment>
            <div className='w-full'>
                {label && (
          <label className="text-sm font-medium whitespace-nowrap">{label}</label>
        )}
                <InputText 
                {...props}
                icon={icon}
                placeholder={placeholder}
                className={`w-[150px] ${className}`}
                type={type}
                pt={{
                    root:{className:"!py-[4px] !px-1 text-sm !outline-none !shadow-none focus:!outline-none focus:!shadow-none hover:!border-[#fab768]"}
                }}
                />
            </div>
        </React.Fragment>
    )
}
