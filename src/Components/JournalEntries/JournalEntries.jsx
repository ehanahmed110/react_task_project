import React, { useEffect, useState } from "react";
import { CoustomHeading } from "../../Shared/CoustomHeading";
import { useDispatch, useSelector } from "react-redux";
import { SearchInput } from "../../Shared/SearchInput";
import { ShareButton } from "../../Shared/ShareButton";
import { CoustomTable } from "../../Shared/CoustomTable";
import {
  DeleteJournalEntry,
  FetchJournalData,
} from "../../Features/JournalSlice";
import { Actionutton } from "../../Shared/Actionutton";
import { FilterSideBar } from "../../Shared/FilterSideBar";
import { ShareDialog } from "../../Shared/ShareDialog";
import { showError, showSuccess } from "../../Shared/toast";

export function JournalEntries() {
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0);
  const [visible, setVisible] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogMode, setDialogMode] = useState("");
  const [confirmDialog, setConfirmDialog] = useState(false);

  const { journaldata, loading } = useSelector((state) => state.journal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchJournalData({ page: page + 1, per_page: rows }));
  }, [dispatch, rows, page]);

  const data = journaldata?.data || [];
  const total_record = journaldata?.total_record || 0;
  const actionTemplate = (rowData) => (
    <div className="flex gap-x-3">
      <Actionutton
        icon="pi pi-eye"
        onClick={() => {
          setSelectedRow(rowData);
          setOpenDialog(true);
        }}
      />
      <Actionutton
        icon="pi pi-pencil"
        onClick={() => {
          setSelectedRow(rowData);
          setDialogMode("edit");
          setConfirmDialog(true);
        }}
      />
      <Actionutton
        icon="pi pi-trash"
        onClick={() => {
          setSelectedRow(rowData);
          setDialogMode("delete");
          setConfirmDialog(true);
        }}
      />
    </div>
  );
  // ---------For Search-----------------
  useEffect(() => {
    if (!journaldata?.data) return;
    const allData = journaldata?.data || [];
    const filtered = allData.filter((item) => {
      const searchLower = search.toLowerCase();
      return (
        item.transaction_number?.toLowerCase().includes(searchLower) ||
        item.created_by?.toLowerCase().includes(searchLower)
      );
    });
    setFilterData(filtered);
  }, [search, journaldata, openDialog]);
  // for table------------------
  const columns = [
    {
      header: "No",
      body: (rowData, Options) => Options.rowIndex + 1 + page * rows,
    },
    { field: "date", header: "Transection Date" },
    { field: "transaction_number", header: "Transection Number" },
    { field: "created_by", header: "Credit By" },
    { field: "total_debit", header: "Total Debit" },
    { field: "total_credit", header: "Total Credit" },
    { field: "description", header: "Discripton" },
    { header: "Action", body: actionTemplate },
  ];
  //for dialog------------------
  const dialogColumns = [
    { field: "description", header: "Account Name" },
    { field: "total_debit", header: "Debit Amount" },
    { field: "total_credit", header: "Credit Amount" },
  ];
  //for delete entry-----------------
  const handleDelete = () => {
    dispatch(DeleteJournalEntry(selectedRow?.id))
      .unwrap()
      .then((res) => {
        showSuccess(res.message || "Delete Successfully");
        setConfirmDialog(false);
        dispatch(FetchJournalData({ page: page + 1, per_page: rows }));
      })
      .catch((err) => {
        showError("Delete failed");
      });
  };
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
            <SearchInput
              placeholder="Search by Name or Number"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0); // search ke baad page reset
              }}
            />
          </div>
          <div>
            <ShareButton label="Create Journal Entries" icon="pi pi-plus" />
          </div>
          <div>
            <ShareButton
              label="Apply filters"
              variant="transparent"
              onClick={() => setVisible(true)}
            />
          </div>
        </div>
      </div>
      <div>
        <CoustomTable
          //value={data}
          data={filterData.slice(page * rows, page * rows + rows)}
          columns={columns}
          paginator
          loading={loading}
          //totalRecords={total_record}
          totalRecords={filterData.length}
          rows={rows}
          page={page}
          onPageChange={(e) => {
            setRows(e.rows);
            setPage(e.page);
          }}
        />
      </div>

      <div>
        <FilterSideBar visible={visible} onHide={() => setVisible(false)} />
      </div>
      {/* ------------for view details---------------- */}
      <div>
        <ShareDialog
          visible={openDialog}
          onHide={() => setOpenDialog(false)}
          title="Entries"
          showFooter={false}
          width="50vw"
        >
          <CoustomTable
            data={selectedRow ? [selectedRow] : []}
            columns={dialogColumns}
          />
        </ShareDialog>
      </div>
      {/* -----------for edit \ delete details------------------ */}
      <div>
        <ShareDialog
          visible={confirmDialog}
          onHide={() => setConfirmDialog(false)}
          title={dialogMode === "edit" ? "Update Entry" : "Delete Entry"}
          showFooter={false}
          width="50vw"
        >
          {dialogMode === "delete" && (
            <div>
              <p className="mb-2">Are you Sure You Want To Delete This Entry</p>
              <p>
                <strong>
                  {" "}
                  Transection Number: {selectedRow?.transaction_number}
                </strong>
              </p>
              <div className="mt-4 flex justify-end gap-3">
                <div>
                  <ShareButton
                    label="Cancel"
                    onClick={() => setConfirmDialog(false)}
                  />
                </div>
                <div>
                  <ShareButton label="Delete" onClick={() => handleDelete()} />
                </div>
              </div>
            </div>
          )}
        </ShareDialog>
      </div>
    </React.Fragment>
  );
}
