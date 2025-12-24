import { Navigate, Route, Routes } from "react-router-dom";
import { routeConfig } from "./routeConfig";
import { LoginPage } from "../pages/LoginPage";

export const PublicFlow = () => {
  return (
    <Routes>
      <Route path={routeConfig.login.path} element={<LoginPage />} />
      <Route path="*" element={<Navigate to={routeConfig.login.path} replace />} />
    </Routes>
  );
};
