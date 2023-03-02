import React from "react";
import "../Detail.scss";
import { MakeupRoom } from "./makeupRoom";
import { ModelRoom } from "./modelRoom";
import { PhotographerRoom } from "./photographerRoom";
import { StudioRoom } from "./studioRoom";

export const DetailRoom = ({ data, category }) => {
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
      return <PhotographerRoom data={data} />;
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
