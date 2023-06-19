import {
  CalendarOutlined,
  LineChartOutlined,
  LinkOutlined,
  PicLeftOutlined,
  PoundCircleOutlined,
  SolutionOutlined,
  DatabaseOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "./AffiliateSideBar.scss";

const AffiliateSideBar = () => {
  const user = useSelector((state) => state.userReducer?.currentUser?.user);

  const navigate = useNavigate();
  const location = useLocation();
  const items = [
    {
      label: "Quản lý tài khoản",
      key: "/affiliate/manage",
      icon: <PicLeftOutlined />,
      disabled: user?.affiliate < 2,
    },
    {
      label: "Link",
      key: "/affiliate/link",
      icon: <LinkOutlined />,
      disabled: user?.affiliate < 2,
    },
    {
      label: "Quản lý đơn đặt",
      key: "/affiliate/order",
      icon: <CalendarOutlined />,
      disabled: user?.affiliate < 2,
    },
    {
      label: "Hoa hồng",
      key: "/affiliate/commission",
      icon: <PoundCircleOutlined />,
      disabled: user?.affiliate < 2,
    },
    {
      label: "Thống kê",
      key: "/affiliate/statistic",
      icon: <LineChartOutlined />,
      disabled: user?.affiliate < 2,
    },
    {
      label: "Data export",
      key: "/affiliate/data-export",
      icon: <DatabaseOutlined />,
      disabled: user?.affiliate < 2,
    },
    {
      label: "Thanh toán",
      key: "/affiliate/payment",
      icon: <DollarOutlined />,
      disabled: user?.affiliate < 2,
    },
  ];
  const onClick = (e) => {
    navigate(e.key);
  };
  return (
    <div className="AffiliateSideBar">
      <Menu
        onClick={onClick}
        mode="inline"
        items={items}
        defaultSelectedKeys={[`${location.pathname && location.pathname}`]}
        defaultOpenKeys={[
          `/${
            location.pathname &&
            location?.pathname?.split("/").length >= 3 &&
            (location?.pathname?.split("/")[1] || "")
          }`,
        ]}
      />
    </div>
  );
};

export default AffiliateSideBar;
