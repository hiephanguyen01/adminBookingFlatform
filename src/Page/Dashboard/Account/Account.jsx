import { ArrowUpOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Col, Divider, Row, Tag } from "antd";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { dashboardService } from "../../../services/DashboardService";
import CountCard from "../Components/CountCard/CountCard";
import Heading from "../Components/Heading/Heading";
import LineChartComponent from "../Components/LineChartComponent";
import PieChartComponent from "../Components/PieChartComponent";
import "./Account.scss";

const Account = () => {
  const [date, setDate] = useState({
    value: 1,
    label: "",
  });
  const [totalCount, setTotalCount] = useState({ customers: 0, partners: 0 });
  const [chartDataPartner, setChartDataPartner] = useState(null);
  const [chartDataCustomer, setChartDataCustomer] = useState(null);
  const [amount, setAmount] = useState({ amountPartner: 0, amountCustomer: 0 });
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
          setChartDataCustomer(
            data2.data.data
              .map((val) => ({
                "Số lượng khách hàng": val.BookingUser,
                Ngày: val.Date,
              }))
              .reverse()
          );
          const amountPartner = data2.data.data.reduce(
            (acc, val) => acc + val.Partner,
            0
          );
          const amountCustomer = data2.data.data.reduce(
            (acc, val) => acc + val.BookingUser,
            0
          );
          setAmount({ amountPartner, amountCustomer });
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
            setChartDataCustomer(
              data2.data.data
                .map((val) => ({
                  "Số lượng khách hàng": val.BookingUser,
                  Ngày: val.Date,
                }))
                .reverse()
            );
            const amountPartner = data2.data.data.reduce(
              (acc, val) => acc + val.Partner,
              0
            );
            const amountCustomer = data2.data.data.reduce(
              (acc, val) => acc + val.BookingUser,
              0
            );
            setAmount({ amountPartner, amountCustomer });
            setTotalCount(data.data);
          } catch (error) {
            console.log(error);
          }
        })();
      }
    }
  }, [date]);

  return (
    <div className="Account">
      <Heading title={"TÀI KHOẢN ĐỐI TÁC"} setDate={setDate} date={date} />
      <Divider />
      {/* đối tác */}
      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24} xs={24}>
          <Row gutter={[16, 16]}>
            <Col lg={12} sm={24} xs={24}>
              <CountCard model={"đối tác"} amount={totalCount.partners} />
            </Col>
            <Col lg={12} sm={24} xs={24}>
              <div className="chile">
                <div className="padding-20">
                  <p className="margin-bottom">
                    Đối tác mới&nbsp;&nbsp;
                    <Tag color="#d8ffd1" style={{ color: "#29940f" }}>
                      <ArrowUpOutlined />
                      &nbsp;
                      {Math.round(totalCount?.percentPartner * 1000) / 1000}%
                    </Tag>
                  </p>
                  <Avatar.Group size="large">
                    <Avatar style={{ backgroundColor: "#000" }}>D</Avatar>
                    <Avatar style={{ backgroundColor: "blue" }}>K</Avatar>
                    <Avatar style={{ backgroundColor: "green" }}>H</Avatar>
                    <Avatar style={{ backgroundColor: "#f56a00" }}>N</Avatar>
                    <Avatar
                      style={{ backgroundColor: "#87d068" }}
                      icon={<UserOutlined />}
                    />
                  </Avatar.Group>
                </div>
              </div>
            </Col>
            <Col xs={24}>
              <PieChartComponent date={date.label} totalCount={totalCount} />
            </Col>
          </Row>
        </Col>

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
      </Row>
      <Divider />
      {/* khách hàng */}
      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24} xs={24}>
          <LineChartComponent
            model={"Số lượng khách hàng"}
            date={date.label}
            data={chartDataCustomer}
            x1="Số lượng khách hàng"
            y1="Ngày"
            amount={amount.amountCustomer}
          />
        </Col>
        <Col lg={12} sm={24} xs={24}>
          <Row gutter={[16, 16]}>
            <Col lg={12} sm={24} xs={24}>
              <CountCard model={"khách hàng"} amount={totalCount.customers} />
            </Col>
            <Col lg={12} sm={24} xs={24}>
              <div className="chile">
                <div className="padding-20">
                  <p className="margin-bottom">
                    Khách hàng mới&nbsp;&nbsp;
                    <Tag color="#d8ffd1" style={{ color: "#29940f" }}>
                      <ArrowUpOutlined />
                      &nbsp;
                      {Math.round(totalCount?.percentCustomer * 100) / 100}%
                    </Tag>
                  </p>
                  <Avatar.Group size="large">
                    <Avatar style={{ backgroundColor: "#000" }}>D</Avatar>
                    <Avatar style={{ backgroundColor: "blue" }}>K</Avatar>
                    <Avatar style={{ backgroundColor: "green" }}>H</Avatar>
                    <Avatar style={{ backgroundColor: "#f56a00" }}>N</Avatar>
                    <Avatar
                      style={{ backgroundColor: "#87d068" }}
                      icon={<UserOutlined />}
                    />
                  </Avatar.Group>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Account;
