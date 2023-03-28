import { Col, Divider, Row } from "antd";
import React, { useEffect, useState } from "react";
import Heading from "../Components/Heading/Heading";
import LineChartComponent from "../Components/LineChartComponent";
import { dashboardService } from "../../../services/DashboardService";
import PieChartOrder from "../Components/PieChartOrder";
import moment from "moment/moment";

export const convertPrice = (price) => {
  let format;
  if (price) {
    format = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  } else {
    return 0;
  }
  return format;
};
const Order = () => {
  const [date, setDate] = useState({
    value: 1,
    label: "",
  });
  const [AmountBooking, setAmountBooking] = useState(null);
  const [StatusBooking, setStatusBooking] = useState([]);
  const [BookingValue, setSBookingValue] = useState([]);
  const [amount, setAmount] = useState({ amountPartner: 0, amountCustomer: 0 });
  const [totalCount, setTotalCount] = useState({ customers: 0, partners: 0 });

  useEffect(() => {
    if (date.value !== 8) {
      (async () => {
        try {
          const data2 = await dashboardService.getPartnerCustomer(date.value);
          setAmountBooking(
            data2.data.data
              .map((val) => ({
                "Số lượng đơn đặt": val.Bookings,
                Ngày: val.Date,
              }))
              .reverse()
          );
          setStatusBooking(
            data2.data.data
              .map((val) => ({
                "Số đơn thành công": val.BookingSuccess,
                "Số đơn huỷ": val.BookingFail,
                Ngày: val.Date,
              }))
              .reverse()
          );
          setSBookingValue(
            data2.data.data
              .map((val) => ({
                "Giá trị đơn đặt": val.BookingValue,
                Ngày: val.Date,
              }))
              .reverse()
          );
          const amountOrder = data2.data.data.reduce(
            (acc, val) => acc + val.Bookings,
            0
          );
          const bookingValue = data2.data.data.reduce(
            (acc, val) => acc + val.BookingValue,
            0
          );
          const amountSuccFail = data2.data.data.reduce(
            (acc, val) => ({
              BookingSuccess: acc.BookingSuccess + val.BookingSuccess,
              BookingFail: acc.BookingFail + val.BookingFail,
            }),
            {
              BookingSuccess: 0,
              BookingFail: 0,
            }
          );
          setTotalCount(amountSuccFail);
          setAmount({ amountOrder, bookingValue });
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
            const data2 = await dashboardService.getPartnerCustomer(
              date.value,
              dateTime
            );
            setAmountBooking(
              data2.data.data
                .map((val) => ({
                  "Số lượng đơn đặt": val.Bookings,
                  Ngày: val.Date,
                }))
                .reverse()
            );
            setStatusBooking(
              data2.data.data
                .map((val) => ({
                  "Số đơn thành công": val.BookingSuccess,
                  "Số đơn huỷ": val.BookingFail,
                  Ngày: val.Date,
                }))
                .reverse()
            );
            setSBookingValue(
              data2.data.data
                .map((val) => ({
                  "Giá trị đơn đặt": val.BookingValue,
                  Ngày: val.Date,
                }))
                .reverse()
            );
            const amountOrder = data2.data.data.reduce(
              (acc, val) => acc + val.Bookings,
              0
            );
            const bookingValue = data2.data.data.reduce(
              (acc, val) => acc + val.BookingValue,
              0
            );
            setAmount({ amountOrder, bookingValue });
          } catch (error) {
            console.log(error);
          }
        })();
      }
    }
  }, [date]);
  return (
    <div>
      <Heading title={"ĐƠN ĐẶT"} setDate={setDate} date={date} />
      <Divider />
      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24} xs={24}>
          <LineChartComponent
            model={"Số lượng đơn đặt"}
            date={date.label}
            data={AmountBooking}
            x1="Số lượng đơn đặt"
            y1="Ngày"
            amount={amount.amountOrder}
          />
        </Col>
        <Col lg={12} sm={24} xs={24}>
          <LineChartComponent
            model={"Số lượng đơn đặt thành công / không thành công"}
            amount={false}
            date={date.label}
            data={StatusBooking}
            x1="Số đơn thành công"
            x2="Số đơn huỷ"
            y1="Ngày"
          />
        </Col>
        <Col lg={12} sm={24} xs={24}>
          <LineChartComponent
            model={"Giá trị đơn đặt"}
            date={date.label}
            sub=" "
            data={BookingValue}
            x1="Giá trị đơn đặt"
            y1="Ngày"
          />
        </Col>
        <Col lg={12} sm={24} xs={24}>
          <PieChartOrder date={date.label} totalCount={totalCount} />
        </Col>
      </Row>
    </div>
  );
};

export default Order;
