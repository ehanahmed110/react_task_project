import React, { useEffect, useState } from "react";
import { SimpleInput } from "../../Shared/SimpleInput";
import { ExportMenu } from "../../Shared/ExportMenu";
import { ShareButton } from "../../Shared/ShareButton";
import { useDispatch, useSelector } from "react-redux";
import { AccountStatementData } from "../../Features/Reports/AccountStatement";
import { CoustomTable } from "../../Shared/CoustomTable";
import { Skeleton } from "primereact/skeleton";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export function AccountStatement() {
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);
  const { loading, accountStatement } = useSelector(
    (state) => state.accountStatement
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      AccountStatementData({
        start_date: "2025-05-30",
        end_date: "2025-06-30",
        account_id: null,
        page: 1,
        per_page: 20,
      })
    );
  }, [dispatch]);
  // const data = accountStatement?.data || []
  const data = Array.isArray(accountStatement?.data)
    ? accountStatement.data
    : [];
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
    { field: "", header: "Account" },
    { field: "", header: "Account Type" },
    { field: "", header: "Opening Balance" },
    { field: "", header: "Debit" },
    { field: "", header: "Credit" },
    { field: "", header: "Closing Balance" },
  ];
  const componentRef = useRef();
  const Handleprint = useReactToPrint({
    contentRef: componentRef,
  });
  return (
    <React.Fragment>
      <div>
        <div className="flex justify-between mb-2">
          <div className="flex gap-x-4">
            <div>
              <SimpleInput type="date" label="Start Date : " />
            </div>
            <div>
              <SimpleInput type="date" label="End Date : " />
            </div>
            <div>
              <ShareButton
                label="SUBMIT"
                className="!px-2 !py-[5px]"
                disabled
              />
            </div>
          </div>
          <div>
            <ExportMenu onPdf={Handleprint} />
          </div>
        </div>
        <div ref={componentRef}>
          <div>
            <h1 className="text-center text-xl font-medium capitalize text-black mb-4">
              Trial Balance
            </h1>
          </div>
          <div>
            <CoustomTable
              //data={data}
              value={Array.isArray(data) ? data : []}
              columns={columns}
              loading={loading}
              onPageChange={(e) => {
                setRows(e.rows);
                setPage(e.page);
              }}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
