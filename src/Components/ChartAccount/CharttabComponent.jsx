import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteAccountData, FetchData } from "../../Features/ChartAccountSlice";
import { Actionutton } from "../../Shared/Actionutton";
import { CustomTreeTable } from "../../Shared/CustomTreeTable";
import { ShareDialog } from "../../Shared/ShareDialog";
import { CoustomTable } from "../../Shared/CoustomTable";
import { ShareButton } from "../../Shared/ShareButton";
import { showError } from "../../Shared/toast";

export function CharttabComponent({ account_type,searchTerm }) {
  const [visible, setVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogMode, setDialogMode] = useState("");
  const { data, loading } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchData({ account_type }));
  }, [dispatch, account_type]);

  const tabData = data?.[account_type] || [];
  const dataType = Array.isArray(tabData?.data) ? tabData?.data : [];

  function cleanTreeChildren(nodes) {
    if (!Array.isArray(nodes)) return [];

    return nodes.map((node) => {
      const cleanedNode = {
        ...node,
        children: Array.isArray(node.children)
          ? cleanTreeChildren(node.children)
          : [], // ← Fix here
      };
      return cleanedNode;
    });
  }
  const cleanedData = cleanTreeChildren(dataType);

  //---------for search-----------

  const filterData = cleanedData.filter((item)=>{
    const name = item.data?.name_code_en?.toLowerCase() || "";
    const type = item.data?.type_en.toLowerCase() || "";
    return name.includes(searchTerm.toLowerCase()) || type.includes(searchTerm.toLowerCase())
  })
  const actionTemplate = (rowData) => (
    <div className="flex space-x-3">
      <Actionutton
        icon="pi pi-eye"
        onClick={() => {
          setVisible(true);
          setSelectedRow(rowData);
          setDialogMode("view");
        }}
      />
      <Actionutton
        icon="pi pi-pencil"
        onClick={() => {
          setVisible(true);
          setSelectedRow(rowData);
          setDialogMode("edit");
        }}
      />
      <Actionutton
        icon="pi pi-trash"
        onClick={() => {
          setVisible(true);
          setSelectedRow(rowData);
          setDialogMode("delete");
        }}
      />
    </div>
  );

  const columns = [
    { field: "name_code_en", header: "Name" },
    { field: "type_en", header: "Type" },
    { field: "sub_type_en", header: "SubType" },
    { header: "Action", body: actionTemplate },
  ];
  //   ------------ dialog colomns for detais---------------
  const DialogColunns = [
    { field: "name_en", header: "Name" },
    { field: "type_en", header: "Type" },
    { field: "sub_type_en", header: "Sub Type" },
    { field: "balance", header: "Balance" },
    { field: "", header: "Descripton" },
  ];
  //---------------for delete account--------------
   const handleDelete = () =>{
    dispatch(DeleteAccountData(selectedRow?.id))
      .unwrap()
          .then((res) => {
            showSuccess(res.message || "Delete Successfully");
            setVisible(false);
            dispatch(FetchData({ account_type }));
          })
          .catch((err) => {
            showError("Delete failed");
          });
   }

  // ---for upate acoount-----------------
  const handleUpdate = () =>{

  }
  return (
    <React.Fragment>
      <div>
        <CustomTreeTable
          data={filterData}
          columns={columns}
          loading={loading}
          rows={6}
        />
      </div>
      <div>
        <ShareDialog
          visible={visible}
          onHide={() => setVisible(false)}
          title={
            dialogMode === "view"
              ? "Account Detail"
              : dialogMode === "edit"
              ? "Account Update"
              : "Account Delete"
          }
          showFooter={false}
          width="50vw"
        >
          {dialogMode === "view" && (
            <div>
              <CoustomTable
                data={selectedRow ? [selectedRow?.data] : []}
                columns={DialogColunns}
              />
            </div>
          )}
          {dialogMode === "edit" && (
            <div>


              <div className="mt-4 flex justify-end gap-3">
                <div>
                  <ShareButton
                    label="Cancel"
                    onClick={() => setVisible(false)}
                  />
                </div>
                <div>
                  <ShareButton label="Update" onClick={() => handleUpdate()} />
                </div>
              </div>
            </div>
          )}
          {dialogMode === "delete" && (
            <div>
                <p className="mb-2 font-bold">Are You Sure You Want To Delete This Account</p>
              <div className="mt-4 flex justify-end gap-3">
                <div>
                  <ShareButton
                    label="Cancel"
                    onClick={() => setVisible(false)}
                  />
                </div>
                <div>
                  <ShareButton label="Delete" onClick={() => handleDelete()} />
                </div>
              </div>
            </div>
          )}
        </ShareDialog>
      </div>
    </React.Fragment>
  );
}
