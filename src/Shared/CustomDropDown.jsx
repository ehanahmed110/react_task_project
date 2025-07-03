import React from 'react'
import { Dropdown } from 'primereact/dropdown';

export function CustomDropDown({
field,
form,  
label,  
options = [],
value,
onChange,
optionLabel = "label",
placeholder = "Select...",
filter = false,
disabeled = false,
className = '',
panelClassName = '',
dataKey,
...resetProps
}) {
    
 const error = form?.errors?.[field?.name];
 const touched = form?.touched?.[field?.name]
    return (
        <React.Fragment>
            <div className='flex flex-col gap-1 w-full'>
                {label && (
          <label className="block text-sm font-medium mb-1">{label}</label>
        )}
              <Dropdown 
              id={field.name}
              options={options}
              value={field.value}
              onChange={(e) => form.setFieldValue(field.name, e.value)}
              optionLabel={optionLabel}
              placeholder={placeholder}
              filter={filter}
              disabled={disabeled}
              className={`${className} ${error && touched ? 'p-invalid' : ''}`}
            panelClassName={panelClassName}
            dataKey={dataKey}
            {...resetProps}
            {...field}
            pt={{
                root:{className:"!rounded-[4px] !outline-none !shadow-none focus:!outline-none focus:!shadow-none hover:!border-[#fab768]"},
                input:{className:"!py-[6px] !px-2 !text-sm"},
                trigger:{className:"!py-1"}
            }}
              />
              {error && touched && (
        <small className="text-red-500 text-xs">{error}</small>
      )}
              </div>
        </React.Fragment>
    )
}
