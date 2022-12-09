import { Col, Row } from "antd";
import React from "react";
import { Cell, Pie, PieChart } from "recharts";

const COLORS = ["#00C49F", "#E97777"];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const PieChartOrder = ({ date, totalCount }) => {
  const data = [
    { name: "Thành công", value: totalCount?.BookingSuccess },
    { name: "Thất bại", value: totalCount?.BookingFail },
  ];

  return (
    <div className="chile">
      <div className="padding-20">
        <p className="title">Số lượng đơn đặt phân theo trạng thái</p>
        <p className="date">{date}</p>
      </div>
      <Row align="middle" justify="center">
        <Col lg={12} xs={24}>
          <div className="padding-20 gridd">
            <div className="item">
              <div
                className="color"
                style={{ backgroundColor: "#00C49F" }}></div>{" "}
              Thành công
            </div>
            <div className="item">
              <div
                className="color"
                style={{ backgroundColor: "#E97777" }}></div>{" "}
              Thất bại
            </div>
          </div>
        </Col>
        <Col
          lg={12}
          xs={24}
          style={{ padding: " 0 0 20px 20px", textAlign: "center" }}>
          <div style={{ justifyContent: "center", display: "flex" }}>
            <PieChart width={200} height={200}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value">
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PieChartOrder;
