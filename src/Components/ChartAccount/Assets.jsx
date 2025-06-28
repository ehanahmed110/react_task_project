import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FetchData } from '../../Features/ChartAccountSlice';
import { CoustomTable } from '../../Shared/CoustomTable';
import { ShareButton } from '../../Shared/ShareButton';
import { Actionutton } from '../../Shared/Actionutton';

export function Assets() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(FetchData({ account_type: "Asset" }));
  }, [dispatch]);

  const assetData = data?.["Asset"];
  const datatype = Array.isArray(assetData?.data) ? assetData.data : [];
  console.log(datatype)
  const actionTemplate = (rowData) => (
    <div className="flex space-x-3 ">
      <Actionutton icon='pi pi-eye'/>
      <Actionutton icon='pi pi-pencil'/>
      <Actionutton icon='pi pi-trash' />
    </div>
  );
  const columns = [
    { field: "name_code_en", header: "Name" },
    { field: "type_en", header: "Type" },
    { field: "sub_type_en", header: "SubType" },
    { header: "Action", body: actionTemplate },
  ];

  return (
    <React.Fragment>
      <CoustomTable data={datatype} columns={columns} loading={loading} />
    </React.Fragment>
  );
}

