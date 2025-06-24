import React from "react";
import { CoustomTable } from "../../Shared/CoustomTable";

    const coloumns = [
        {
           field:"",
           header:"Name"
        },
        {
           field:"",
           header:"Type"
        },
        {
           field:"",
           header:"SubType"
        },
        {
           field:"",
           header:"Action"
        },
   ]
    export const Asset = () =>{
        return(
      <CoustomTable coloumns={coloumns} />
        )
    };
    export const Liability = () =>{

    };
   export const Revenue = () =>{

    };
   export const Equity = () =>{

    };
   export const Expense = () =>{

    }