import { ConfigProvider } from "antd";
import locale from "antd/locale/vi_VN";
import "moment/locale/vi";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.scss";
import store from "./store/store";

const locala = {
  ...locale,
  DatePicker: {
    ...locale.DatePicker,
    format: "DD/MM/YYYY",
  },
};
console.log(locale);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ConfigProvider
          locale={locale}
          theme={{
            token: {
              colorPrimary: "#e22828",
            },
          }}>
          <App />
        </ConfigProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
