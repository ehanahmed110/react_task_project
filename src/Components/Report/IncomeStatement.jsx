import React, { useEffect, useRef } from "react";
import { SimpleInput } from "../../Shared/SimpleInput";
import { ExportMenu } from "../../Shared/ExportMenu";
import { ShareButton } from "../../Shared/ShareButton";
import { useDispatch, useSelector } from "react-redux";
import { IncomeData } from "../../Features/Reports/IncomeStatement";
import { useReactToPrint } from "react-to-print";

export function IncomeStatement() {
  const { income } = useSelector((state) => state.income)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(IncomeData({ start_date: "2025-05-30", end_date: "2025-06-30" }))
  }, [dispatch])
  const data = income || []
  const componentRef = useRef()
  const HandlePrint = useReactToPrint({
    contentRef: componentRef
  })
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
              <ShareButton label="SUBMIT" className="!px-2 !py-[5px]" />
            </div>
          </div>
          <div>
            <ExportMenu onPdf={HandlePrint} />
          </div>
        </div>
        <div ref={componentRef}>
          <div className="shadow rounded-lg mb-4" >
            <div className="bg-black px-2 py-1 rounded-t-lg">
              <h1 className="font-medium text-white">Income Statement</h1>
            </div>
            <div className="py-4 px-2 text-[14px] text-black space-y-2">
              <div className="flex justify-between">
                <span>Expenses</span>
                <span>{data.expenses} SAR</span>
              </div>
              <div className="flex justify-between">
                <span>revenue</span>
                <span>{data.revenue} SAR</span>
              </div>
              <div className="flex justify-between">
                <span>Income</span>
                <span>{data.net_income} SAR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
