import {
  CalendarOutlined,
  LineChartOutlined,
  LinkOutlined,
  PicLeftOutlined,
  PoundCircleOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AffiliateSideBar.scss";
const items = [
  {
    label: "Quản lý tài khoản",
    key: "/affiliate/manage",
    icon: <PicLeftOutlined />,
  },
  {
    label: "Link",
    key: "/affiliate/link",
    icon: <LinkOutlined />,
  },
  {
    label: "Quản lý đơn đặt",
    key: "/affiliate/order",
    icon: <CalendarOutlined />,
  },
  {
    label: "Hoa hồng",
    key: "/affiliate/commission",
    icon: <PoundCircleOutlined />,
  },
  {
    label: "Thống kê",
    key: "/affiliate/statistic",
    icon: <LineChartOutlined />,
  },
];
const AffiliateSideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
