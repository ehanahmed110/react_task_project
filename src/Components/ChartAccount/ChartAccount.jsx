import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { ShareButton } from "../../Shared/ShareButton";
import { TabView, TabPanel } from "primereact/tabview";
import { Asset } from "./Data";
import { SearchInput } from "../../Shared/SearchInput";

export function ChartAccount() {
  const [activeIndex, setActiveIndex] = useState(0);
  // if(activeIndex === 0){
  //     return Asset();
  // }

  return (
    <React.Fragment>
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-medium">
            Accounts(5<span className="text-[13px] italic"> Entries</span>)
          </h1>
        </div>
        <div className="flex gap-x-3">
          <SearchInput 
          placeholder='search by code or name'
          />
          <ShareButton label=" Create Account " icon="pi pi-plus" />
        </div>
      </div>
      {/* --------------------- */}
      <div className="mt-2">
        <div>
          <TabView
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
            pt={{
              nav: {
                className:"!bg-gray-100 !py-2 !px-4 flex justify-between items-center !text-[13px] hover:!text-[#fab768]",
              },
              header: { className: "hover:!text-[#fab768]" },
            }}
          >
            <TabPanel
              header="Asset"
              pt={{
                headeraction: {
                  className:"!bg-transparent !py-2 !px-25 !border-transparent hover:!text-[#fab768]",
                },
              }}
            />
            <TabPanel
              header="Liability"
              pt={{
                headeraction: {
                  className:"!bg-transparent !py-2 !px-25 !border-transparent hover:!text-[#fab768]",
                },
              }}
            />
            <TabPanel
              header="Revenue"
              pt={{
                headeraction: {
                  className:"!bg-transparent !py-2 !px-25 !border-transparent hover:!text-[#fab768]",
                },
              }}
            />
            <TabPanel
              header="Equity"
              pt={{
                headeraction: {
                  className:"!bg-transparent !py-2 !px-25 !border-transparent hover:!text-[#fab768]",
                },
              }}
            />
            <TabPanel
              header="Expense"
              pt={{
                headeraction: {
                  className:"!bg-transparent !py-2 !px-25 !border-transparent hover:!text-[#fab768]",
                },
              }}
            />
          </TabView>
        </div>
      </div>
    </React.Fragment>
  );
}
