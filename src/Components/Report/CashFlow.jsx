import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchCashFlow } from "../../Features/Reports/CashFlow";
import { ShareButton } from "../../Shared/ShareButton";
import { SimpleInput } from "../../Shared/SimpleInput";
import { ExportMenu } from "../../Shared/ExportMenu";
import { useReactToPrint } from "react-to-print";

export function CashFlow() {
    const { cashFlow } = useSelector((state) => state.cashFlow);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            FetchCashFlow({ start_date: "2025-05-30", end_date: "2025-06-30" })
        );
    }, [dispatch]);
    const data = cashFlow || [];
    const componentRef = useRef()
    const HandlePrint = useReactToPrint({
        contentRef:componentRef
    })
    return (
        <React.Fragment>
            <div>
                <div className="flex justify-between mb-2">
                    <div className="flex gap-x-4">
                        <div><SimpleInput type='date' label='Start Date : '/></div>
                        <div><SimpleInput type='date' label='End Date : '/></div>
                        <div><ShareButton label='SUBMIT' className="!px-2 !py-[5px]"/></div>
                    </div>
                    <div>
                        <ExportMenu onPdf={HandlePrint}/>
                    </div>
                </div>
                <div ref={componentRef}>
                <div className="shadow rounded-lg mb-4">
                    <div className="bg-black px-2 py-1 rounded-t-lg">
                        <h1 className="font-medium text-white">Cash Flow</h1>
                    </div>
                    <div className="py-4 px-2 text-[14px] text-black space-y-2">
                        <div className="flex justify-between">
                                <span>Cash Inflow</span>
                                <span>{data.cash_inflows}</span>
                        </div>
                        <div className="flex justify-between">
                                <span>Cash Outflow</span>
                                <span>{data.cash_outflows}</span>
                        </div>
                        <div className="flex justify-between">
                                <span>Net Cash Flow</span>
                                <span>{data.net_cash_flow}</span>
                        </div>
                    </div>
                </div>

                <div className="shadow rounded-lg mb-4">
                    <div className="bg-black px-2 py-1 rounded-t-lg">
                        <h1 className="font-medium text-white">Bank Transfer Flow</h1>
                    </div>
                    <div className="py-4 px-2 text-[14px] text-black space-y-2">
                        <div className="flex justify-between">
                                <span>Cash Inflow</span>
                                <span>{data.bank_inflows}</span>
                        </div>
                        <div className="flex justify-between">
                                <span>Cash Outflow</span>
                                <span>{data.bank_outflows}</span>
                        </div>
                        <div className="flex justify-between">
                                <span>Net Cash Flow</span>
                                <span>{data.net_bank_flow}</span>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </React.Fragment>
    );
}
