import React, { useEffect, useState } from "react";
import UseAPI from "../../Hooks/UseAPI";
import { CoustomHeading } from "../../Shared/CoustomHeading";
import { ShareButton } from "../../Shared/ShareButton";
import { CoustomTable } from "../../Shared/CoustomTable";
import { Actionutton } from "../../Shared/Actionutton";
import { Skeleton } from "primereact/skeleton";
import { ShareDialog } from "../../Shared/ShareDialog";
import { Form, Formik } from "formik";
import { ShareInput } from "../../Shared/ShareInput";
import {
  CostCenterInitialValues,
  CostCenterValidationSchema,
} from "../../Features/Configuration/CostCenterData";
import { showError, showSuccess } from "../../Shared/toast";

export function CostCenterComponent() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogMode, setDialogMode] = useState("");
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);

  const { data, loading, CallAPI } = UseAPI();
  const fetchCostCenter = () => {
    CallAPI({
      url: "/listCostcenter",
      method: "post",
      body: { page: page + 1, per_page: rows },
    });
  };
  useEffect(() => {
    fetchCostCenter();
  }, []);

  const GetData = Array.isArray(data?.data) ? data?.data : [];
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
    { header: "Description", field: "description" },
    { header: "Actions", body: actionTemplate },
  ];
  // ----------------submit form----------------
  const handleSubmit = (values) => {
    const payload = {
      ...values,
      business_id: 38,
      branch_id: 2,
    };
    CallAPI({
      url: "/costCenter",
      method: "post",
      body: payload,
      onSuccess: (res) => {
        try {
          showSuccess(res.message || "Cost center added");
          setVisible(false);
          fetchCostCenter();
        } catch (e) {
          console.error("onSuccess error:", e);
        }
      },
      onError(err) {
        showError(err.message || "unknown Error");
      },
    });
  };
  // -----------------Delte cost Center----------------
  const handleDelete = (id) => {
    CallAPI({
      url: `/delCostCenter/${id}`,
      method: "post",
      body: { id: id },
      onSuccess: (res) => {
        try {
          showSuccess(res.message || "Cost center Delete");
          setVisible(false);
          fetchCostCenter();
        } catch (err) {
          console.error("onSuccess error:", err);
        }
      },
      onError(err) {
        showError(err.message || "unknown Error");
      },
    });
  };
  // -------------------update --- Cost Center--------------
  const handleUpdate = (values) => {
    const payload = {
      name_en : values?.name_en,
      name_ar : values?.name_ar,
      description : values?.description,
      business_id: 38,
      branch_id: 2,
    };
    CallAPI({
      url: `/updateCostCenter/${selectedRow?.id}`,
      method: "post",
      body: payload,
      onSuccess: (res) => {
        try {
          showSuccess(res.message || "Cost center Update");
          setVisible(false);
          fetchCostCenter();
        } catch (err) {
          console.error("onSuccess error:", err);
        }
      },
      onError(err) {
        showError(err.message || "unknown Error");
      },
    });
  };
  return (
    <React.Fragment>
      <div className="flex justify-between">
        <div>
          <CoustomHeading
            title="Cost Centers"
            subtitle="Entries"
            count={data?.total_record}
          />
        </div>
        <div>
          <ShareButton
            label="CREATE COST CENTER"
            icon="pi pi-plus"
            onClick={() => {
              setDialogMode("create");
              setVisible("true");
            }}
          />
        </div>
      </div>

      <div>
        <CoustomTable
          data={GetData}
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
              ? "Create Cost Center"
              : dialogMode === "edit"
              ? "Update CosT Center"
              : "Delete Cost Center"
          }
          showFooter={false}
          width={dialogMode === "delete" ? "50vw" : "70vw"}
        >
          {dialogMode === "create" && (
            <div>
              <Formik
                initialValues={CostCenterInitialValues}
                validationSchema={CostCenterValidationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div className="grid md:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-3">
                    <ShareInput
                      label="Name"
                      placeholder="Enter Name"
                      name="name_en"
                    />
                    <ShareInput
                      label="Name(Arabic)"
                      placeholder="Enter Name (Arabic)"
                      name="name_ar"
                    />
                    <ShareInput
                      label="Description"
                      placeholder="Enter Description"
                      name="description"
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
                initialValues={selectedRow || CostCenterInitialValues}
                validationSchema={CostCenterValidationSchema}
                onSubmit={handleUpdate}
              >
                <Form>
                  <div className="grid md:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-3">
                    <ShareInput
                      label="Name"
                      placeholder="Enter Name"
                      name="name_en"
                    />
                    <ShareInput
                      label="Name(Arabic)"
                      placeholder="Enter Name (Arabic)"
                      name="name_ar"
                    />
                    <ShareInput
                      label="Description"
                      placeholder="Enter Description"
                      name="description"
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
