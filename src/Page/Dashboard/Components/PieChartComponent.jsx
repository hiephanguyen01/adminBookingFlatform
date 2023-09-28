import { Col, Row } from "antd";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#E97777",
  "#F675A8",
  "#F2D388",
];
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
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const PieChartComponent = ({ date, totalCount }) => {
  const data = [
    { name: "Studio", value: totalCount?.studioPosts },
    { name: "Nhiếp ảnh", value: totalCount?.photographerPosts },
    { name: "Thiết bị", value: totalCount?.devicePosts },
    { name: "Trang phục", value: totalCount?.clothesPosts },
    { name: "Makeup", value: totalCount?.makeupPosts },
    { name: "Người mẫu", value: totalCount?.modelPosts },
  ];

  return (
    <div className="chile">
      <div className="padding-20">
        <p className="title">Số lượng bài đăng phân theo danh mục</p>
        <p className="date">{date}</p>
      </div>
      <Row align="middle" justify="center">
        <Col lg={12} xs={24}>
          <div className="padding-20 gridd">
            <div className="item">
              <div
                className="color"
                style={{ backgroundColor: "#0088FE" }}
              ></div>{" "}
              Studio
            </div>
            <div className="item">
              <div
                className="color"
                style={{ backgroundColor: "#E97777" }}
              ></div>{" "}
              Trang phục
            </div>
            <div className="item">
              <div
                className="color"
                style={{ backgroundColor: "#00C49F" }}
              ></div>{" "}
              Nhiếp ảnh
            </div>
            <div className="item">
              <div
                className="color"
                style={{ backgroundColor: "#F675A8" }}
              ></div>{" "}
              Makeup
            </div>
            <div className="item">
              <div
                className="color"
                style={{ backgroundColor: "#FFBB28" }}
              ></div>{" "}
              Thiết bị
            </div>
            <div className="item">
              <div
                className="color"
                style={{ backgroundColor: "#F2D388" }}
              ></div>{" "}
              Người mẫu
            </div>
          </div>
        </Col>
        <Col
          lg={12}
          xs={24}
          style={{ padding: " 0 0 20px 20px", textAlign: "center" }}
        >
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
                dataKey="value"
              >
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

export default PieChartComponent;
