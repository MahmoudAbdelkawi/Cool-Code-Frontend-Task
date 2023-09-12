import {  Navigate, Outlet } from "react-router-dom";
import { useState } from "react";
import { PrivateProps } from "../types";


function Private({roles}:PrivateProps) {
    // const role  = "BUYER";
    const [role , ] = useState<string>(localStorage.getItem('token') ? JSON.parse(atob(localStorage.getItem('token')!.split('.')[1])).role : "");


  return (
    <>
      {roles.includes(role) ? (
        <Outlet />
        ) : (
                <Navigate to={"/login"} />
        )}
    </>
  );
}

export default Private;
