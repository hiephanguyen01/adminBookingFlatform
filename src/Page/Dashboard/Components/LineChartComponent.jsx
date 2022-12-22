import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LineChartComponent = ({
  model,
  date,
  amount = true,
  sub,
  data,
  x1,
  x2,
  y1,
}) => {
  return (
    <div className="chile">
      <div className="padding-20 flex">
        <div className="text">
          <p className="title">{model}</p>
          <p className="date">{date}</p>
        </div>
        {amount !== false && (
          <div className="text">
            <p className="amount right-align">{amount}</p>
            {sub ? (
              <p className="date right-align">{sub} </p>
            ) : (
              <p className="date right-align">{model} mới</p>
            )}
          </div>
        )}
      </div>
      <div style={{ paddingRight: "10px" }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={y1} padding={{ left: 30, right: 30 }} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={x1}
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            {x2 && <Line type="monotone" dataKey={x2} stroke="#82ca9d" />}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartComponent;
