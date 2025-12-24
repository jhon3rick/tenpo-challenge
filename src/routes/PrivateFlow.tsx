import { Navigate, Route, Routes } from "react-router-dom";
import { routeConfig } from "./routeConfig";
import { HomePage } from "../pages/HomePage";

export const PrivateFlow = () => {
  return (
    <Routes>
      <Route path={routeConfig.home.path} element={<HomePage />} />
      <Route path="*" element={<Navigate to={routeConfig.home.path} replace />} />
    </Routes>
  );
};
