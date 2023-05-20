import { Col, Divider, Row } from "antd";
import React, { useEffect, useState } from "react";
import Heading from "../Components/Heading/Heading";
import LineChartComponent from "../Components/LineChartComponent";
import { dashboardService } from "../../../services/DashboardService";
import moment from "moment";

const AccessTime = () => {
  const [amount, setAmount] = useState(0);
  const [chart1, setChart1] = useState([]);
  const [chart2, setChart2] = useState([]);
  const [date, setDate] = useState({
    value: 1,
    label: "",
  });

  useEffect(() => {
    if (date.value !== 8) {
      (async () => {
        try {
          const { data } = await dashboardService.getAccessCount(date.value);
          const totalCount = data.reduce(
            (acc, val) => acc + val.AppCount + val.WebCount,
            0
          );
          setAmount(totalCount);
          setChart1(
            data.map((val) => ({
              "Lượt truy cập": val.AppCount + val.WebCount,
              Ngày: val.Date,
            }))
          );
          setChart2(
            data.map((val) => ({
              "Lượt truy cập trên website": val.WebCount,
              "Lượt truy cập trên app": val.AppCount,
              Ngày: val.Date,
            }))
          );
        } catch (error) {
          console.log(error);
        }
      })();
    } else {
      if (date.picker) {
        (async () => {
          try {
            let dateTime = {
              startDate: moment(date.picker[0], "DD/MM/YYYY").toISOString(),
              endDate: moment(date.picker[1], "DD/MM/YYYY").toISOString(),
            };

            dateTime = JSON.stringify(dateTime);
            const { data } = await dashboardService.getAccessCount(
              date.value,
              dateTime
            );
            const totalCount = data.reduce(
              (acc, val) => acc + val.AppCount + val.WebCount,
              0
            );
            setAmount(totalCount);
            setChart1(
              data.map((val) => ({
                "Lượt truy cập": val + val.AppCount + val.WebCount,
                Ngày: val.Date,
              }))
            );
            setChart2(
              data.map((val) => ({
                "Lượt truy cập trên website": val.WebCount,
                "Lượt truy cập trên app": val.AppCount,
                Ngày: val.Date,
              }))
            );
          } catch (error) {
            console.log(error);
          }
        })();
      }
    }
  }, [date]);

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
            amount={amount}
            data={chart1}
            x1="Lượt truy cập"
            y1="Ngày"
          />
        </Col>
        <Col lg={12} sm={24} xs={24}>
          <LineChartComponent
            model={"Lượt truy cập trên cả app và website"}
            amount={false}
            date={date.label}
            data={chart2}
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
