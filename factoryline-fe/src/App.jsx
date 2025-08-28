import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./routes/LoginPage";
import DashboardPage from "./routes/DashboardPage";
import TVPage from "./routes/TVPage";
import { isLoggedIn } from "./utils/auth";

function Private({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Private><DashboardPage/></Private>} />
      <Route path="/tv/:channel?" element={<TVPage />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
