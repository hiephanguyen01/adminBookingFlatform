import { Breadcrumb, Col, Divider, Image, Row } from "antd";
import React, { useEffect, useState } from "react";
import { EditOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Pagination,
  Select,
  Space,
  Table,
  Tag,
  Checkbox,
} from "antd";
import { orderService } from "../../../../services/OrderService";
import moment from "moment";
import TextArea from "antd/es/input/TextArea";
import { BASEURL_IMG } from "../../../../../utils/baseURL";
import "../Detail.scss";
import { StudioRoom } from "./studioRoom";
import { PhotographerRoom } from "./photographerRoom";
import { MakeupRoom } from "./makeupRoom";
import { ModelRoom } from "./modelRoom";

export const DetailRoom = ({ data, category }) => {
  console.log("detal", data);
  if (!data) return null;

  const listCheckBox = [
    {
      label: "Quạt",
      value: data.HasFan,
    },
    {
      label: "Máy lạnh",
      value: data.HasAirConditioner,
    },
    {
      label: "Phòng thay đồ",
      value: data.HasDressingRoom,
    },
    {
      label: "Nhà vệ sinh riêng",
      value: data.HasWC,
    },
    {
      label: "Camera an ninh",
      value: data.HasCamera,
    },
    {
      label: "Wifi",
      value: data.HasWifi,
    },
    {
      label: "Chỗ đậu xe máy",
      value: data.HasMotorBikeParking,
    },
    {
      label: "Chỗ đậu xe ô tô",
      value: data.HasCarParking,
    },
    {
      label: "Nhân viên hỗ trợ",
      value: data.HasSupporter,
    },
  ];
  switch (category) {
    case 1:
      return <StudioRoom data={data} />;
    case 2:
      // code block
      return <PhotographerRoom data={data}/>;
    case 4:
      return <MakeupRoom data={data} />;
    // code block
    case 6:
      // code block
      return <ModelRoom data={data} />;
    default:
      // code block
      return;
  }
};
