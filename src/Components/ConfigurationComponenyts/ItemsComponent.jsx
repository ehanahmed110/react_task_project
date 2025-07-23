import React, { useEffect, useState } from "react";
import { CoustomHeading } from "../../Shared/CoustomHeading";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateItemData,
  DeleteItemDate,
  FetchItemsData,
  SearchItemsData,
  UpdateItemData,
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
import { CustomDropDown } from "../../Shared/CustomDropDown";
import { GetCompaniesData } from "../../Features/Configuration/GetCompanySlice";
import {
  ItemForminitialValues,
  ItemFormvalidationSchema,
} from "../../Features/Configuration/ItemFormdata";

export function ItemsComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogMode, setDialogMode] = useState("");
  const [visible, setVisible] = useState(false);
  const { items, loading } = useSelector((state) => state.items);
  const { getCompany } = useSelector((state) => state.getCompany);
  const dispatch = useDispatch();

  //   ---------for get item list--------------
  useEffect(() => {
    dispatch(FetchItemsData({ page: page + 1, per_page: rows }));
  }, [dispatch, page, rows]);
  //   ---------for search item list--------------
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm && searchTerm.trim() !== "") {
        dispatch(
          SearchItemsData({
            page: page + 1,
            per_page: rows,
            search: searchTerm,
          })
        );
      } else {
        dispatch(FetchItemsData({ page: page + 1, per_page: rows }));
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const actionTemplate = (rowData) => (
    <div className="flex gap-x-3">
      <Actionutton
        icon="pi pi-pencil"
        onClick={() => {
          setVisible(true);
          dispatch(GetCompaniesData());
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
  // ----------------DropDownData---------------------
  const payerName =
    getCompany?.data?.map((company) => ({
      label: company.name_en,
      value: company.id,
      branch_id: company.branch_id,
      business_id: company.business_id,
    })) || [];

  const ItemType = [
    { label: "Services", value: "Services" },
    { label: "Goods", value: "Goods" },
  ];
  // -------------Create Item-------------------
  const handleSubmit = (values) => {
    const Payload = {
      ...values,
      price: Number(values.price),
      factor: Number(values.factor),
      tax: Number(values.tax),
      discount: Number(values.discount),
      payer_id: Number(values.payer_id),
      branch_id: Number(values.branch_id),
      business_id: Number(values.business_id),
    };
    dispatch(CreateItemData(Payload))
      .unwrap()
      .then((res) => {
        showSuccess(res.message || "Items Created");
        setVisible(false);
        dispatch(FetchItemsData({ page: page + 1, per_page: rows }));
      })
      .catch((err) => {
        console.error("Create Error:", err);
        showError(err.message);
      });
  };
  // =---------------handleUpdate------------------------
  const handleUpdate = (values) => {
    const Payload = {
      ...values,
      price: Number(values.price),
      tax: Number(values.tax),
      factor: Number(values.factor),
      discount: Number(values.discount),
      payer_id: Number(values.payer_id),
      branch_id: Number(values.branch_id),
      business_id: Number(values.business_id),
      ID: selectedRow?.ID,
    };
    dispatch(UpdateItemData(Payload))
      .unwrap()
      .then((res) => {
        setVisible(false);
        showSuccess(res.message || "Items Updated");
        dispatch(FetchItemsData({ page: page + 1, per_page: rows }));
      })
      .catch((err) => {
        console.error("Create Error:", err);
        showError(err.message);
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
                dispatch(GetCompaniesData());
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
          width={dialogMode === "delete" ? "50vw" : "80vw"}
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
              <Formik
                initialValues={ItemForminitialValues}
                validationSchema={ItemFormvalidationSchema}
                onSubmit={handleSubmit}
              >
                {(props) => (
                  <Form>
                    <div className="grid md:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-3">
                      <ShareInput
                        label="Name"
                        placeholder="Enter Name"
                        name="name_en"
                      />
                      <ShareInput
                        label="Name(Arabic)"
                        placeholder="Enter Name(Aabic)"
                        name="name_ar"
                      />
                      <ShareInput
                        label="Item Code"
                        placeholder="Enter Item Code"
                        name="item_code"
                      />
                      <Field
                        name="payer_id"
                        placeholder="Payer"
                        label="payer"
                        component={CustomDropDown}
                        optionLabel="label"
                        options={payerName}
                        onChange={(e, form) => {
                          const selected = payerName.find(
                            (p) => p.value === e.value
                          );
                          console.log("Matched Payer:", selected);
                          form.setFieldValue("payer_id", e.value);
                          form.setFieldValue(
                            "branch_id",
                            selected?.branch_id || ""
                          );
                          form.setFieldValue(
                            "business_id",
                            selected?.business_id || ""
                          );
                        }}
                      />
                      <Field
                        name="item_type"
                        placeholder="Select Item Type"
                        label="Item Type"
                        component={CustomDropDown}
                        optionLabel="label"
                        options={ItemType}
                      />
                      <ShareInput
                        label="Effective Date"
                        type="date"
                        name="effective_date"
                      />
                      <ShareInput
                        label="Unit Price"
                        placeholder="Enter Price"
                        name="price"
                      />
                      <ShareInput
                        label="Factor"
                        placeholder="Enter Factor"
                        name="factor"
                      />
                      <ShareInput
                        label="Tax"
                        placeholder="Enter Tax"
                        name="tax"
                      />
                      <ShareInput
                        label="Discount"
                        placeholder="Enter Discount"
                        name="discount"
                      />
                      <ShareInput
                        label="Non Standered Code"
                        placeholder="Enter Non Standered Code"
                        name="non_standard_code"
                      />
                      <ShareInput
                        label="Non standered Description"
                        placeholder="Enter Non Standered Discription"
                        name="non_standard_description"
                      />
                      <Field type="hidden" name="branch_id" />
                      <Field type="hidden" name="business_id" />
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
                )}
              </Formik>
            </div>
          )}
          {dialogMode === "edit" && (
            <div>
              <Formik
                initialValues={
                  selectedRow || ItemForminitialValues
                }
                validationSchema={ItemFormvalidationSchema}
                onSubmit={handleUpdate}
              >
                {(props) => (
                  <Form>
                    <div className="grid md:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-3">
                      <ShareInput
                        label="Name"
                        placeholder="Enter Name"
                        name="name_en"
                      />
                      <ShareInput
                        label="Name(Arabic)"
                        placeholder="Enter Name(Aabic)"
                        name="name_ar"
                      />
                      <ShareInput
                        label="Item Code"
                        placeholder="Enter Item Code"
                        name="item_code"
                      />
                      <Field
                        name="payer_id"
                        placeholder="Payer"
                        label="payer"
                        component={CustomDropDown}
                        optionLabel="label"
                        options={payerName}
                        onChange={(e, form) => {
                          const selected = payerName.find(
                            (p) => p.value === e.value
                          );
                          console.log("Matched Payer:", selected);
                          form.setFieldValue("payer_id", e.value);
                          form.setFieldValue(
                            "branch_id",
                            selected?.branch_id || ""
                          );
                          form.setFieldValue(
                            "business_id",
                            selected?.business_id || ""
                          );
                        }}
                      />
                      <Field
                        name="item_type"
                        placeholder="Select Item Type"
                        label="Item Type"
                        component={CustomDropDown}
                        optionLabel="label"
                        options={ItemType}
                      />
                      <ShareInput
                        label="Effective Date"
                        type="date"
                        name="effective_date"
                      />
                      <ShareInput
                        label="Unit Price"
                        placeholder="Enter Price"
                        name="price"
                      />
                      <ShareInput
                        label="Factor"
                        placeholder="Enter Factor"
                        name="factor"
                      />
                      <ShareInput
                        label="Tax"
                        placeholder="Enter Tax"
                        name="tax"
                      />
                      <ShareInput
                        label="Discount"
                        placeholder="Enter Discount"
                        name="discount"
                      />
                      <ShareInput
                        label="Non Standered Code"
                        placeholder="Enter Non Standered Code"
                        name="non_standard_code"
                      />
                      <ShareInput
                        label="Non standered Description"
                        placeholder="Enter Non Standered Discription"
                        name="non_standard_description"
                      />
                      <Field type="hidden" name="branch_id" />
                      <Field type="hidden" name="business_id" />
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
                )}
              </Formik>
            </div>
          )}
        </ShareDialog>
      </div>
    </React.Fragment>
  );
}
