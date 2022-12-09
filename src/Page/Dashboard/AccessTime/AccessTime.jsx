import { Col, Divider, Row } from "antd";
import React, { useState } from "react";
import Heading from "../Components/Heading/Heading";
import LineChartComponent from "../Components/LineChartComponent";

const AccessTime = () => {
  const [date, setDate] = useState({
    value: 1,
    label: "",
  });
  const chart1Data = [
    { "Lượt truy cập": 10, Ngày: "1/12" },
    { "Lượt truy cập": 9, Ngày: "2/12" },
    { "Lượt truy cập": 0, Ngày: "3/12" },
    { "Lượt truy cập": 1, Ngày: "4/12" },
    { "Lượt truy cập": 12, Ngày: "5/12" },
    { "Lượt truy cập": 15, Ngày: "6/12" },
    { "Lượt truy cập": 18, Ngày: "7/12" },
  ];
  const chart2Data = [
    {
      "Lượt truy cập trên website": 10,
      "Lượt truy cập trên app": 10,
      Ngày: "1/12",
    },
    {
      "Lượt truy cập trên website": 410,
      "Lượt truy cập trên app": 90,
      Ngày: "2/12",
    },
    {
      "Lượt truy cập trên website": 100,
      "Lượt truy cập trên app": 140,
      Ngày: "3/12",
    },
    {
      "Lượt truy cập trên website": 210,
      "Lượt truy cập trên app": 102,
      Ngày: "4/12",
    },
    {
      "Lượt truy cập trên website": 150,
      "Lượt truy cập trên app": 12,
      Ngày: "5/12",
    },
    {
      "Lượt truy cập trên website": 109,
      "Lượt truy cập trên app": 15,
      Ngày: "6/12",
    },
    {
      "Lượt truy cập trên website": 910,
      "Lượt truy cập trên app": 18,
      Ngày: "7/12",
    },
  ];
  return (
    <div>
      <Heading title={"LƯỢT TRUY CẬP"} setDate={setDate} date={date} />
      <Divider />
      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24} xs={24}>
          <LineChartComponent
            model={"Tổng lượt truy cập trên cả app và website"}
            date={date.label}
            sub="Lượt truy cập"
            amount={400}
            data={chart1Data}
            x1="Lượt truy cập"
            y1="Ngày"
          />
        </Col>
        <Col lg={12} sm={24} xs={24}>
          <LineChartComponent
            model={"Lượt truy cập trên cả app và website"}
            amount={false}
            date={date.label}
            data={chart2Data}
            x1="Lượt truy cập trên website"
            x2="Lượt truy cập trên app"
            y1="Ngày"
          />
        </Col>
      </Row>
    </div>
  );
};

export default AccessTime;
