import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CoustomHeading } from "../../Shared/CoustomHeading";
import { ShareButton } from "../../Shared/ShareButton";
import { CoustomTable } from "../../Shared/CoustomTable";
import { Actionutton } from "../../Shared/Actionutton";
import {
  DeductionData,
  FetchDeductionData,
  getEmployeeData,
} from "../../Features/Payroll/DeductionSlice";
import { ShareInput } from "../../Shared/ShareInput";
import { Field, Form, Formik } from "formik";
import { ShareDialog } from "../../Shared/ShareDialog";
import { CustomDropDown } from "../../Shared/CustomDropDown";
import {
  DeductionInitialValues,
  DeductionValidationSchema,
  employeeName,
  type,
} from "../../Constant/PayrolDeductionData";
import { showError, showSuccess } from "../../Shared/toast";

export function Deductions() {
  const [visible, setVisible] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogMode, setDialogMode] = useState("");
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0);
  const { deduction, loading, message, employee } = useSelector(
    (state) => state.deduction
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmployeeData({}));
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
    dispatch(FetchDeductionData({ page: page + 1, per_page: rows }));
  }, [dispatch, page, rows]);
  //const data = deduction?.data || [];
  const data = Array.isArray(deduction?.data) ? deduction.data : [];
  const totalRecords = deduction?.total_record || 0;
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
    { field: "deduction_type", header: "Deduction Type" },
    { field: "amount", header: "Amount" },
    { field: "description", header: "Discription" },
    { header: "Actions", body: actionTemplate },
  ];
  //----------dialog column-------------
  const dialogColumn = [
    { header: "Name", body: nameTemplate },
    { field: "deduction_type", header: "Deduction Type" },
    { field: "amount", header: "Amount" },
    { field: "description", header: "Discription" },
  ];
  //--------------for employess dropdown field----------------
  const employeeNameOptions =
    employee?.data.map((employ) => ({
      label: `${employ.first_name} ${employ.last_name}`,
      value: employ.id,
    })) || [];
  //---------------------
  const HandleSubmit = (value, actions) => {
    const payload = {
      employee_id: value.name,
      deduction_type: value.typa,
      effective_date: value.date,
      amount: value.amount,
      description: value.description,
      branch_id: null,
      buisness_id: null,
    };
    // try{
    //  const res = await dispatch(DeductionData(payload))
    //  if(res?.payload){
    //     showSuccess(message || "Deduction Add");
    //     setVisible(false);
    //      await dispatch(dispatch(FetchDeductionData({ page: page + 1, per_page: rows })));
    //  }
    // }catch(error){
    //    showError(message);
    //    console.error(error)
    // }
    dispatch(DeductionData(payload));
    showSuccess(message || "Deduction Add");
    setVisible(false);
    dispatch(dispatch(FetchDeductionData({ page: page + 1, per_page: rows })));
  };
  return (
    <React.Fragment>
      <div className="flex justify-between">
        <div>
          <CoustomHeading
            title="Deduction"
            count={totalRecords}
            subtitle="Entries"
          />
        </div>
        <div>
          <ShareButton
            label="CREATE DEDUCTIONS"
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
                initialValues={DeductionInitialValues}
                validationSchema={DeductionValidationSchema}
                onSubmit={(value) => {
                  const payload = {
                    employee_id: value.name,
                    deduction_type: value.typa,
                    effective_date: value.date,
                    amount: value.amount,
                    description: value.description,
                    branch_id: 2,
                    buisness_38: null,
                  };
                  dispatch(DeductionData(payload));
                  showSuccess(message || "Deduction Add");
                  setVisible(false);
                  dispatch(
                    dispatch(
                      FetchDeductionData({ page: page + 1, per_page: rows })
                    )
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
                      options={employeeNameOptions}
                      optionLabel="label"
                    />
                    <Field
                      name="type"
                      label="Deduction Type"
                      component={CustomDropDown}
                      filter={true}
                      placeholder="Select Deduction Type"
                      options={type}
                      optionLabel="label"
                    />
                    <ShareInput
                      name="date"
                      type="date"
                      placeholder="Select Date"
                      label="Effective Date"
                    />
                    <ShareInput
                      name="amount"
                      placeholder="Enter Amount"
                      type="number"
                      label="Amount"
                    />
                  </div>
                  <div className="mt-2">
                    <ShareInput
                      name="description"
                      placeholder="Description"
                      label="Description"
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
