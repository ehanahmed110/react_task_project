import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CoustomHeading } from "../../Shared/CoustomHeading";
import { ShareButton } from "../../Shared/ShareButton";
import { CoustomTable } from "../../Shared/CoustomTable";
import { Actionutton } from "../../Shared/Actionutton";
import { FetchPayslipData } from "../../Features/Payroll/PayslipsSlice";
import { ShareDialog } from "../../Shared/ShareDialog";

export function Payslips() {
  const [visible, setVisible] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogMode, setDialogMode] = useState("");
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0);
  const { payslip, loading } = useSelector((state) => state.payslip);
  const dispatch = useDispatch();
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
          setDialogMode("view");
        }}
      />
      <Actionutton
        icon="pi pi-trash"
        onClick={() => {
          setVisible(true);
          setSelectedRow(rowData);
          setDialogMode("view");
        }}
      />
    </div>
  );
  useEffect(() => {
    dispatch(FetchPayslipData({ page: page + 1, per_page: rows }));
  }, [dispatch, page, rows]);
  const data = payslip?.data || [];
  const totalRecords = payslip?.total_record || 0;
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
    { field: "pay_period", header: "Pay Period" },
    { field: "payment_date", header: "Payment Date" },
    { field: "basic_salary", header: "Basic Sallery" },
    { field: "allowances", header: "Allowance" },
    { field: "deductions", header: "Deductions" },
    { field: "net_salary", header: "Net Sallery" },
    { field: "gosi_contribution", header: "GOSI Contribution" },
    { header: "Actions", body: actionTemplate },
  ];
// -------for dialog columm---------------
 const dialogColumn = [
  { header: "Name", body: nameTemplate },
   { field: "pay_period", header: "Pay Period" },
  {field:"created_at",header:"Create"},
  {field:"updated_at",header:"Update"}
 ]
  return (
    <React.Fragment>
      <div className="flex justify-between">
        <div>
          <CoustomHeading
            title="Payruns"
            count={totalRecords}
            subtitle="Entries"
          />
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
          Total Records: {totalRecords}
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
        >
          {dialogMode === "view" && (
            <div>
              <CoustomTable 
              value={[selectedRow]}
              columns={dialogColumn}
              loading={loading}
              />
            </div>
          )}
        </ShareDialog>
      </div>
    </React.Fragment>
  );
}
