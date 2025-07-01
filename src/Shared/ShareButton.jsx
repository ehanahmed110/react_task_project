import { Button } from 'primereact/button'
import React from 'react'

export function ShareButton({type,label, icon,onClick, variant = 'default',disabled,className='',...props}) {
    
 const baseStyles = {
    default: "!bg-gradient-to-r from-[#f14f3e] to-[#fab768] !py-1 !px-3 w-full !border-transparent hover:!bg-none hover:!text-[#fab768] hover:!border-[#fab768]",
    transparent: "!bg-transparent   !px-2 !py-1 !border-[#fab768] !text-[#fab768]"
  };
    return (
        <>
          <Button 
          label={label}
          icon={icon}
          className={`${className} ${baseStyles[variant]}`}
          disabled={disabled}
          onClick={onClick}
          pt={{
            root:{className:"!text-[13px] hover:!bg-transparent hover:!text-[#fab768] hover:!border-[#fab768]"}
          }}
          {...props}
          type={type}
          />
        </>
    )
}
