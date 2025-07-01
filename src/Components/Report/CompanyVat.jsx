import { Skeleton } from "primereact/skeleton";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VatReportData } from "../../Features/Reports/VatReport";
import { CoustomTable } from "../../Shared/CoustomTable";
import { SimpleInput } from "../../Shared/SimpleInput";
import { ShareButton } from "../../Shared/ShareButton";
import { ExportMenu } from "../../Shared/ExportMenu";
import { useReactToPrint } from "react-to-print";

export function CompanyVat() {
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);
  const { vatReport, loading } = useSelector((state) => state.vatReport);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      VatReportData({ start_date: "2025-05-30", end_date: "2025-06-30" })
    );
  }, [dispatch]);
  // const data = accountStatement?.data || []
  const data = Array.isArray(vatReport?.data) ? vatReport.data : [];
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
    { field: "", header: "Name" },
    { field: "", header: "Total VAT" },
  ];

  const componentRef = useRef();
  const HandlePrint = useReactToPrint({
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
            <ExportMenu onPdf={HandlePrint} />
          </div>
        </div>
        <div ref={componentRef}>
          <div>
            <h1 className="text-center text-xl font-medium capitalize text-black mb-4">
              Company VAT
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
