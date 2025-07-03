import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CoustomHeading } from "../../Shared/CoustomHeading";
import { ShareButton } from "../../Shared/ShareButton";
import { CoustomTable } from "../../Shared/CoustomTable";
import { Actionutton } from "../../Shared/Actionutton";
import { FetchLeaveData, LeaveData } from "../../Features/Payroll/LeaveSlice";
import { ShareDialog } from "../../Shared/ShareDialog";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { CustomDropDown } from "../../Shared/CustomDropDown";
import { ShareInput } from "../../Shared/ShareInput";
import {
  employeeName,
  leaveInitialValues,
  leaveValidationSchema,
  statusData,
  typeData,
} from "../../Constant/PayrolLeaveData";
import { showSuccess } from "../../Shared/toast";

export function Leaves() {
  const [visible, setVisible] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogMode, setDialogMode] = useState("");
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0);
  const { leave, loading, message } = useSelector((state) => state.leave);
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
    dispatch(FetchLeaveData({ page: page + 1, per_page: rows }));
  }, [dispatch, page, rows]);
  const data = leave?.data || [];
  const totalRecords = leave?.total_record || 0;
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
    { field: "start_date", header: "Start Date" },
    { field: "end_date", header: "End Date" },
    { field: "leave_type", header: "Leave Type" },
    { field: "status", header: "Status" },
    { header: "Actions", body: actionTemplate },
  ];
  //------------view column------------\
  const viewColumn = [
    { body: nameTemplate, header: "Name" },
    { field: "leave_type", header: "Leave Type" },
    { field: "status", header: "Status" },
  ];
  return (
    <React.Fragment>
      <div className="flex justify-between">
        <div>
          <CoustomHeading
            title="Leave"
            count={totalRecords}
            subtitle="Entries"
          />
        </div>
        <div>
          <ShareButton
            label="CREATE LEAVE"
            icon="pi pi-plus"
            onClick={() => {
              setVisible(true);
              setDialogMode("create");
            }}
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
      {/* -----------------------Dialog------------------------- */}
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
          {dialogMode === "create" && (
            <div>
              <Formik
                initialValues={leaveInitialValues}
                validationSchema={leaveValidationSchema}
                onSubmit={(payload) => {
                  dispatch(LeaveData(payload));
                  showSuccess(message || "Leave Successfully");
                  setVisible(false);
                  dispatch(FetchLeaveData({ page: page + 1, per_page: rows }));
                }}
              >
                <Form className="flex flex-col gap-2">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
                    <Field
                      name="name"
                      label="Employee Name"
                      component={CustomDropDown}
                      options={employeeName}
                      optionLabel="name"
                      placeholder="Select Employee"
                      filter={true}
                    />
                    <Field
                      name="type"
                      label="Leave Type"
                      component={CustomDropDown}
                      options={typeData}
                      optionLabel="type"
                      placeholder="Select Leave Type"
                    />
                    <ShareInput
                      name="start_date"
                      type="date"
                      label="Start Date"
                    />
                    <ShareInput name="end_date" type="date" label="End date" />
                  </div>
                  <div>
                    <Field
                      name="status"
                      label="Status"
                      component={CustomDropDown}
                      options={statusData}
                      optionLabel="status"
                      placeholder="Select status"
                    />
                  </div>
                  <div className="flex justify-end gap-x-3">
                    <div>
                      <ShareButton
                        label="Cancel"
                        type="button"
                        onClick={() => setVisible(false)}
                      />
                    </div>
                    <div>
                      <ShareButton label="Submit" type="submit" />
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
          )}
          {dialogMode === "view" && (
            <div>
              <CoustomTable
                value={[selectedRow]}
                columns={viewColumn}
                loading={loading}
              />
            </div>
          )}
          {dialogMode === "edit" && <div></div>}
          {dialogMode === "delete" && (
            <div>
              <p className="font-bold">
                Are You Sure You Want To Delete......{" "}
              </p>
              <div className="flex justify-end gap-x-3">
                <div>
                  <ShareButton
                    label="Cancel"
                    onClick={() => setVisible(false)}
                  />
                </div>
                <div>
                  <ShareButton label="Delete" />
                </div>
              </div>
            </div>
          )}
        </ShareDialog>
      </div>
    </React.Fragment>
  );
}
