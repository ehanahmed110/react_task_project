import { Column } from "primereact/column";
import React, { Children } from "react";
import { Skeleton } from "primereact/skeleton";
import { TreeTable } from "primereact/treetable";

export function CustomTreeTable({
  columns,
  data,
  loading,
  className = "",
  rows,
}) {
  const loadingRows = Array.from({ length: rows }).map((_, idx) => ({
    key: `skeleton-${idx}`,
    data: {},
    children: null,
  }));
  return (
    <React.Fragment>
      <div className="card">
        <TreeTable
          className={`${className} p-treetable-sm !text-[13px]`}
          tableStyle={{ minWidth: "100%" }}
          rowHover
          loading={loading}
          value={loading ? loadingRows : data}
        >
          {columns.map((col, index) => (
            <Column
              key={index}
              field={col.field}
              header={col.header}
              pt={{
                bodycell:{className:"!p-0"}
              }}
              body={(rowData, options) => {
                return loading ? (
                  <Skeleton width="100%" height="1.5rem" />
                ) : col.body ? (
                  col.body(rowData, options)
                ) : (
                  rowData?.data?.[col.field]
                );
              }}
              style={col.style}
              sortable={col.sortable}
              headerClassName="!bg-black !text-white font-semibold text-sm !py-2"
              {...(col.field === "name_code_en" ? { expander: true } : {})} 
            />
          ))}
        </TreeTable>
        {/* )} */}
      </div>
    </React.Fragment>
  );
}
