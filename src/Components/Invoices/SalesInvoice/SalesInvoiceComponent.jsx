import React from 'react'
import { CoustomHeading } from '../../../Shared/CoustomHeading'
import { SearchInput } from '../../../Shared/SearchInput'
import { ShareButton } from '../../../Shared/ShareButton'
import { ExportMenu } from '../../../Shared/ExportMenu'

export function SalesInvoiceComponent() {
    

    return (
        <React.Fragment>
            <div className='flex justify-between'>
                <div><CoustomHeading title='Sales invoices'/></div>
                <div className='flex justify-between gap-2'>
                    <div>
                        <SearchInput placeholder='Search By Invoice Number'/>
                    </div>
                    <div><ShareButton label='Create Sales Invoice' icon='pi pi-plus'/></div>
                    <div>
                        <ExportMenu />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
