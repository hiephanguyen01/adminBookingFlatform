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
import { convertPrice } from "../../../utils/convert";
import classes from "./Dashboard.module.scss";

const LineChartComponent = ({ data, x1, y1 }) => {
  function formatYAxis(value) {
    return convertPrice(value);
  }
  return (
    <div className={classes.chile}>
      <div
        style={{
          paddingRight: "20px",
          paddingTop: "40px",
        }}>
        <ResponsiveContainer width="100%" height={500}>
          <LineChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={y1} padding={{ left: 30, right: 30 }} />
            <YAxis
              width={100}
              tickFormatter={formatYAxis}
              allowDecimals={false}
              format
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={x1}
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            {/* {x2 && <Line type="monotone" dataKey={x2} stroke="#82ca9d" />} */}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartComponent;
