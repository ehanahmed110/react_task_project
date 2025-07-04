import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardPage } from "../Pages/DashboardPage";
import { CoustomTable } from "../Shared/CoustomTable";
import { ChartsOfAccountsPage } from "../Pages/ChartsOfAccountsPage";
import { JournalEntriesPage } from "../Pages/JournalEntriesPage";
import { PayrollPage } from "../Pages/PayrollPage";
import { ReportsPage } from "../Pages/ReportsPage";
import { SalesInvoicePage } from "../Pages/Invoice/SalesInvoicePage";
import { CompanyInvoicePage } from "../Pages/Invoice/CompanyInvoicePage";
import { CreditInvoicePage } from "../Pages/Invoice/CreditInvoicePage";
import { CreditCompanyInvoicePage } from "../Pages/Invoice/CreditCompanyInvoicePage";
import { InsuranceClaimIncoicePage } from "../Pages/Invoice/InsuranceClaimIncoicePage";
import { ItemsPage } from "../Pages/Configuration/ItemsPage";
import { CoustomerPage } from "../Pages/Configuration/CoustomerPage";
import { InsuranceCompanyPage } from "../Pages/Configuration/InsuranceCompanyPage";
import { BranchesPage } from "../Pages/Configuration/BranchesPage";
import { CostCenterPage } from "../Pages/Configuration/CostCenterPage";
import { VendorPage } from "../Pages/Purchases/VendorPage";
import { PurchasesEntryPage } from "../Pages/Purchases/PurchasesEntryPage";
import { PaymentVoucherPage } from "../Pages/Voucher/PaymentVoucherPage";
import { ReceptVoucherPage } from "../Pages/Voucher/ReceptVoucherPage";
import { Layout } from "../Layouts/Layout";
import { CreateEmployeeComponent } from "../Components/Payroll/CreateEmployeeComponent";

export function ProtectedRouter() {
  return (
    <React.Fragment>
      <Layout>
      <Routes>
        
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/coustom" element={<CoustomTable />} />
        {/* <Route path="/navbar" element={<Navbar />} /> */}
        <Route path="/chart-account" element={<ChartsOfAccountsPage/>}/>
        <Route path="/journal-entries" element={<JournalEntriesPage/>} />
        <Route path="/payroll" element={<PayrollPage/>}/>
        <Route path="/createemployee" element={<CreateEmployeeComponent/>}/>
        <Route path="/report" element={<ReportsPage/>}/>

        <Route path="/invoice/sales-invoice" element={<SalesInvoicePage/>}/>
        <Route path="/invoice/company-invoice" element={<CompanyInvoicePage/>}/>
        <Route path="/invoice/credit-invoice" element={<CreditInvoicePage/>}/>
        <Route path="/invoice/credit-company-invoice" element={<CreditCompanyInvoicePage/>} />
        <Route path="invoice/insurance-claim-invoice"element={<InsuranceClaimIncoicePage/>}/>

        <Route path="configuration/items" element={<ItemsPage/>}/>
        <Route path="configuration/coustomers" element={<CoustomerPage/>}/>
        <Route path="configuration/insurance-company" element={<InsuranceCompanyPage/>}/>
        <Route path="configuration/branch" element={<BranchesPage/>}/>
        <Route path="configuration/cost-center" element={<CostCenterPage/>}/>
        <Route path="configuration/tpa" element={<ItemsPage/>}/>
        
        <Route path="purchases/vendor" element={<VendorPage/>}/>
        <Route path="/purchase/Purchase-entry" element={<PurchasesEntryPage/>}/>

        <Route path="/voucher/payment-voucher" element={<PaymentVoucherPage/>}/>
        <Route path="/voucher/recept-voucher" element={<ReceptVoucherPage/>}/>
        <Route path="*" element={<Navigate to="/dashboard" />} />
       
      </Routes>
       </Layout>
    </React.Fragment>
  );
}
