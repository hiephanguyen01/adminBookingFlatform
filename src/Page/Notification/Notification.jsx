import React from "react";
import { Outlet } from "react-router-dom";

const Notification = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Notification;
