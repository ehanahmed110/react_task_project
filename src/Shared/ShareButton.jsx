import { Button } from 'primereact/button'
import React from 'react'

export function ShareButton({type,label, variant = 'default',className='',...props}) {
    
 const baseStyles = {
    default: "!bg-gradient-to-r from-[#f14f3e] to-[#fab768] !py-1 !px-3 w-full !border-transparent",
    transparent: "!bg-transparent   !px-2 !py-1 !border-[#fab768] !text-[#fab768]"
  };
    return (
        <>
          <Button 
          label={label}
          className={`${className} ${baseStyles[variant]}`}
          pt={{
            root:{className:"!text-[13px]"}
          }}
          {...props}
          type={type}
          />
        </>
    )
}
