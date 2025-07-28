import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DashboardData } from "../../Features/DashboardThunk";

export function Cards() {
  const dashboard = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      DashboardData({ start_date: "2025-05-30", end_date: "2025-06-30" })
    );
  }, [dispatch]);
  const stats = dashboard?.stats || 0;
  const data = [
    {
      id: 1,
      title: "Total Sales",
      sar: `${stats.totalSales || 0} SAR`,
      icon: "pi pi-shopping-cart",
    },
    {
      id: 2,
      title: "Total Purchase",
      sar: `${stats.totalPurchase || 0} SAR`,
      icon: "pi pi-cart-plus",
    },
    {
      id: 3,
      title: "Bank Transfer Flow",
      sar: `${stats.bankTransfer || 0} SAR`,
      icon: "pi pi-credit-card",
    },
    {
      id: 4,
      title: "Cash Inflow",
      sar: `${stats.cashInflow || 0} SAR`,
      icon: "pi pi-wallet",
    },
  ];
  // const data = [
  //   {
  //     id: 1,
  //     title: "Total Sales",
  //     sar: "0 SAR",
  //     icon: "pi pi-shopping-cart",
  //   },
  //   {
  //     id: 2,
  //     title: "Total Purchase",
  //     sar: "0 SAR",
  //     icon: "pi pi-cart-plus",
  //   },
  //   {
  //     id: 3,
  //     title: "Bank Transfer Flow",
  //     sar: "0 SAR",
  //     icon: "pi pi-credit-card",
  //   },
  //   {
  //     id: 4,
  //     title: "Cash Inflow",
  //     sar: "0 SAR",
  //     icon: "pi pi-wallet",
  //   },
  // ];

  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full ">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-lg  border border-gray-100 px-4 py-6"
            >
              <div className="flex justify-between">
                <div>
                  <h1 className="text-xl font-extrabold mb-6">{item.title}</h1>
                </div>
                <div className="h-11  w-11 bg-gradient-to-r from-[#f14f3e] to-[#fab768] rounded-full flex justify-center items-center">
                  <span
                    className={`text-white font-bold ${item.icon}`}
                    style={{ fontSize: "22px" }}
                  ></span>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-extrabold">{item.sar}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
