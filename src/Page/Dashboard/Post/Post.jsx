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
  const [amount, setAmount] = useState({ amountPost: 0, amountCustomer: 0 });
  const [chartDataPartner, setChartDataPartner] = useState(null);
  const [totalCount, setTotalCount] = useState({ customers: 0, partners: 0 });
  const countTotalPost = (Data) => {
    return Data.map((item) => {
      let total = 0;
      for (let key in item.Post) {
        total += item.Post[key];
      }
      return {
        ...item,
        countPost: total,
      };
    });
  };
  useEffect(() => {
    if (date.value !== 8) {
      (async () => {
        try {
          const { data } = await dashboardService.getTotal(date.value);
          const data2 = await dashboardService.getPartnerCustomer(date.value);
          setTotalCount(data.data);

          setChartDataPartner(
            countTotalPost(data2.data.data)
              .map((val) => ({
                "Số lượng bài đăng": val.countPost,
                Ngày: val.Date,
              }))
              .reverse()
          );
          const amountPost = countTotalPost(data2.data.data).reduce(
            (acc, val) => acc + val.countPost,
            0
          );
          setAmount({ amountPost });
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
            const { data } = await dashboardService.getTotal(
              date.value,
              dateTime
            );
            const data2 = await dashboardService.getPartnerCustomer(
              date.value,
              dateTime
            );
            setChartDataPartner(
              countTotalPost(data2.data.data)
                .map((val) => ({
                  "Số lượng bài đăng": val.countPost,
                  Ngày: val.Date,
                }))
                .reverse()
            );
            const amountPost = countTotalPost(data2.data.data).reduce(
              (acc, val) => acc + val.countPost,
              0
            );
            setAmount({ amountPost });
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
      <Heading title={"BÀI ĐĂNG"} setDate={setDate} date={date} />
      <Divider />
      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24} xs={24}>
          <LineChartComponent
            model={"Số lượng bài đăng"}
            date={date.label}
            data={chartDataPartner}
            x1="Số lượng bài đăng"
            y1="Ngày"
            amount={amount.amountPost}
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
