import React, { useRef } from 'react'
import { Menu } from 'primereact/menu';

export function ExportMenu({ onExcel, onPdf }) {
    const menuRef = useRef(null);
    const exportOptions = [
        {
            label:"Excell",
            icon:"pi pi-file-excell",
            command: onExcel || (()=>console.log("Excell Export"))
        },
        {
            label:"PDF",
            icon:"pi pi-file-pdf",
            command: onPdf || (()=>console.log("PDF Export"))
        }
    ]

    return (
        <React.Fragment>
           <div
                onClick={(e) => menuRef.current.toggle(e)}
                className='flex items-center mb-4 gap-2 text-white cursor-pointer bg-gradient-to-r from-[#f14f3e] to-[#fab768] border px-4 py-2 rounded-lg hover:!bg-none hover:border-[#fab768] hover:text-[#fab768]'
            >
                <span className="text-sm font-bold">
                    Export <i className="pi pi-download ml-2"></i>
                </span>
            </div>
            <Menu model={exportOptions} popup ref={menuRef} />
        </React.Fragment>
    )
}
