import React, { useEffect, useState } from "react";
import { CoustomHeading } from "../../Shared/CoustomHeading";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteItemDate,
  FetchItemsData,
  SearchItemsData,
} from "../../Features/Configuration/ItemsSlice";
import { SearchInput } from "../../Shared/SearchInput";
import { ShareButton } from "../../Shared/ShareButton";
import { CoustomTable } from "../../Shared/CoustomTable";
import { Field, Form, Formik } from "formik";
import { Skeleton } from "primereact/skeleton";
import { Actionutton } from "../../Shared/Actionutton";
import { ShareDialog } from "../../Shared/ShareDialog";
import { showError, showSuccess } from "../../Shared/toast";
import { ShareInput } from "../../Shared/ShareInput";

export function ItemsComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogMode, setDialogMode] = useState("");
  const [visible, setVisible] = useState(false);
  const { items, loading, error } = useSelector((state) => state.items);
  const dispatch = useDispatch();

  //   ---------for get item list--------------
  useEffect(() => {
    dispatch(FetchItemsData({ page: page + 1, per_page: rows }));
  }, [dispatch, page, rows]);

  //   ---------for search item list--------------
  useEffect(() => {
    if (searchTerm) {
      const delayDebounceFn = setTimeout(() => {
        dispatch(
          SearchItemsData({
            page: page + 1,
            per_page: rows,
            search: searchTerm,
          })
        );
      }, 500);
      return () => clearTimeout(delayDebounceFn);
    }
    dispatch(FetchItemsData({ page: page + 1, per_page: rows }));
  }, [searchTerm]);

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
  const SAR = (rowData) => {
    return `${rowData.price} SAR`;
  };
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
    { field: "name_en", header: "Name" },
    { field: "item_code", header: "Item Code" },
    { body: SAR, header: "Unit Price " },
    { field: "item_type", header: "Item Type" },
    { body: actionTemplate, header: "Action" },
  ];
  const data = Array.isArray(items?.data) ? items?.data : [];
  const totalRecords = items?.total_record;
  //   -------------delete Operation------------------
  const handleDelete = () => {
    dispatch(DeleteItemDate(selectedRow?.ID))
      .unwrap()
      .then((res) => {
        showSuccess(res.message || "Item deleted");
        setVisible(false);
        dispatch(FetchItemsData({ page: page + 1, per_page: rows }));
      })
      .catch((err) => {
        showError(err.error || "Delete failed");
      });
  };
  return (
    <React.Fragment>
      <div className="flex justify-between">
        <div>
          <CoustomHeading
            title="ITEMS"
            count={items.total_record}
            subtitle="Entries"
          />
        </div>
        <div className="flex gap-x-2">
          <div>
            <SearchInput
              placeholder="Search by Name or Code"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <ShareButton
              icon="pi pi-plus"
              label="Create Items"
              onClick={() => {
                setVisible(true);
                setDialogMode("create");
              }}
            />
          </div>
        </div>
      </div>
      {/* ------------------data table----------------- */}
      <div>
        <CoustomTable
          data={data}
          columns={columns}
          loading={loading}
          paginator={true}
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
        {/* -------------dialog----------------- */}
        <ShareDialog
          visible={visible}
          onHide={() => setVisible(false)}
          title={
            dialogMode === "create"
              ? "Create Items"
              : dialogMode === "edit"
              ? "Update Items"
              : "Delete Items"
          }
          showFooter={false}
          width={dialogMode === "delete" ? "50vw" : "70vw"}
        >
          {dialogMode === "delete" && (
            <div>
              <p className="mb-2">Are you Sure You Want To Delete This Item</p>
              <p>
                <strong> ITEM Code is: {selectedRow?.item_code}</strong>
              </p>
              <div className="mt-4 flex justify-end gap-3">
                <div>
                  <ShareButton
                    label="Cancel"
                    onClick={() => setVisible(false)}
                  />
                </div>
                <div>
                  <ShareButton label="Delete" onClick={handleDelete} />
                </div>
              </div>
            </div>
          )}
          {dialogMode === "create" && (
            <div>
              <Formik>
                <Form>
                  <div>
                    <ShareInput label='Name' placeholder='Enter Name' name='name_en'/>
                    <ShareInput label='Name(Arabic)' placeholder='Enter Name(Aabic)' name='name_ar'/>
                    <ShareInput label='Item Code' placeholder='Enter Item Code' name='item_code'/>
                    <Field 
                    name
                    />
                  </div>




                  <div className="mt-4 flex justify-end gap-3">
                    <div>
                      <ShareButton
                        label="Cancel"
                        type='button'
                        onClick={() => setVisible(false)}
                      />
                    </div>
                    <div>
                      <ShareButton label="Delete" type='submit' />
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
