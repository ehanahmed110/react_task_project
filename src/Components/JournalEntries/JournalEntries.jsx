import React, { useEffect, useState } from "react";
import { CoustomHeading } from "../../Shared/CoustomHeading";
import { useDispatch, useSelector } from "react-redux";
import { SearchInput } from "../../Shared/SearchInput";
import { ShareButton } from "../../Shared/ShareButton";
import { CoustomTable } from "../../Shared/CoustomTable";
import { FetchJournalData } from "../../Features/JournalSlice";
import { Actionutton } from "../../Shared/Actionutton";

export function JournalEntries() {
  const { journaldata, loading } = useSelector((state) => state.journal);
  const [rows, setRows] = useState(10)
  const [page, setPage] = useState(0)
  const dispatch = useDispatch();
  useEffect(() => {
  dispatch(FetchJournalData({ page: page + 1, per_page: rows }));
}, [dispatch, rows, page]);
  const data = journaldata?.data || [];
  const total_record = journaldata?.total_record || 0
  const actionTemplate = (rowData) => (
    <div className="flex gap-x-3">
      <Actionutton icon="pi pi-eye" />
      <Actionutton icon="pi pi-pencil" />
      <Actionutton icon="pi pi-trash" />
    </div>
  );
  const columns = [
    { header: "No", body: (rowData,Options)=> Options.rowIndex + 1 + page * rows  },
    { field: "date", header: "Transection Date" },
    { field: "transaction_number", header: "Transection Number" },
    { field: "created_by", header: "Credit By" },
    { field: "total_debit", header: "Total Debit" },
    { field: "total_credit", header: "Total Credit" },
    { field: "description", header: "Discripton" },
    { header: "Action", body: actionTemplate },
  ];
  return (
    <React.Fragment>
      <div className="md:flex justify-between mt-2">
        <div>
          <CoustomHeading
            title="journal entries"
            count={journaldata?.total_record || 0}
            subtitle="Entries"
          />
        </div>
        <div className=" md:flex gap-3">
          <div>
            <SearchInput placeholder="Search by Name or Number"/>
          </div>
          <div>
            <ShareButton label="Create Journal Entries" icon="pi pi-plus" />
          </div>
          <div>
            <ShareButton label="Apply filters" variant="transparent" />
          </div>
        </div>
      </div>
      <div>
        <CoustomTable
          data={data}
          columns={columns}
          paginator
          loading={loading}
          totalRecords={total_record}
          rows={rows}
          page={page}
          onPageChange={(e)=>{setRows(e.rows);
            setPage(e.page)
          }}
        />
      </div>
    </React.Fragment>
  );
}
