import React from 'react'
import { DataTable } from "primereact/datatable";
import { Column } from 'primereact/column';

export function CoustomTable({
    data = [],
    columns = [],
    loading = false,
    rows = 10,
    paginator,
    globalFilter,
    selection,
    onSelectionChange,
    className = "",
    ...props
}) {
    

    return (
        <>
           <div className='card'>
            <DataTable
            value={data}
            rows={rows}
            dataKey="id"
            loading={loading}
            paginator={paginator}
            globalFilter={globalFilter}
            selection={selection}
            className={`${className} p-datatable-sm`}
            tableStyle={{ minWidth: '100%' }}
            rowHover
            stripedRows
            onSelectAllChange={onSelectionChange}
            {...props}
            >
             {columns.map((col,index)=>(
                <Column  
                key={index}
                field={col.field}
                header={col.header}
                body={col.body}
                style={col.style}
                sortable={col.sortable}
                 headerClassName="bg-gray-300 text-gray-800 font-semibold text-sm"
                />
             ))}
            </DataTable>
           </div>
        </>
    )
}
