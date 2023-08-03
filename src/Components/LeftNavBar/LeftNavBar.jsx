import {
  ApartmentOutlined,
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
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "./LeftNavBar.scss";

const LeftNavBar = () => {
  const user = useSelector((state) => state.userReducer?.currentUser?.user);
  const navigate = useNavigate();
  const location = useLocation();
  const onClick = (e) => {
    navigate(e.key);
  };
  const items = [
    {
      label: "Dashboard",
      key: "/dashboard",
      icon: <AreaChartOutlined />,
      disabled: user?.dashboard < 2,
      children: [
        { label: "Tài khoản", key: "/dashboard/account" },
        { label: "Bài đăng", key: "/dashboard/post" },
        { label: "Đơn đặt", key: "/dashboard/order" },
        { label: "Lượt truy cập", key: "/dashboard/access-times" },
      ],
    },
    {
      label: "Quản lý tài khoản",
      key: "/manage",
      icon: <PicLeftOutlined />,
      children: [
        {
          label: "Đối tác",
          key: "/manage/partner",
          disabled: user?.partnerAccount < 2,
        },
        {
          label: "Khách hàng",
          key: "/manage/customer",
          disabled: user?.customerAccount < 2,
        },
      ],
    },
    {
      label: "Quản lý bài đăng",
      key: "/posts",
      icon: <PicLeftOutlined />,
      disabled: user?.post < 2,
    },
    {
      label: "Xếp hạng báo cáo",
      key: "/rank-report",
      icon: <SolutionOutlined />,
      disabled: user?.report < 2,
    },
    {
      label: "Quản lý đơn đặt",
      key: "/manage-order",
      icon: <CalendarOutlined />,
      disabled: user?.booking < 2,
    },
    {
      label: "Data export",
      key: "/data-export",
      icon: <DatabaseOutlined />,
      disabled: user?.export < 2,
    },
    {
      label: "Dạo",
      key: "/dao",
      icon: <CompassOutlined />,
      disabled: user?.dao < 2,
    },
    {
      label: "Quản lý quyền",
      key: "/permission",
      icon: <ApartmentOutlined />,
      disabled: user?.permission < 2,
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
      disabled: user?.notification < 2,
    },
    {
      label: "Khuyến mãi",
      key: "/promo-code",
      icon: <SketchOutlined />,
      children: [
        { label: "Mã khuyến mãi", key: "/promo-code" },
        // { label: "Đối tác", key: "/promo-code/partner" },
        // { label: "Khách hàng", key: "/promo-code/customer" },
        { label: "Tạo khuyến mãi", key: "/promo-code/create" },
      ],
      disabled: user?.promo < 2,
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
        { label: "Hot key search", key: "/setting/hot-key" },
        { label: "Key liên quan", key: "/setting/key-relate" },
        { label: "Email Service", key: "/setting/email-service" },
      ],
      disabled: user?.setting < 2,
    },
  ];
  return (
    <div className="LeftNavBar">
      <Menu
        onClick={onClick}
        mode="inline"
        items={items}
        defaultSelectedKeys={[`${location.pathname && location.pathname}`]}
        // defaultOpenKeys={`${
        //   location.pathname &&
        //   location?.pathname.split("/").length >= 3 &&
        //   location?.pathname.split("/")[1]
        // }`}
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

export default LeftNavBar;
