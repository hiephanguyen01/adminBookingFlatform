import React from "react";
import { Outlet } from "react-router-dom";
import "./Dashboard.scss";
const Dashboard = () => {
  return (
    <div className="Dashboard">
      <Outlet />
    </div>
  );
};

export default Dashboard;
