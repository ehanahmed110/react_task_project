import React from "react";
import { SalesInvoiceComponent } from "../../Components/Invoices/SalesInvoice/SalesInvoiceComponent";

export function SalesInvoicePage() {
  return (
    <React.Fragment>
      <div className="px-4 py-4">
        <div>
          <SalesInvoiceComponent />
        </div>
      </div>
    </React.Fragment>
  );
}
