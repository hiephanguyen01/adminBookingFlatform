import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import {
  openNotification,
  openNotificationText,
} from "../../../utils/Notification";
import AffiliateSideBar from "../../Components/AffiliateSideBar/AffiliateSideBar";
import Header from "../../Components/Header/Header";
import LeftNavBar from "../../Components/LeftNavBar/LeftNavBar";
import { setupSocket } from "../../store/action/authAction";
import "./AdminLayout.scss";
const AdminLayout = ({ type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer?.currentUser?.user);
  const socket = useSelector((state) => state.userReducer.socket);
  useEffect(() => {
    if (!socket) {
      user && dispatch(setupSocket(user));
    }
  }, [user]);
  // useEffect(() => {
  //   socket?.on("recieveNotification", (data) => {
  //     console.log("🚀 ~ socket?.on ~ data:", data);
  //     openNotificationText(data.event, data.title, navigate, "/manage-order");
  //   });
  //   return () => {
  //     socket?.off("recieveNotification");
  //   };
  // }, [socket]);
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
