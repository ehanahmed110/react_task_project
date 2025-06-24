 export const Navlinks = [
    {
      label:"chart of accounts",
      icon:"pi pi-chart-bar",
      url:"/chart-account",    
    },
     {
      label:"journal entries",
      icon:"pi pi-book",
      url:"/journal-entries",  
    },
     {
      label:"invoices",
      icon:"pi pi-file",
      items:[
        {
            label:"sales invoices",
            icon:"pi pi-file",
            url:"/invoice/sales-invoice",
        },
        {
            label:"company invoices",
            icon:"pi pi-file",
            url:"/invoice/company-invoice",
        },
        {
            label:"credit invoices",
            icon:"pi pi-file",
            url:"/invoice/credit-invoice",
        },
        {
            label:"credit company invoices",
            icon:"pi pi-file",
            url:"/invoice/credit-company-invoice",
        },
        {
            label:"insurance claim invoices",
            icon:"pi pi-file",
            url:"invoice/insurance-claim-invoice",
        },
      ]    
    },
     {
      label:"configeration",
      icon:"pi pi-sliders-h ",
      items:[
        {
            label:"items",
            icon:"pi pi-file",
            url:"configuration/items",
        },
        {
            label:"customers",
            icon:"pi pi-file",
            url:"configuration/coustomers",
        },
        {
            label:"insurance company",
            icon:"pi pi-file",
            url:"configuration/insurance-company",
        },
        {
            label:"branches",
            icon:"pi pi-file",
            url:"configuration/branch",
        },
        {
            label:"cost center",
            icon:"pi pi-file",
            url:"configuration/cost-center",
        },
        {
            label:"TPA",
            icon:"pi pi-file",
            url:"configuration/tpa",
        },
      ]    
    },
     {
      label:"payroll",
      icon:"pi pi-file",
      url:"/payroll",   
    },
     {
      label:"purchases",
      icon:"pi pi-tag",
      items:[
        {
            label:"vendor",
            icon:"pi pi-file",
            url:"purchases/vendor",
        },
        {
            label:"purchases entry",
            icon:"pi pi-file",
            url:"/purchase/Purchase-entry",
        },
      ]    
    },
     {
      label:"voucher",
      icon:"pi pi-tags",
      items:[
        {
            label:"payment voucher",
            icon:"pi pi-file",
            url:"/voucher/payment-voucher",
        },
        {
            label:"recipt voucher",
            icon:"pi pi-file",
            url:"/voucher/recept-voucher",
        },
      ]    
    },
     {
      label:"reports",
      icon:"pi pi-file",
      url:"/report",    
    },
]