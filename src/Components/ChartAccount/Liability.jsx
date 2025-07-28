import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchData } from "../../Features/ChartAccountSlice";
import { Actionutton } from "../../Shared/Actionutton";
import { CustomTreeTable } from "../../Shared/CustomTreeTable";

export function Liability() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(FetchData({ account_type: "Liability" }));
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
    { field: "name_code_en", header: "Name" },
    { field: "type_en", header: "Type" },
    { field: "sub_type_en", header: "SubType" },
    { header: "Action", body:actionTemplate },
  ];

  return (
    <React.Fragment>
      <div>
        <CustomTreeTable data={datatype} columns={columns} loading={loading} rows={6}/>
      </div>
    </React.Fragment>
  );
}
