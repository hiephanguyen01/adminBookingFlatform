import { LoadingOutlined } from "@ant-design/icons";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export const ProtectedRoute = ({ children, type = "" }) => {
  const user = useSelector((state) => state.userReducer.currentUser);
  const authing = useSelector((state) => state.userReducer.authing);
  return authing ? (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}>
      <div
        style={{
          background: "#fff",
          width: "fit-content",
          borderRadius: "50%",
          padding: "10px",
          margin: "10px",
        }}>
        <LoadingOutlined style={{ fontSize: "40px" }} />
      </div>
    </div>
  ) : !user ? (
    <Navigate to="/login" />
  ) : (
    children
  );
};
