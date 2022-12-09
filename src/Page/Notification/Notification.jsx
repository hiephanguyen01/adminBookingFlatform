import React from "react";
import { Outlet } from "react-router-dom";

const Notification = () => {
  return (
    <div style={{ backgroundColor: "transparent" }}>
      <Outlet />
    </div>
  );
};

export default Notification;
