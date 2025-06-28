import { Dialog } from "primereact/dialog";
import React from "react";
import { ShareButton } from "./ShareButton";

export function ShareDialog({
  visible,
  onHide,
  children,
  title,
  onSave,
  showFooter=true,
  customFooter = null,
  width = "30vw",
}) {
    const dialogFooter =(
        <div className="flex justify-end gap-2">
            <ShareButton label='cancel' icon='pi pi-times' onClick={onHide}/>
            <ShareButton label='save' icon='pi pi-check' onClick={onSave} autoFocus/>
        </div>
    )
  return (
    <React.Fragment>
      <div>
        <Dialog
          visible={visible}
          header={title}
          style={width}
          onHide={onHide}
          model
          className="custom-dialog rounded-xl"
          footer={showFooter ? (customFooter || defaultFooter) : null}
        >
          {children}
        </Dialog>
      </div>
    </React.Fragment>
  );
}
