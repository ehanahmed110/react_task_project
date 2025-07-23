import React, { useEffect, useMemo, useState } from "react";
import { CoustomHeading } from "../../Shared/CoustomHeading";
import { useDispatch, useSelector } from "react-redux";
import {
  GetCostCenter,
  GetPaymentVoture,
} from "../../Features/Votures/PaymentVotureSlice";
import { ShareButton } from "../../Shared/ShareButton";
import { CoustomTable } from "../../Shared/CoustomTable";
import { Actionutton } from "../../Shared/Actionutton";
import { ShareDialog } from "../../Shared/ShareDialog";
import { Form, Formik } from "formik";

export function PaymentVotureComponent() {
  const [visible, setVisible] = useState(false);
  const [dialogMode, setDialogMode] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);
  const { payment, loading, costCenter } = useSelector(
    (state) => state.payment
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetPaymentVoture({ page: page + 1, per_page: rows }));
    dispatch(GetCostCenter());
  }, [dispatch, page, rows]);

  const data = Array.isArray(payment?.data) ? payment?.data : [];
  const costCenters = Array.isArray(costCenter?.data) ? costCenter?.data : [];
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
  //   ----------------for Cost Center Name ---------------------
  const costCenterMap = useMemo(() => {
    const map = {};
    costCenters.forEach((cc) => {
      map[cc.id] = cc.name_en;
    });
    return map;
  }, [costCenters]);
  // --------------------------table Column------------------
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
    { header: "Date", field: "date" },
    {
      header: "Cost Center",
      body: (rowData) => costCenterMap[rowData.cost_center_id] || "-",
    },
    { header: "Total Amount", field: "total_amount" },
    { header: "Action", body: actionTemplate },
  ];
  //   ----------Dialog Column--------------------
  const dialogColumn = [
    {
      header: "Cost Center",
      body: (rowData) => costCenterMap[rowData.cost_center_id] || "-",
    },
    { header: "Voucher Type", field: "voucher_type" },
    { header: "Update", field: "updated_at" },
    { header: "Create", field: "created_at" },
  ];
  return (
    <React.Fragment>
      <div className="flex justify-between">
        <div>
          <CoustomHeading
            title="Payment Voture"
            count={payment?.total_record}
            subtitle="Entries"
          />
        </div>
        <div>
          <ShareButton
            label="CREATE PAYMENT VOTURE"
            icon="pi pi-plus"
            onClick={() => {
              setDialogMode("create");
              setVisible(true);
            }}
          />
        </div>
      </div>
      {/* ----------Table ------------------ */}
      <div>
        <CoustomTable
          data={data}
          columns={column}
          loading={loading}
          paginator={true}
          paginatorTemplate
          rows={rows}
          page={page}
          totalRecords={payment?.total_record}
          onPageChange={(e) => {
            setRows(e.rows);
            setPage(e.page);
          }}
        />
      </div>
      {/* ----------------Dialog -------------------- */}
      <div>
        <ShareDialog
          visible={visible}
          onHide={() => setVisible(false)}
          title={
            dialogMode === "create"
              ? "Create payment Voture"
              : dialogMode === "edit"
              ? "Update Payment Voture"
              : dialogMode === "view"
              ? "View Payment Voture"
              : "Delete Payment Voture"
          }
          showFooter={false}
          width={
            dialogMode === "delete" || dialogMode === "view" ? "50vw" : "80vw"
          }
        >
          {dialogMode === "view" && (
            <div>
               <CoustomTable data={[selectedRow]} columns={dialogColumn}/>
          </div>
        )}
          {dialogMode === "create" && (
            <div>
              <Formik>
                <Form>
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
                <strong>Are You Sure You Want To Delete</strong>{" "}
              </p>
              <p></p>
              <div className="mt-4 flex justify-end gap-3">
                <div>
                  <ShareButton
                    label="Cancel"
                    type="button"
                    onClick={() => setVisible(false)}
                  />
                </div>
                <div>
                  <ShareButton label="Delete" />
                </div>
              </div>
            </div>
          )}
          {dialogMode === "edit" && (
            <div>
              <Formik>
                <Form>

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
