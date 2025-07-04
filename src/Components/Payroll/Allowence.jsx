import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CoustomHeading } from "../../Shared/CoustomHeading";
import { ShareButton } from "../../Shared/ShareButton";
import { CoustomTable } from "../../Shared/CoustomTable";
import { Actionutton } from "../../Shared/Actionutton";
import {
  AllowanceEmployeeData,
  CreateAllowanceData,
  FetchAllowanceData,
} from "../../Features/Payroll/Allowence";
import { ShareDialog } from "../../Shared/ShareDialog";
import {
  AllowanceInitialValues,
  allowanceType,
  AllowanceValidationSchema,
} from "../../Constant/PayrolAllowance";
import { Field, Form, Formik } from "formik";
import { CustomDropDown } from "../../Shared/CustomDropDown";
import { ShareInput } from "../../Shared/ShareInput";
import { showError, showSuccess } from "../../Shared/toast";

export function Allowence() {
  const [visible, setVisible] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogMode, setDialogMode] = useState("");
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0);
  const { allowance, loading, employeeName, message } = useSelector(
    (state) => state.allowance
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AllowanceEmployeeData());
  }, []);

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
    dispatch(FetchAllowanceData({ page: page + 1, per_page: rows }));
  }, [dispatch, page, rows]);

  const data = Array.isArray(allowance?.data) ? allowance.data : [];
  const totalRecords = allowance?.total_record || 0;
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
    { field: "effective_date", header: "Effective Date" },
    { header: "Name", body: nameTemplate },
    { field: "allowance_type", header: "Allowance Type" },
    { field: "amount", header: "Amount" },
    { header: "Actions", body: actionTemplate },
  ];
  //------------for dropdow n-----------------
  const nameOptions = Array.isArray(employeeName?.data)
    ? employeeName.data.map((nam) => ({
        label: `${nam.first_name} ${nam.last_name}`,
        value: nam.id,
      }))
    : [];
  //--------dialog column-------------------
  const dialogColumn = [
    { header: "Name", body: nameTemplate },
    {field:"created_at",header:"Created At"},
    {field:"updated_at",header:"Updated At"}
  ];
  return (
    <React.Fragment>
      <div className="flex justify-between">
        <div>
          <CoustomHeading
            title="Allowance"
            count={totalRecords}
            subtitle="Entries"
          />
        </div>
        <div>
          <ShareButton
            label="CREATE ALLOWANCE"
            icon="pi pi-plus"
            onClick={() => {
              setVisible(true), setDialogMode("create");
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
              ? "Create Allowance"
              : dialogMode === "view"
              ? "Allowance Detail"
              : dialogMode === "edit"
              ? "Update Allowance"
              : "Delete Allowance"
          }
          showFooter={false}
          width={dialogMode === "create" ? "70vw" : "50vw"}
        >
          {dialogMode === "create" && (
            <div>
              <Formik
                initialValues={AllowanceInitialValues}
                validationSchema={AllowanceValidationSchema}
                onSubmit={(values) => {
                  const payload = {
                    employee_id: values.name,
                    allowance_type: values.type,
                    amount: Number(values.amount),
                    branch_id: 2,
                    business_id: 38,
                    effective_date: values.date,
                  };
                  dispatch(CreateAllowanceData(payload))
                    .unwrap()
                    .then((res) => {
                      showSuccess(res.message || "Allowance Created");
                      setVisible(false);
                      dispatch(
                        FetchAllowanceData({ page: page + 1, per_page: rows })
                      );
                    })
                    .catch((err) => {
                      console.error("Create Error:", err);
                      showError(err.message);
                    });
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
                      options={nameOptions}
                      optionLabel="label"
                    />
                    <Field
                      name="type"
                      label="Allowance Type"
                      component={CustomDropDown}
                      optionLabel="label"
                      filter={true}
                      options={allowanceType}
                      placeholder="Select Type"
                    />
                    <ShareInput
                      name="date"
                      label="Effective Date"
                      placeholder="Select Date"
                      type="date"
                    />
                    <ShareInput
                      name="amount"
                      label="Amount"
                      placeholder="Select Amount"
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
