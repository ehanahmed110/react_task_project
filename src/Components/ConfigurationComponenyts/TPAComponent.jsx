import React, { useEffect, useState } from "react";
import { CoustomHeading } from "../../Shared/CoustomHeading";
import { ShareButton } from "../../Shared/ShareButton";
import { CoustomTable } from "../../Shared/CoustomTable";
import { ShareDialog } from "../../Shared/ShareDialog";
import { Form, Formik } from "formik";
import { ShareInput } from "../../Shared/ShareInput";
import {
  TPAInitialValues,
  TPAValidationSchema,
} from "../../Features/Configuration/TPAData";
import UseAPI from "../../Hooks/UseAPI";
import { showError, showSuccess } from "../../Shared/toast";
import { Skeleton } from "primereact/skeleton";
import { Actionutton } from "../../Shared/Actionutton";

export function TPAComponent() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogMode, setDialogMode] = useState("");
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);
  const { data, loading, CallAPI } = UseAPI();
  //   -------------get Data ----------------

  const getData = Array.isArray(data?.data) ? data?.data : [];
  const fetchTPA = () => {
    CallAPI({
      url: "/listTpa",
      method: "post",
      body: { page: page + 1, per_page: rows },
    });
  };
  useEffect(() => {
    fetchTPA();
  }, []);
  //   --------------Create  TPA-----------------
  const handleSubmit = (payload) => {
    CallAPI({
      url: "/tpa",
      method: "post",
      body: payload,
      onSuccess(res) {
        try {
          showSuccess(res.message || "TPA Created");
          setVisible(false);
          fetchTPA();
        } catch (e) {
          console.error("onSuccess error:", e);
        }
      },
      onError(err) {
        showError(err.message || "unknown Error");
      },
    });
  };
  //   ---------------table Column------------------
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
    { header: "TPA name EN", field: "name_en" },
    { header: "TPA name AR", field: "name_ar" },
    { header: "Short Name", field: "short_name" },
    { header: "License", field: "license_id" },
    { header: "Created At", field: "created_at" },
    { header: "Action", body: actionTemplate },
  ];
  //  ------------delete TPA--------------------
  const handleDelete = (id) => {
    CallAPI({
      url: `/tpa/${id}`,
      method: "delete",
      body: { id: id },
      onSuccess(res) {
        try {
          showSuccess(res.message || "TPA deleted");
          setVisible(false);
          fetchTPA();
        } catch (e) {
          console.error("onSuccess error:", e);
        }
      },
      onError(err) {
        showError(err.message || "unknown Error");
      },
    });
  };
  //   -------------handle Update------------------
  const handleUpdate = (values) => {
    CallAPI({
      url: `/tpa/${values?.id}`,
      method: "put",
      body: values,
      onSuccess(res) {
        try {
          showSuccess(res.message || "TPA Updated");
          setVisible(false);
          fetchTPA();
        } catch (e) {
          console.error("onSuccess Error", e);
        }
      },
      onError(err) {
        showError(err.message || "unknown error");
      },
    });
  };
  return (
    <React.Fragment>
      <div className="flex justify-between">
        <div>
          <CoustomHeading
            title="TPA"
            subtitle="Entries"
            count={data?.total_record}
          />
        </div>
        <div>
          <ShareButton
            label="CREATE TPA"
            icon="pi pi-plus"
            onClick={() => {
              setDialogMode("create");
              setVisible(true);
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
            setRows(e.rows);
            setPage(e.page);
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
              ? "Create TPA"
              : dialogMode === "edit"
              ? "Update TPA"
              : "Delete TPA"
          }
          showFooter={false}
          width={dialogMode === "delete" ? "50vw" : "70vw"}
        >
          {dialogMode === "create" && (
            <div>
              <Formik
                initialValues={TPAInitialValues}
                validationSchema={TPAValidationSchema}
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
                      label="Short Name"
                      name="short_name"
                      placeholder="Enter Short Name"
                    />
                    <ShareInput
                      label="License ID"
                      name="license_id"
                      placeholder="Enter License ID"
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
                <strong>Are You Sure You Want To Delete</strong>
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
          {dialogMode === "edit" && (
            <div>
              <Formik
                initialValues={selectedRow || TPAInitialValues}
                validationSchema={TPAValidationSchema}
                onSubmit={handleUpdate}
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
                      label="Short Name"
                      name="short_name"
                      placeholder="Enter Short Name"
                    />
                    <ShareInput
                      label="License ID"
                      name="license_id"
                      placeholder="Enter License ID"
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
        </ShareDialog>
      </div>
    </React.Fragment>
  );
}
