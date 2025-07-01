import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TrialBalanceData } from '../../Features/Reports/TrailBalance'
import { SimpleInput } from '../../Shared/SimpleInput'
import { ShareButton } from '../../Shared/ShareButton'
import { ExportMenu } from '../../Shared/ExportMenu'
import { CoustomTable } from '../../Shared/CoustomTable'
import { useReactToPrint } from 'react-to-print'

export function TrialBalance() {
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10)
  const { trialBalance, loading } = useSelector((state) => state.trialBalance)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(TrialBalanceData({ start_date: "2025-05-30", end_date: "2025-06-30", page: 1, per_page: 20 }))
  }, [dispatch])
  const data = trialBalance?.data || []
  const accountTemplate = (rowData) => (
    <div className='flex'>
      <div>{rowData.account_code}-</div>
      <div>{rowData.account_name}</div>
    </div>
  )
  const creditTemplate = (rowData) => (
    <div>{rowData.movement} SAR</div>
  )
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
    { header: "Account", body: accountTemplate },
    { field: "account_type", header: "Account Type" },
    { field: "opening_balance", header: "Opening Balance" },
    { body: creditTemplate, header: "Debit" },
    { body: creditTemplate, header: "Credit" },
    { field: "closing_balance", header: "Closing Balance" },
  ]

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
          <div>
            <h1 className='text-center text-xl font-medium capitalize text-black mb-4'>Trial Balance</h1>
          </div>
          <div>
            <CoustomTable data={data} columns={columns} loading={loading}
              onPageChange={(e) => {
                setRows(e.rows);
                setPage(e.page);
              }}
            />
          </div>
        </div>

      </div>
    </React.Fragment>
  )
}
