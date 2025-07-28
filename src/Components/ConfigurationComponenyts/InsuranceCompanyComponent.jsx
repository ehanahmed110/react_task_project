import React, { useEffect, useState } from "react";
import { CoustomHeading } from "../../Shared/CoustomHeading";
import { ShareButton } from "../../Shared/ShareButton";
import UseAPI from "../../Hooks/UseAPI";
import { CoustomTable } from "../../Shared/CoustomTable";
import { Actionutton } from "../../Shared/Actionutton";

export function InsuranceCompanyComponent() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogMode, setDialogMode] = useState("");
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);
  const { data, loading, error, CallAPI } = UseAPI();
  useEffect(() => {
    CallAPI({
      url: "/listCompanies",
      method: "post",
      body: { page: 1, per_page: 10 },
    });
  }, []);

  const GetData = Array.isArray(data?.data) ? data?.data : [];
  console.log(GetData);
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
    { header: "TPA Name", field: "tpa_name_en" },
    { header: "License Number", field: "company_license" },
    { header: "City", field: "city_en" },
    { header: "Provider Code", field: "provider_code" },
    { header: "VAT Number", field: "vat_no" },
    { header: "CR Number", field: "cr_no" },
    { header: "Contact", field: "contact_info" },
    { header: "Address", field: "address" },
    { header: "Actions", body: actionTemplate },
  ];
  return (
    <React.Fragment>
      <div className="flex justify-between">
        <div>
          <CoustomHeading
            title="Insurance Companies"
            subtitle="Entries"
            count={data?.total_record}
          />
        </div>
        <div>
          <ShareButton label="CREATE COMPANY" icon="pi pi-plus" />
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
    </React.Fragment>
  );
}
