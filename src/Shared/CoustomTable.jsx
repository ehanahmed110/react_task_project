import React from 'react'
import { DataTable } from "primereact/datatable";
import { Column } from 'primereact/column';
import { Skeleton } from 'primereact/skeleton';

export function CoustomTable({
    data = [],
    columns = [],
    loading = false,
    rows = 10,
    page=0,
    totalRecords,
    paginator,
     paginatorTemplate={
    layout: 'PrevPageLink PageLinks NextPageLink',
    PrevPageLink: () => <span className="px-2">Previous</span>,
    NextPageLink: () => <span className="px-2">Next</span>,
        CurrentPageReport: (options) => {
      const first = options.first + 1;
      const last = options.first + options.rows > options.totalRecords
        ? options.totalRecords
        : options.first + options.rows;
      return (
        <span className="mx-2">
          Showing {first} to {last} of {options.totalRecords} records
        </span>
      );
    }
  },
    globalFilter,
    selection,
    onPageChange,
    onSelectionChange,
    className = "",
    ...props
}) {
     const loadingRows = Array.from({ length: rows }).map((_, idx) => ({ id: `skeleton-${idx}` }));

    return (
        <>
           <div className='card w-full'>
            <DataTable
             value={loading ? loadingRows : data}
            lazy
            first={page*rows}
            rows={rows}
            dataKey="id"
            loading={loading}
            paginator={paginator}
            totalRecords={totalRecords}
            globalFilter={globalFilter}
            selection={selection}
            onPage={onPageChange}
            rowsPerPageOptions={[10, 20, 30]}
            className={`${className} p-datatable-sm !text-[13px]`}
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
            body={(rowData, options) => {
  return loading ? (
    <Skeleton width="100%" height="1.5rem" />
  ) : (
    col.body ? col.body(rowData, options) : rowData[col.field]
  );
}}
                style={col.style}
                sortable={col.sortable}
                 headerClassName="!bg-black !text-white font-semibold text-sm "
                />
             ))}
            </DataTable>
           </div>
        </>
    )
}
