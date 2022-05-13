import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { DefaultLayout } from "@/components/Layouts";
import { CreateSalad, ListSalad } from "@/views";
// import { SaladDesigner } from "@/views/SaladDesigner";

const RoutesProvider = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Navigate to="/salads" />} />
        <Route path="salads">
          <Route index element={<ListSalad />} />
          <Route path="create" element={<CreateSalad />} />
        </Route>
        <Route path="*" element={<div />} />
      </Route>
    </Routes>
  );
};

export default RoutesProvider;
