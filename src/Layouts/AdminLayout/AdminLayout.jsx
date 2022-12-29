import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../Components/Header/Header";
import LeftNavBar from "../../Components/LeftNavBar/LeftNavBar";
import "./AdminLayout.scss";
const AdminLayout = () => {
  return (
    <div className="AdminLayout">
      <Header />
      <div style={{ display: "flex" }}>
        <LeftNavBar />
        <div className="right">
          <div className="papper" id="paper">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
