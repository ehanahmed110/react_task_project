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
            <ShareButton label='Cancel' icon='pi pi-times' onClick={onHide}/>
            <ShareButton label='Save' icon='pi pi-check' onClick={onSave} />
        </div>
    )
  return (
    <React.Fragment>
      <div>
        <Dialog
          visible={visible}
          header={title}
          style={{width}}
          onHide={onHide}
          modal
          className="custom-dialog rounded-xl"
          footer={showFooter ? (customFooter || dialogFooter) : null}
          pt={{
            header:{className:"!bg-black !text-white !px-2 !py-1"},
            headerTitle:{className:"!text-[14px]"},
            closeButtonIcon:{className:"!text-white"},
            closeButton:{className:"!border !border-black hover:!bg-transparent"},
            content: {
              className: "!overflow-y-auto !max-h-[70vh] !px-3",
            },
            root:{className:"!overflow-auto "}
          }}
        >
          {children}
        </Dialog>
      </div>
    </React.Fragment>
  );
}
