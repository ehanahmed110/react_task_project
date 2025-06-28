import React from 'react'

export function Actionutton({icon,className='',onClick,tooltip,}) {
    

    return (
        <React.Fragment>
            <div
            className={`text-black hover:text-[#fab768] cursor-pointer ${className}`}
            onClick={onClick}
            title={tooltip}
            >
             <i className={`pi ${icon}`}></i>   
            </div>
        </React.Fragment>
    )
}
