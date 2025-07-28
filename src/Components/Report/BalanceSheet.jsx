import React, { useEffect, useRef } from "react";
import { CoustomHeading } from "../../Shared/CoustomHeading";
import { CoustomTable } from "../../Shared/CoustomTable";
import { useDispatch, useSelector } from "react-redux";
import { FetchBalanceData } from "../../Features/Reports/BalanceSheet";
import {useReactToPrint} from 'react-to-print';

import { ExportMenu } from "../../Shared/ExportMenu";
export function BalanceSheet() {

  const { assets, equity, liabilities, loading } = useSelector(
    (state) => state.balance
  );
  const asset = assets?.accounts || []
  const totalAsset = assets?.total || 0
  const equities = equity?.accounts || []
  const totalEquity = equity?.total || 0
  const liability = liabilities?.accounts || []
  const totalLibility = liabilities?.total || 0
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchBalanceData({ page: 1, per_page: 10 }));
  }, [dispatch]);
  const coloumns = [
    {  header: "Name", body:(row)=> row.data?.name_en },
    {  header: "Balance", body:(row)=> row.data?.balance },
  ];
  //  ---------- for export print or excel;
   const componentRef = useRef()
   const Handleprint = useReactToPrint({
       contentRef : componentRef
   })
   const ExcelPrint = ()=>{

   }
  return (
    <React.Fragment>
      <div ref={componentRef}>
      <div className="flex justify-between" >
        <div>
          <CoustomHeading title="1 - Assets" />
        </div>
        <ExportMenu onExcel={ExcelPrint} onPdf={Handleprint}/>
      </div>
      {/* ---------------- */}
      <div>
        <CoustomTable data={asset} columns={coloumns} loading={loading} />
      </div>
       <div className="mb-2 mt-4 text-sm font-semibold text-gray-600 flex justify-end">
         <h1 className="text-[16px]"> Assets Total:{totalAsset}</h1>
        </div>
        {/* ----------------------- */}
        
        <div>
          <CoustomHeading title="2 - Equity" />
        </div>
        <div>
            <CoustomTable data={equities} columns={coloumns} loading={loading} />
        </div>
         <div className="mb-2 mt-4 text-sm font-semibold text-gray-600 flex justify-end">
         <h1 className="text-[16px]"> Equity Total:{totalEquity}</h1>
        </div>
        {/* ---------------------- */}
         <div>
          <CoustomHeading title="3 - Liabilities" />
        </div>
        <div>
            <CoustomTable data={liability} columns={coloumns} loading={loading} />
        </div>
         <div className="mb-2 mt-4 text-sm font-semibold text-gray-600 flex justify-end">
         <h1 className="text-[16px]"> liabilities Total:{totalLibility}</h1>
        </div>
        </div>
    </React.Fragment>
  );
}
