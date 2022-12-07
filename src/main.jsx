import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#e22828",
          },
        }}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);
