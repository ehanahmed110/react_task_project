import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { ShareButton } from "../../Shared/ShareButton";
import { SearchInput } from "../../Shared/SearchInput";
import { useSelector } from "react-redux";
import { ShareTabs } from "../../Shared/ShareTabs";
import { ShareDialog } from "../../Shared/ShareDialog";
import { CharttabComponent } from "./CharttabComponent";

export function ChartAccount() {
  const [searchTerm,setSearchTerm] = useState('')
  const data = useSelector((state)=>state.data) 
  const [visible,setVisible] = useState(false);
  const tabs = [
     { label: "Asset", content:<CharttabComponent account_type="Asset"  searchTerm={searchTerm}/>  },
    { label: "Liability", content:<CharttabComponent account_type="Liability" searchTerm={searchTerm}/>  },
    { label: "Revenue", content:<CharttabComponent account_type="Revenue" searchTerm={searchTerm}/>  },
    { label: "Equity", content:<CharttabComponent account_type="Equity" searchTerm={searchTerm}/>  },
    { label: "Expense", content:<CharttabComponent account_type="Expense" searchTerm={searchTerm}/>  },
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
          <SearchInput placeholder='search by code or name'
          value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
          />
          <ShareButton label=" Create Account " icon="pi pi-plus" onClick={()=>setVisible(true)}/>
        </div>
      </div>
      {/* --------------------- */}
      <div className="mt-2">
        <div>
          <ShareTabs tabs={tabs}/>
        </div>
      </div>
      <div>
        <ShareDialog 
        visible={visible}
        onHide={()=>setVisible(false)}
        title="Create Account"
        width="60vw"
        >
         
        </ShareDialog>
      </div>
    </React.Fragment>
  );
}
