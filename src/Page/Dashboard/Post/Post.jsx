import { Col, Divider, Row } from "antd";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { dashboardService } from "../../../services/DashboardService";
import CountCard from "../Components/CountCard/CountCard";
import Heading from "../Components/Heading/Heading";
import LineChartComponent from "../Components/LineChartComponent";
import PieChartComponent from "../Components/PieChartComponent";
const Post = () => {
  const [date, setDate] = useState({
    value: 1,
    label: "",
  });
  const [amount, setAmount] = useState({ amountPartner: 0, amountCustomer: 0 });
  const [chartDataPartner, setChartDataPartner] = useState(null);
  const [totalCount, setTotalCount] = useState({ customers: 0, partners: 0 });

  useEffect(() => {
    if (date.value !== 8) {
      (async () => {
        try {
          const { data } = await dashboardService.getTotal(date.value);
          const data2 = await dashboardService.getPartnerCustomer(date.value);
          setTotalCount(data.data);

          setChartDataPartner(
            data2.data.data
              .map((val) => ({
                "Số lượng đối tác": val.Partner,
                Ngày: val.Date,
              }))
              .reverse()
          );
          const amountPartner = data2.data.data.reduce(
            (acc, val) => acc + val.Partner,
            0
          );
          setAmount({ amountPartner });
        } catch (error) {
          console.log(error);
        }
      })();
    } else {
      if (date.picker) {
        (async () => {
          try {
            let dateTime = {
              startDate: moment(date.picker[0]).toISOString(),
              endDate: moment(date.picker[1]).toISOString(),
            };
            dateTime = JSON.stringify(dateTime);
            const { data } = await dashboardService.getTotal(
              date.value,
              dateTime
            );
            const data2 = await dashboardService.getPartnerCustomer(
              date.value,
              dateTime
            );
            setChartDataPartner(
              data2.data.data
                .map((val) => ({
                  "Số lượng đối tác": val.Partner,
                  Ngày: val.Date,
                }))
                .reverse()
            );
            const amountPartner = data2.data.data.reduce(
              (acc, val) => acc + val.Partner,
              0
            );
            setAmount({ amountPartner });
            setTotalCount(data.data);
          } catch (error) {
            console.log(error);
          }
        })();
      }
    }
  }, [date]);
  return (
    <div>
      <Heading title={"TÀI KHOẢN ĐỐI TÁC"} setDate={setDate} date={date} />
      <Divider />
      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24} xs={24}>
          <LineChartComponent
            model={"Số lượng đối tác"}
            date={date.label}
            data={chartDataPartner}
            x1="Số lượng đối tác"
            y1="Ngày"
            amount={amount.amountPartner}
          />
        </Col>
        <Col lg={12} sm={24} xs={24}>
          <Row gutter={[16, 16]}>
            <Col lg={24}>
              <PieChartComponent date={date.label} totalCount={totalCount} />
            </Col>
            <Col lg={24} sm={24} xs={24}>
              <CountCard amount={totalCount?.totalPost} model={"bài đăng"} />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Post;
