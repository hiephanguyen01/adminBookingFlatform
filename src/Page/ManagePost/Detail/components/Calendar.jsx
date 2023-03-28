import React, { useEffect, useState } from "react";
import {
  Badge,
  Breadcrumb,
  Button,
  Calendar,
  Col,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import "../Detail.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { converPriceVND } from "../../../../../utils/convert";
import { baseURL } from "../../../../../utils/baseURL";
import moment from "moment";

export default function CalendarAndPrice({ service }) {
  if (service.length < 1) return <>Không có thông tin phòng.</>;

  const [dates, setDates] = useState([]);
  const [data, setData] = useState();
  const [roomCurrent, setRoomCurrent] = useState({});
  const [optionSelected, setOptionSelected] = useState("");
  const navigate = useNavigate();
  console.log("dates", dates);
  const handlerSelectRoom = async (e) => {
    const room = service.find((item) => item.id == e);
    setOptionSelected(e);
    if (room) {
      setRoomCurrent(room);
      const { data } = await axios.get(
        `${baseURL}/api/studio-post/calendar-price?room=${room.id}&tenantId=${room.TenantId}`
      );
      setDates(data);
    }
  };
  const getListData = (value) => {
   
    // console.log(moment("2023-03-16 00:00:00").isSame(moment(value.$d), "day"));
    let listDat = [];
    if (!optionSelected) return listDat;
    if (dates.length < 1) {
      return (listDat = [
        {
          priceDate: roomCurrent.PriceByDate,
          priceHour: roomCurrent.PriceByHour,
          Open: roomCurrent.Open,
        },
      ]);
    } else {
      const date = dates.find((item) =>
        moment(item.DateTime).isSame(moment(value.$d), "day")
      );

      if (date) {
        return (listDat = [
          {
            priceDate: date.PriceByDate,
            priceHour: date.PriceByHour,
            Open: date.Open,
          },
        ]);
      } else {
        return (listDat = [
          {
            priceDate: roomCurrent.PriceByDate,
            priceHour: roomCurrent.PriceByHour,
            Open: roomCurrent.Open,
          },
        ]);
      }
    }
    // let bl = dates?.includes(value.date());
    // if (bl) {
    //   listDat = [{ priceDate: 3000000, priceHour: 300000, isVisible: true }];
    // } else {
    //   listDat = [{ priceDate: 1000000, priceHour: 100000, isVisible: false }];
    // }
    // return listDat;
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);

    return (
      <ul className="events">
        {listData.map((item, idx) => (
          <li key={idx} onClick={() => setData(item)}>
            <div>
              {item.Open ? (
                <Button
                  className="button"
                  style={{
                    background: "#ffff",
                    color: "red",
                    border: "1px solid red",
                  }}
                >
                  Đóng
                </Button>
              ) : (
                <Button
                  style={{
                    background: "#ffff",
                    color: "green",
                    border: "1px solid green",
                  }}
                  className="button"
                >
                  Mở
                </Button>
              )}

              <div style={{ display: "flex", flexDirection: "column" }}>
                <p>{`${converPriceVND(item.priceHour)}/giờ`}</p>
                <p>{`${converPriceVND(item.priceDate)}/ngày`}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  };
  return (
    <>
      <Breadcrumb style={{ fontSize: "17px", marginBottom: "1rem" }}>
        <Breadcrumb.Item
          onClick={() => navigate("/posts")}
          style={{ color: "#03ac84", cursor:"pointer" }}
        >
          Quản lí bài đăng
        </Breadcrumb.Item>
        <Breadcrumb.Item
          style={{
            color: "",
            cursor: "pointer",
          }}>
          Lịch và giá
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="calendar-price">
        <Row gutter={20}>
          <Col span={18}>
            <div style={{ position: "relative" }}>
              <Calendar
                className="calendar-cus"
                dateCellRender={dateCellRender}
                mode="month"
                onSelect={(e) => {
                  console.log(e);
                }}

                //   monthCellRender={monthCellRender}
              />
              <Select
                onChange={handlerSelectRoom}
                defaultValue={""}
                className="selectRoom"
                size="large"
                style={{ minWidth: "400px" }}>
                <Option value={""}>Chọn phòng....</Option>
                {service.map((item) => {
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.Name}
                    </Option>
                  );
                })}
              </Select>
            </div>
          </Col>
          <Col span={6}>
            <div style={{ marginTop: "54px" }}>
              <Form name="form_item_path" layout="vertical">
                <h3
                  style={{ textTransform: "capitalize", marginBottom: "1rem" }}>
                  Giá & chính sách theo giờ
                </h3>
                <Form.Item label="Giá áp đụng (đ/giờ)">
                  <Input value={converPriceVND(data?.priceHour)} size="large" />
                </Form.Item>
                <Form.Item label="Đặt cọc (% đơn đặt)">
                  <Input size="large" />
                </Form.Item>
                <Form.Item label="Hình thức thanh toán">
                  <Input size="large" />
                </Form.Item>
                <Form.Item label="Huỷ đơn miễm phí">
                  <Input size="large" />
                </Form.Item>
                <Form.Item label="Phí vắng mặt">
                  <Input size="large" />
                </Form.Item>
              </Form>
              <Form name="form_item_path" layout="vertical">
                <h3
                  style={{ textTransform: "capitalize", marginBottom: "1rem" }}>
                  Giá & chính sách theo ngày
                </h3>
                <Form.Item label="Giá áp đụng (đ/ngày)">
                  <Input value={converPriceVND(data?.priceDate)} size="large" />
                </Form.Item>
                <Form.Item label="Đặt cọc (% đơn đặt)">
                  <Input size="large" />
                </Form.Item>
                <Form.Item label="Hình thức thanh toán">
                  <Input size="large" />
                </Form.Item>
                <Form.Item label="Huỷ đơn miễm phí">
                  <Input size="large" />
                </Form.Item>
                <Form.Item label="Phí vắng mặt">
                  <Input size="large" />
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
