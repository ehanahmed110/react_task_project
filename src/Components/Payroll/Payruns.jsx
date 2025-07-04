import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CoustomHeading } from "../../Shared/CoustomHeading";
import { ShareButton } from "../../Shared/ShareButton";
import { CoustomTable } from "../../Shared/CoustomTable";
import { Actionutton } from "../../Shared/Actionutton";
import {
  CreatePayrunsData,
  FetchPayrunsData,
  GetPayrunsData,
} from "../../Features/Payroll/PayrunsSlice";
import { ShareDialog } from "../../Shared/ShareDialog";
import { Field, Form, Formik } from "formik";
import { ShareInput } from "../../Shared/ShareInput";
import {
  PayrunInitialValues,
  PayrunValidationSchema,
} from "../../Constant/PayrolPayrun";
import { CustomDropDown } from "../../Shared/CustomDropDown";
import { showError, showSuccess } from "../../Shared/toast";

export function Payruns() {
  const [visible, setVisible] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogMode, setDialogMode] = useState("");
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0);
  const { payruns, loading, message,getcashbank } = useSelector((state) => state.payruns);
  const dispatch = useDispatch();

  const getcash = Array.isArray(getcashbank?.data) ? getcashbank?.data : [];
  useEffect(()=>{
      dispatch(GetPayrunsData());
  },[])
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
    dispatch(FetchPayrunsData({ page: page + 1, per_page: rows }));
  }, [dispatch, page, rows]);
  //const data = payruns?.data || [];
  const data = Array.isArray(payruns?.data) ? payruns?.data : [];
  const totalRecords = payruns?.total_record || 0;
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
    { field: "payment_date", header: "Payment Date" },
    { field: "pay_period", header: "Pay Period" },
    { header: "Name", body: nameTemplate },
    { field: "basic_salary", header: "Basic Sallery" },
    { field: "allowances", header: "Allowance" },
    { field: "deductions", header: "Deductions" },
    { field: "net_salary", header: "Net Sallery" },
    { field: "gosi_contribution", header: "GOSI Contribution" },
    { header: "Actions", body: actionTemplate },
  ];
// --------------for drpdown----------------
const AccountType =Array.isArray(getcashbank?.data) ? getcashbank?.data?.map((item) => ({
  label: item.name_en, 
  value: item.code,       
})) :[]
// ---------dialog column----------------
const dialogColumn = [
 { header: "Name", body: nameTemplate },
 {field:"created_at",header:"Create"},
  {field:"updated_at",header:"Update"},
  { field: "allowances", header: "Allowance" },
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
        <div className="flex gap-x-3">
          <div>
            <ShareButton
              label="CREATE PAYROLL"
              icon="pi pi-plus"
              onClick={() => {
                setVisible(true);
                setDialogMode("create");
              }}
            />
          </div>
          <div>
            <ShareButton
              label="GENERATE PAYRUNS"
              icon="pi pi-plus"
              onClick={() => {
                setVisible(true);
                setDialogMode("generate");
              }}
            />
          </div>
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
              ? "Create Payroll"
              : dialogMode === "generate"
              ? "Generate Payroll"
              : dialogMode === "view"
              ? "Payruns Detail"
              : dialogMode === "edit"
              ? "Update Attendence"
              : "Delete Attendence"
          }
          showFooter={false}
          width={
            dialogMode === "create" || dialogMode === "generate"
              ? "70vw"
              : "50vw"
          }
        >
          {(dialogMode === "create" || dialogMode === "generate") && (
            <div>
              <Formik
                initialValues={PayrunInitialValues}
                validationSchema={PayrunValidationSchema}
                onSubmit={(value) => {
                  const payload = {
                    account_code:value.account,
                    pay_period: value.pay,
                  };
                  dispatch(CreatePayrunsData(payload))
                    .unwrap()
                    .then((res) => {
                      showSuccess(res.message || "successfullty create");
                      setVisible(false);
                      dispatch(
                        FetchPayrunsData({ page: page + 1, per_page: rows })
                      );
                    })
                    .catch((err) => {
                      console.error("Create Error:", err);
                      showError(err.message);
                    });
                }}
              >
                <Form className="">
                  <div className="flex w-full gap-x-2">
                    <ShareInput
                      type="date"
                      name="pay"
                      placeholder="Select Pay-Period"
                    />

                    <Field
                      name="account"
                      component={CustomDropDown}
                      options={AccountType}
                      optionLabel="label"
                      filter={true}
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
