import React from 'react'
import { CoustomHeading } from "../../Shared/CoustomHeading";
import { BalanceSheet } from './BalanceSheet';
import { CashFlow } from './CashFlow';
import { IncomeStatement } from './IncomeStatement';
import { AccountStatement } from './AccountStatement';
import { Ledgar } from './Ledgar';
import { VatReport } from './VatReport';
import { VatReturnReport } from './VatReturnReport';
import { ShareTabs } from '../../Shared/ShareTabs';
import { TrialBalance } from './TrialBalance';

export function Report() {
  const tabs = [
    {label:"Balance Sheet",content:<BalanceSheet/>},
    {label:"Cash Flow",content:<CashFlow/>},
    {label:"Income Statemnt",content:<IncomeStatement/>},
    {label:"Account Statement",content:<AccountStatement/>},
    {label:"Legdar",content:<Ledgar/>},
    {label:"Trial Balance",content:<TrialBalance/>},
    {label:"VAT Report",content:<VatReport/>},
    {label:"VAT Return Report",content:<VatReturnReport/>},
  ]   

    return (
        <React.Fragment>
            <div>
                <CoustomHeading title='REPORTS'/>
            </div>
            <div>
                <ShareTabs tabs={tabs} />
            </div>
        </React.Fragment>
    )
}
