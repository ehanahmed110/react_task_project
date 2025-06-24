import React from "react";
import { LoginPage } from "../Pages/LoginPage";
import { Navigate, Route, Routes } from "react-router-dom";

export function PublicRouter() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </React.Fragment>
  );
}
