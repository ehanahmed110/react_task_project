import { InputText } from "primereact/inputtext";
import React from "react";
import { ShareButton } from "../../Shared/ShareButton";
import { SearchInput } from "../../Shared/SearchInput";
import { Assets } from "./Assets";
import { Liability } from "./Liability";
import { Revenue } from "./Revenue";
import { Equity } from "./Equity";
import { Expense } from "./Expense";
import { useSelector } from "react-redux";
import { ShareTabs } from "../../Shared/ShareTabs";

export function ChartAccount() {
  const data = useSelector((state)=>state.data) 
  const tabs = [
     { label: "Asset", content: <Assets /> },
    { label: "Liability", content: <Liability /> },
    { label: "Revenue", content: <Revenue /> },
    { label: "Equity", content: <Equity /> },
    { label: "Expense", content: <Expense /> },
  ]
  return (
    <React.Fragment>
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-medium">
            Accounts({data?.length||5}<span className="text-[13px] italic"> Entries</span>)
          </h1>
        </div>
        <div className="flex gap-x-3">
          <SearchInput placeholder='search by code or name'/>
          <ShareButton label=" Create Account " icon="pi pi-plus" />
        </div>
      </div>
      {/* --------------------- */}
      <div className="mt-2">
        <div>
          <ShareTabs tabs={tabs}/>
        </div>
      </div>
    </React.Fragment>
  );
}
