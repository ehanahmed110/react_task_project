import React from 'react'
import { ShareTabs } from '../../Shared/ShareTabs'
import { PatientVat } from './PatientVat'
import { CompanyVat } from './CompanyVat'

export function VatReport() {
    const tabs = [
        {label:"Patients VAT",content:<PatientVat/>},
        {label:"Companies VAT",content:<CompanyVat/>}
    ]

    return (
        <React.Fragment>
              <div>
                <ShareTabs tabs={tabs}/>
              </div>
        </React.Fragment>
    )
}
