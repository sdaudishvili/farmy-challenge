import React from "react";
import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "@/components/Layouts";
import { CreateSalad } from "@/views";
// import { SaladDesigner } from "@/views/SaladDesigner";

const RoutesProvider = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<CreateSalad />} />
        {/* <Route path="salad-designer" element={<SaladDesigner />} /> */}

        {/* Using path="*"" means "match anything", so this route
        acts like a catch-all for URLs that we don't have explicit
        routes for. */}
        <Route path="*" element={<div />} />
      </Route>
    </Routes>
  );
};

export default RoutesProvider;
