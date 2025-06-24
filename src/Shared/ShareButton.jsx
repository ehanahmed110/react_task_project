import { Button } from 'primereact/button'
import React from 'react'

export function ShareButton({type,label,className='',...props}) {
    

    return (
        <>
          <Button 
          label={label}
          className={`${className} !bg-linear-60 from-[#f14f3e] to-[#fab768] !py-1 !px-4 w-full flex justify-center items-center !border-transparent`}
          {...props}
          type={type}
          />
        </>
    )
}
