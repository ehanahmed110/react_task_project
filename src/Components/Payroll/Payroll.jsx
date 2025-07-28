import React from 'react'
import { CoustomHeading } from '../../Shared/CoustomHeading'
import { Employyes } from './Employyes'
import { Attendence } from './Attendence'
import { Leaves } from './Leaves'
import { Deductions } from './Deductions'
import { Allowence } from './Allowence'
import { Payruns } from './Payruns'
import { Payslips } from './Payslips'
import { ShareTabs } from '../../Shared/ShareTabs'

export function Payroll() {
    
  const tabs = [
    {label:"Employees",content:<Employyes/>},
    {label:"Attendence",content:<Attendence/>},
    {label:"Leave",content:<Leaves/>},
    {label:"Deduction",content:<Deductions/>},
    {label:"Allowances",content:<Allowence/>},
    {label:"Payruns",content:<Payruns/>},
    {label:"Payslips",content:<Payslips/>}
  ]
    return (
        <React.Fragment>
            <div>
                <CoustomHeading title='PAYROLL' />
            </div>

            <div>
                <ShareTabs tabs={tabs}/>
            </div>
        </React.Fragment>
    )
}
