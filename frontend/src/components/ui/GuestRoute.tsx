import { Navigate } from "react-router-dom";
import React from "react";

export default function GuestRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
