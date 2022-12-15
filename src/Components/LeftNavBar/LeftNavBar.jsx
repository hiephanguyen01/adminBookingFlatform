import {
  AreaChartOutlined,
  CalendarOutlined,
  CompassOutlined,
  DatabaseOutlined,
  NotificationOutlined,
  PicLeftOutlined,
  SettingOutlined,
  SketchOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./LeftNavBar.scss";
const items = [
  {
    label: "Dashboard",
    key: "/dashboard",
    icon: <AreaChartOutlined />,
    children: [
      { label: "Tài khoản", key: "/dashboard/account" },
      { label: "Bài đăng", key: "/dashboard/post" },
      { label: "Đơn đặt", key: "/dashboard/order" },
      { label: "Lượt truy cập", key: "/dashboard/access-times" },
    ],
    domEvent: onclick,
  },
  {
    label: "Quản lý tài khoản",
    key: "/manage",
    icon: <PicLeftOutlined />,
    children: [
      { label: "Đối tác", key: "/manage/partner" },
      { label: "Khách hàng", key: "/manage/customer" },
    ],
  },
  {
    label: "Xếp hạng báo cáo",
    key: "/rank-report",
    icon: <SolutionOutlined />,
  },
  {
    label: "Quản lý đơn đặt",
    key: "/manage-order",
    icon: <CalendarOutlined />,
  },
  {
    label: "Data export",
    key: "/data-export",
    icon: <DatabaseOutlined />,
  },
  {
    label: "Dạo",
    key: "/dao",
    icon: <CompassOutlined />,
  },
  {
    label: "Thông báo",
    key: "/notification",
    icon: <NotificationOutlined />,
    children: [
      { label: "Đối tác", key: "/notification/partner" },
      { label: "Khách hàng", key: "/notification/customer" },
      { label: "Tạo thông báo", key: "/notification/create" },
      { label: "Setting", key: "/notification/setting" },
    ],
  },
  {
    label: "Khuyến mãi",
    key: "/promo-code",
    icon: <SketchOutlined />,
    children: [
      { label: "Đối tác", key: "/promo-code/partner" },
      { label: "Khách hàng", key: "/promo-code/customer" },
      { label: "Tạo khuyến mãi", key: "/promo-code/create" },
    ],
  },
  {
    label: "Setting",
    key: "/setting",
    icon: <SettingOutlined />,
    children: [
      { label: "Ngân hàng", key: "/setting/banks" },
      { label: "Banner", key: "/setting/banner" },
      { label: "Tỉnh / Thành phố", key: "/setting/city" },
      { label: "Quận / Huyện", key: "/setting/district" },
      { label: "Phường / Xã ", key: "/setting/ward" },
      { label: "Webhook", key: "/setting/webhook" },
      { label: "Từ cấm", key: "/setting/banned-word" },
      { label: "Câu hỏi thường gặp", key: "/setting/question" },
    ],
  },
];

const LeftNavBar = () => {
  const navigate = useNavigate();
  const onClick = (e) => {
    navigate(e.key);
  };
  return (
    <div className="LeftNavBar">
      <Menu onClick={onClick} mode="inline" items={items} />
    </div>
  );
};

export default LeftNavBar;
