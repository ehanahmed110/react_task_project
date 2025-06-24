import React from 'react'

export function Cards() {
  //  const dispatch = useDispatch();
  // const { stats, loading } = useSelector((state) => state.dashboard);

  // useEffect(() => {
  //   dispatch(fetchDashboardStats());
  // }, [dispatch]);

  // const data = [
  //   {
  //     id: 1,
  //     title: "Total Sales",
  //     sar: `${stats.totalSales} SAR`,
  //   },
  //   {
  //     id: 2,
  //     title: "Total Purchase",
  //     sar: `${stats.totalPurchase} SAR`,
  //   },
  //   {
  //     id: 3,
  //     title: "Bank Transfer Flow",
  //     sar: `${stats.bankTransfer} SAR`,
  //   },
  //   {
  //     id: 4,
  //     title: "Cash Inflow",
  //     sar: `${stats.cashInflow} SAR`,
  //   },
  // ];
      const data = [
        {
         id:1,
         title:"Total Sales",
         sar:"0 SAR"
      },
        {
         id:2,
         title:"Total Purchase",
         sar:"0 SAR"
      },
        {
         id:3,
         title:"Bank Transfer Flow",
         sar:"0 SAR"
      },
        {
         id:4,
         title:"Cash Inflow",
         sar:"0 SAR"
      },
    ]

    return (
        <>
             <div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full '>
                    {data.map((item)=>(
                        <div key={item.id} className='bg-white shadow-lg  border border-gray-100 px-4 py-6'>
                            <h1 className='text-xl font-extrabold mb-6'>{item.title}</h1>
                            <h2 className='text-xl font-extrabold'>{item.sar}</h2>
                        </div>
                    ))}

                </div>
             </div>
        </>
    )
}
