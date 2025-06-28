import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchData } from "../../Features/ChartAccountSlice";
import { CoustomTable } from "../../Shared/CoustomTable";
import { ShareButton } from "../../Shared/ShareButton";
import { Actionutton } from "../../Shared/Actionutton";

export function Equity() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(FetchData({ account_type: "Equity" }));
  }, [dispatch]);
 const assetData = data?.["Asset"];
  const datatype = Array.isArray(assetData?.data) ? assetData.data : [];

  const actionTemplate = (rowData) => (
    <div className="flex gap-x-3">
      <Actionutton icon='pi pi-eye'/>
      <Actionutton icon='pi pi-pencil'/>
      <Actionutton icon='pi pi-trash'/>
    </div>
  );
  const columns = [
    { field: "data.name_code_en", header: "Name" },
    { field: "data.type_en", header: "Type" },
    { field: "data.sub_type_en", header: "SubType" },
    { header: "data.Action",body:actionTemplate },
  ];

  return (
    <React.Fragment>
      <div>
        <CoustomTable data={datatype} columns={columns} loading={loading} />
      </div>
    </React.Fragment>
  );
}
