import React, { useEffect, useState } from "react";
import { CoustomTable } from "../../Shared/CoustomTable";
import { useDispatch, useSelector } from "react-redux";
import { Actionutton } from "../../Shared/Actionutton";
import { FetchEmployeData } from "../../Features/Payroll/EmployeeSlice";
import { CoustomHeading } from "../../Shared/CoustomHeading";
import { ShareButton } from "../../Shared/ShareButton";
import { ShareDialog } from "../../Shared/ShareDialog";
import { useNavigate } from "react-router-dom";

export function Employyes() {
  const [visible, setVisible] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogMode, setDialogMode] = useState("");
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0);
  const { employee, loading } = useSelector((state) => state.employee);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const actionTemplate = (rowData) => (
    <div className="flex gap-x-3">
      <Actionutton
        icon="pi pi-eye"
        onClick={() => {
          setVisible(true);
          setSelectedRow(rowData);
          setDialogMode("view");
        }}
      />
      <Actionutton
        icon="pi pi-pencil"
        onClick={() => {
          setVisible(true);
          setSelectedRow(rowData);
          setDialogMode("edit");
        }}
      />
      <Actionutton
        icon="pi pi-trash"
        onClick={() => {
          setVisible(true);
          setSelectedRow(rowData);
          setDialogMode("delete");
        }}
      />
    </div>
  );

  useEffect(() => {
    dispatch(FetchEmployeData({ page: page + 1, per_page: rows }));
  }, [dispatch, rows, page]);
  const data = employee?.data || [];
  const totalRecords = employee?.total_record;
  const nameTemplate = (rowData) => (
    <div className="flex space-x-1 ">
      <div>{rowData?.first_name}</div>
      <div>{rowData?.last_name}</div>
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
    { field: "national_id", header: "Naional ID" },
    { field: "email", header: "Email" },
    { header: "Actions", body: actionTemplate },
  ];

  return (
    <React.Fragment>
      <div className="flex justify-between">
        <div>
          <CoustomHeading
            title="Employees"
            count={totalRecords}
            subtitle="Entries"
          />
        </div>
        <div>
          <ShareButton label="CREATE EMPLOYEES" icon="pi pi-plus" onClick={()=>navigate('/createemployee')}/>
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
          onPageChange={(e) => {
            setRows(e.rows);
            setPage(e.page);
          }}
        />
        <div className="mb-2 text-sm font-semibold text-gray-600">
          Total Employees: {totalRecords}
        </div>
      </div>
      <div>
        <ShareDialog
          visible={visible}
          onHide={() => setVisible(false)}
          title={
            dialogMode === "create"
              ? "Create Leave"
              : dialogMode === "view"
              ? "Leave Detail"
              : dialogMode === "edit"
              ? "Update Leave"
              : "Delete Leave"
          }
          showFooter={false}
          width={dialogMode === "create" ? "70vw" : "50vw"}
        ></ShareDialog>
      </div>
    </React.Fragment>
  );
}
