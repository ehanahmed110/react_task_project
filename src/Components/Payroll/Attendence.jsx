import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FetchAttendenceData } from '../../Features/Payroll/AttendenceSlice';
import { CoustomHeading } from '../../Shared/CoustomHeading';
import { ShareButton } from '../../Shared/ShareButton';
import { CoustomTable } from '../../Shared/CoustomTable';
import { Actionutton } from '../../Shared/Actionutton';

export function Attendence() {
      const [rows, setRows] = useState(10);
      const [page, setPage] = useState(0);
    const {attendence,loading} = useSelector((state)=>state.attendence)
    const dispatch = useDispatch()
     const actionTemplate = (rowData) => (
        <div className="flex gap-x-3">
          <Actionutton icon="pi pi-eye" />
          <Actionutton icon="pi pi-pencil" />
          <Actionutton icon="pi pi-trash" />
        </div>
      );
    useEffect(()=>{
        dispatch(FetchAttendenceData({page:page+1,per_page:rows}))
    },[dispatch,page,rows])
  const data = attendence?.data || [];
  const totalRecords = attendence?.total_record ||0
  const nameTemplate = (rowData) => (
    <div className="flex space-x-1 ">
      <div>{rowData.employee?.first_name}</div>
      <div>{rowData.employee?.last_name}</div>
    </div>
  );
  const columns = [
    {
      header: "No",
      body: (rowData, options) =>
  loading ? (
    <Skeleton width="3rem" height="1.5rem" />
  ) : (
    options?.rowIndex + 1 + page * rows
  ),
    },
    { header: "Name", body: nameTemplate },
    { field: "days", header: "Days" },
    { field: "month", header: "Month" },
    { field: "year", header: "Years" },
    { header: "Actions", body: actionTemplate },
  ];
    return (
        <React.Fragment>
           <div className="flex justify-between">
                       <div>
                           <CoustomHeading title='Attendence'
                           count={totalRecords}
                           subtitle='Entries'/>
                       </div>
                       <div>
                           <ShareButton label='CREATE ATTANDENCE' icon='pi pi-plus'/>
                       </div>

                   </div>
                   <div>
                           <CoustomTable
                             data={data}
                             columns={columns}
                             loading={loading}
                             paginator
                             paginatorTemplate
                             rows={rows}
                             page={page}
                             totalRecords={totalRecords}
                             onPageChange={(e)=>{setRows(e.rows);
                               setPage(e.page)}}
                           />
                            <div className="mb-2 text-sm font-semibold text-gray-600">
                     Total Records: {totalRecords}
                   </div>
                   </div>
        </React.Fragment>
    )
}
