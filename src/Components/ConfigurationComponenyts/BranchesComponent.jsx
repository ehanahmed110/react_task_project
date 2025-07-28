import React, { useEffect, useState } from "react";
import { CoustomHeading } from "../../Shared/CoustomHeading";
import UseAPI from "../../Hooks/UseAPI";
import { ShareButton } from "../../Shared/ShareButton";
import { CoustomTable } from "../../Shared/CoustomTable";
import { Skeleton } from "primereact/skeleton";
import { Actionutton } from "../../Shared/Actionutton";
import { ShareDialog } from "../../Shared/ShareDialog";
import { Form, Formik } from "formik";
import { ShareInput } from "../../Shared/ShareInput";
import {
  BranchInitialValues,
  BranchValidationSchema,
} from "../../Features/Configuration/BranchesData";
import { showError, showSuccess } from "../../Shared/toast";

export function BranchesComponent() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogMode, setDialogMode] = useState("");
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);
  const { data, loading, CallAPI } = UseAPI();
  // ----------fetch Branch Data-----------------
  const getData = Array.isArray(data?.data) ? data?.data : [];
  const fetchBranches = () => {
    CallAPI({
      url: "/listBranches",
      method: "post",
      body: { page: page + 1, per_page: rows },
    });
  };
  useEffect(() => {
    fetchBranches();
  }, []);
  //   -----------table Column-------------
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
  const column = [
    {
      header: "No",
      body: (rowData, options) =>
        loading ? (
          <Skeleton width="3rem" height="1.5rem" />
        ) : (
          options?.rowIndex + 1 + page * rows
        ),
    },
    { header: "Name", field: "name_en" },
    { header: "Contact", field: "contact_info" },
    { header: "Address", field: "address" },
    { header: "Action", body: actionTemplate },
  ];
  //   ----------------create Branch----------------
  const handleSubmit = (values) => {
    const payload = {
      ...values,
      business_id: 38,
    };
    CallAPI({
      url: "/branches",
      method: "post",
      body: payload,
      onSuccess(res) {
        try {
          showSuccess(res.message || "Branch Create Successfully");
          setVisible(false);
          fetchBranches();
        } catch (e) {
          console.error("onSuccess Error", e);
        }
      },
      onError(err) {
        showError(err.message || "unknown error");
      },
    });
  };
  //   ---------------handle Delete---------------\
  const handleDelete = (id) => {
    CallAPI({
      url: `/delBranches/${id}`,
      method: "post",
      onSuccess(res) {
        try {
          showSuccess(res. message || "Branch Delete");
          setVisible(false);
          fetchBranches();
        } catch (e) {
            console.error("onSuccess Error",e)
        }
      },
      onError(err){
         showError(err.message || "unknown error")
      }
    });
  };
  return (
    <React.Fragment>
      <div className="flex justify-between">
        <div>
          <CoustomHeading
            title="Branches"
            subtitle="Entries"
            count={data?.total_record}
          />
        </div>
        <div>
          <ShareButton
            label="CREATE BRANCH"
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
          data={getData}
          columns={column}
          loading={loading}
          paginator={true}
          paginatorTemplate
          page={page}
          rows={rows}
          totalRecords={data?.total_record}
          onPageChange={(e) => {
            setPage(e.page);
            setRows(e.rows);
          }}
        />
        <div className="mb-2 text-sm font-semibold text-gray-600">
          Total Records: {data?.total_record}
        </div>
      </div>
      <div>
        <ShareDialog
          visible={visible}
          onHide={() => setVisible(false)}
          title={
            dialogMode === "create"
              ? "Create Branch"
              : dialogMode === "edit"
              ? "Update Branch"
              : "Delete Branch"
          }
          showFooter={false}
          width={dialogMode === "delete" ? "50vw" : "70vw"}
        >
          {dialogMode === "create" && (
            <div>
              <Formik
                initialValues={BranchInitialValues}
                validationSchema={BranchValidationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div className="grid md:grid-cols-2 grid-cols-1 sm:grid-cols-2 gap-3">
                    <ShareInput
                      label="Name"
                      name="name_en"
                      placeholder="Enter Name"
                    />
                    <ShareInput
                      label="Name (Arabic)"
                      name="name_ar"
                      placeholder="Enter Name (Arabic)"
                    />
                    <ShareInput
                      label="Contact Information"
                      name="contact_info"
                      placeholder="Enter Contact Information"
                    />
                    <ShareInput
                      label="Address"
                      name="address"
                      placeholder="Enter Name"
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
          {dialogMode === "delete" && (
            <div>
              <p>
                <strong>Are You Sure You Want to Delete This Branch</strong>
              </p>
              <div className="mt-4 flex justify-end gap-3">
                <div>
                  <ShareButton
                    label="Cancel"
                    type="button"
                    onClick={() => setVisible(false)}
                  />
                </div>
                <div>
                  <ShareButton
                    label="Delete"
                    onClick={() => handleDelete(selectedRow?.id)}
                  />
                </div>
              </div>
            </div>
          )}
        </ShareDialog>
      </div>
    </React.Fragment>
  );
}
