import { ConfirmDialog } from 'primereact/confirmdialog'
import React from 'react'

export function ShareConfirm({visible,onHide,onConfirm,message}) {
    

    return (
        <React.Fragment>
            <div>
                <ConfirmDialog 
                visible={visible}
                onHide={onHide}
                message={message || "are you sure you want to proceed"}
                accept={onConfirm}
                reject={onHide}
                icon="pi pi-exclamation-triangle"
                header='Confirmation'
                className="custom-confirm-dialog"
                />
            </div>
        </React.Fragment>
    )
}
