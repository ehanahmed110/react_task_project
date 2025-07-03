import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AttendenceData,
  FetchAttendenceData,
} from "../../Features/Payroll/AttendenceSlice";
import { CoustomHeading } from "../../Shared/CoustomHeading";
import { ShareButton } from "../../Shared/ShareButton";
import { CoustomTable } from "../../Shared/CoustomTable";
import { Actionutton } from "../../Shared/Actionutton";
import { ShareDialog } from "../../Shared/ShareDialog";
import { Field, Form, Formik } from "formik";
import { CustomDropDown } from "../../Shared/CustomDropDown";
import {
  AttendenceInitialValues,
  AttendenceValidationSchema,
  dayData,
  monthData,
  yearData,
} from "../../Constant/PayrolAttendenceData";
import { employeeName } from "../../Constant/PayrolLeaveData";
import { showSuccess } from "../../Shared/toast";

export function Attendence() {
  const [visible, setVisible] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogMode, setDialogMode] = useState("");
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0);
  const { attendence, loading, message } = useSelector(
    (state) => state.attendence
  );
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
    dispatch(FetchAttendenceData({ page: page + 1, per_page: rows }));
  }, [dispatch, page, rows]);
  const data = attendence?.data || [];
  const totalRecords = attendence?.total_record || 0;
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
  //--------dialog column----------
  const dialogColumn = [
    { header: "Name", body: nameTemplate },
    { field: "days", header: "Days" },
    { field: "month", header: "Month" },
    { field: "year", header: "Years" },
  ];
  return (
    <React.Fragment>
      <div className="flex justify-between">
        <div>
          <CoustomHeading
            title="Attendence"
            count={totalRecords}
            subtitle="Entries"
          />
        </div>
        <div>
          <ShareButton
            label="CREATE ATTANDENCE"
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
      <div>
        <ShareDialog
          visible={visible}
          onHide={() => setVisible(false)}
          title={
            dialogMode === "create"
              ? "Create Attendence"
              : dialogMode === "view"
              ? "Attendence Detail"
              : dialogMode === "edit"
              ? "Update Attendence"
              : "Delete Attendence"
          }
          showFooter={false}
          width={dialogMode === "create" ? "70vw" : "50vw"}
        >
          {dialogMode === "create" && (
            <div>
              <Formik
                initialValues={AttendenceInitialValues}
                validationSchema={AttendenceValidationSchema}
                onSubmit={(payload) => {
                  dispatch(AttendenceData(payload));
                  showSuccess(message || "Attendence Add");
                  setVisible(false);
                  dispatch(
                    FetchAttendenceData({ page: page + 1, per_page: rows })
                  );
                }}
              >
                <Form>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
                    <Field
                      name="name"
                      component={CustomDropDown}
                      label="Employee Name"
                      placeholder="Select Employee"
                      filter={true}
                      options={employeeName}
                      optionLabel="label"
                    />
                    <Field
                      name="year"
                      label="Year"
                      component={CustomDropDown}
                      optionLabel="label"
                      filter={true}
                      options={yearData}
                      placeholder="Select Year"
                    />
                    <Field
                      name="month"
                      label="Month"
                      placeholder="Select Month"
                      optionLabel="label"
                      filter={true}
                      options={monthData}
                      component={CustomDropDown}
                    />
                    <Field
                      name="day"
                      label="Days"
                      placeholder="Select Days"
                      optionLabel="label"
                      filter={true}
                      options={dayData}
                      component={CustomDropDown}
                    />
                  </div>
                  <div className="flex justify-end gap-x-3 mt-3">
                    <div>
                      <ShareButton
                        label="Cancel"
                        type="button"
                        icon="pi pi-times"
                        onClick={() => setVisible(false)}
                      />
                    </div>
                    <div>
                      <ShareButton
                        label="Submit"
                        type="submit"
                        icon="pi pi-check"
                      />
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
          )}
          {dialogMode === "view" && (
            <div>
              <CoustomTable value={[selectedRow]} columns={dialogColumn} />
            </div>
          )}
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
