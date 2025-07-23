import React, { useEffect, useState } from "react";
import { CoustomHeading } from "../../Shared/CoustomHeading";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateCoustomerData,
  deleteCoustomerData,
  GetCoustomerData,
  SearchCoustomerData,
  UpdateCoustomer,
} from "../../Features/Configuration/CoustomerSlice";
import { SearchInput } from "../../Shared/SearchInput";
import { ShareButton } from "../../Shared/ShareButton";
import { CoustomTable } from "../../Shared/CoustomTable";
import { Skeleton } from "primereact/skeleton";
import { Actionutton } from "../../Shared/Actionutton";
import { ShareDialog } from "../../Shared/ShareDialog";
import { Field, Form, Formik } from "formik";
import { ShareInput } from "../../Shared/ShareInput";
import { CustomDropDown } from "../../Shared/CustomDropDown";
import {
  countryOption,
  CoustomerInitialValues,
  CoustomerValidationSchema,
  statusOption,
} from "../../Features/Configuration/CoustomerData";
import { showError, showSuccess } from "../../Shared/toast";

export function CoustomerComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogMode, setDialogMode] = useState("");
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);
  const { coustomer, loading, error } = useSelector((state) => state.coustomer);
  const dispatch = useDispatch();
  // --------------For Fetching Data -------------------------
  useEffect(() => {
    dispatch(GetCoustomerData({ page: page + 1, per_page: rows }));
  }, [dispatch, page, rows]);
  // -------------------For Seraching data--------------------
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm && searchTerm.trim() !== "") {
        dispatch(
          SearchCoustomerData({
            page: page + 1,
            per_page: rows,
            query: searchTerm,
          })
        );
      }
      else{
        dispatch(GetCoustomerData({ page: page + 1, per_page: rows }));
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);
  const data = Array.isArray(coustomer?.data) ? coustomer?.data : [];
  const actionTemplate = (rowData) => (
    <div className="flex gap-x-3">
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
    { header: "Name", field: "name" },
    { header: "Document ID", field: "document_id" },
    { header: "Primary Contact Number", field: "primary_contact_number" },
    { header: "Primary Email ID", field: "primary_email_id" },
    { header: "Status", field: "status" },
    { header: "Actions", body: actionTemplate },
  ];
  // ---------------for create new------------
  const handleSubmit = (values) => {
    const Payload = {
      ...values,
      business_id: 38,
      branch_id: 2,
    };
    dispatch(CreateCoustomerData(Payload))
      .unwrap()
      .then((res) => {
        setVisible(false);
        showSuccess(res.message || "Coustomer created");
        dispatch(GetCoustomerData({ page: page + 1, per_page: rows }));
      })
      .catch((err) => {
        console.error("Create Error:", err);
        showError(err.message);
      });
  };
  //   -------------for Update Data----------------
  const handleUpdate = (values) => {
    const Payload = {
      ...values,
      business_id: 38,
      branch_id: 2,
    };
    dispatch(UpdateCoustomer({ id: selectedRow?.id, payload: Payload }))
      .unwrap()
      .then((res) => {
        showSuccess(res.message || "Customer updated successfully");
        setVisible(false);
        dispatch(GetCoustomerData({ page: page + 1, per_page: rows }));
      })
      .catch((err) => {
        console.error("Update Error:", err);
        showError(err.message || "Update failed");
      });
  };
  //   ---------------for Delete ---------------
  const handleDelete = () => {
    dispatch(deleteCoustomerData(selectedRow?.id))
      .unwrap()
      .then((res) => {
        setVisible(false);
        showSuccess(res.message || "Coustomer deleted");
        dispatch(GetCoustomerData({ page: page + 1, per_page: rows }));
      })
      .catch((err) => {
        console.error("Update Error:", err);
        showError(err.message || "Update failed");
      });
  };
  return (
    <React.Fragment>
      <div className="flex justify-between">
        <div>
          <CoustomHeading
            title="COUSTOMERS"
            count={coustomer?.total_record}
            subtitle="Entries"
          />
        </div>
        <div className="flex gap-3">
          <div>
            <SearchInput
              placeholder="Search by Name or Document ID"
              value={searchTerm}
              onChange={(e) =>setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <ShareButton
              label="CREATE CUSTOMER"
              icon="pi pi-plus"
              onClick={() => {
                setDialogMode("create");
                setVisible(true);
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
          paginator={true}
          paginatorTemplate
          rows={rows}
          page={page}
          totalRecords={coustomer?.total_record}
          onPageChange={(e) => {
            setRows(e.rows);
            setPage(e.page);
          }}
        />
        <div className="mb-2 text-sm font-semibold text-gray-600">
          Total Records: {coustomer?.total_record}
        </div>
      </div>
      <div>
        <ShareDialog
          visible={visible}
          onHide={() => setVisible(false)}
          title={
            dialogMode === "create"
              ? "Create Customer"
              : dialogMode === "edit"
              ? "Update Customer"
              : "Delete Customer"
          }
          showFooter={false}
          width={dialogMode === "delete" ? "50vw" : "80vw"}
        >
          {dialogMode === "create" && (
            <div>
              <Formik
                initialValues={CoustomerInitialValues}
                validationSchema={CoustomerValidationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div className="grid md:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-3">
                    <ShareInput
                      label="Name"
                      placeholder="Enter Name"
                      name="name"
                    />
                    <ShareInput
                      label="Primary Contact Number"
                      placeholder="Enter Primary Contact Number"
                      name="primary_contact_number"
                    />
                    <ShareInput
                      label="Primary Email ID"
                      placeholder="Enter Primary Email ID"
                      name="primary_email_id"
                    />
                    <ShareInput
                      label="Address  "
                      placeholder="Enter Address"
                      name="address"
                    />
                    <ShareInput
                      label="Document ID"
                      placeholder="Enter Document ID"
                      name="document_id"
                    />
                    <Field
                      label="Status"
                      name="status"
                      component={CustomDropDown}
                      options={statusOption}
                      optionLabel="label"
                      placeholder="Select Status"
                    />
                    <Field
                      label="Nationality"
                      name="nationality"
                      placeholder="Select Nationality"
                      component={CustomDropDown}
                      optionLabel="label"
                      filter={true}
                      options={countryOption}
                    />
                  </div>
                  <div className="mt-4 flex justify-end gap-3">
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
          {dialogMode === "edit" && (
            <div>
              <Formik
                initialValues={selectedRow || CoustomerInitialValues}
                validationSchema={CoustomerValidationSchema}
                onSubmit={handleUpdate}
              >
                <Form>
                  <div className="grid md:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-3">
                    <ShareInput
                      label="Name"
                      placeholder="Enter Name"
                      name="name"
                    />
                    <ShareInput
                      label="Primary Contact Number"
                      placeholder="Enter Primary Contact Number"
                      name="primary_contact_number"
                    />
                    <ShareInput
                      label="Primary Email ID"
                      placeholder="Enter Primary Email ID"
                      name="primary_email_id"
                    />
                    <ShareInput
                      label="Address  "
                      placeholder="Enter Address"
                      name="address"
                    />
                    <ShareInput
                      label="Document ID"
                      placeholder="Enter Document ID"
                      name="document_id"
                    />
                    <Field
                      label="Status"
                      name="status"
                      component={CustomDropDown}
                      options={statusOption}
                      optionLabel="label"
                      placeholder="Select Status"
                    />
                    <Field
                      label="Nationality"
                      name="nationality"
                      placeholder="Select Nationality"
                      component={CustomDropDown}
                      optionLabel="label"
                      filter={true}
                      options={countryOption}
                    />
                  </div>
                  <div className="mt-4 flex justify-end gap-3">
                    <div>
                      <ShareButton
                        label="Cancel"
                        type="button"
                        onClick={() => setVisible(false)}
                      />
                    </div>
                    <div>
                      <ShareButton label="Update" type="submit" />
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
          )}
          {dialogMode === "delete" && (
            <div>
              <p>
                <strong> Are You Sure You Want to delete</strong>
              </p>
              <p>Document ID: {selectedRow?.document_id}</p>
              <div className="mt-4 flex justify-end gap-3">
                <div>
                  <ShareButton
                    label="Cancel"
                    type="button"
                    onClick={() => setVisible(false)}
                  />
                </div>
                <div>
                  <ShareButton onClick={handleDelete} label="Delete" />
                </div>
              </div>
            </div>
          )}
        </ShareDialog>
      </div>
    </React.Fragment>
  );
}
