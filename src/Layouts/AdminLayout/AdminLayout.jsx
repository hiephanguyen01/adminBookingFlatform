import React from "react";
import { Outlet } from "react-router-dom";
import AffiliateSideBar from "../../Components/AffiliateSideBar/AffiliateSideBar";
import Header from "../../Components/Header/Header";
import LeftNavBar from "../../Components/LeftNavBar/LeftNavBar";
import "./AdminLayout.scss";

const AdminLayout = ({ type }) => {
  return (
    <div className="AdminLayout">
      <Header />
      <div style={{ display: "flex", width: "100%" }}>
        {type === "root" ? <LeftNavBar /> : <AffiliateSideBar />}
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
