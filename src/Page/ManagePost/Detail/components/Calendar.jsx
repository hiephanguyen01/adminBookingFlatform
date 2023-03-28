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
import { useNavigate } from "react-router-dom";
import { converPriceVND } from "../../../../../utils/convert";

export default function CalendarAndPrice({ service }) {
  if (service.length < 1) return <>Không có thông tin phòng.</>;

  const [dates, setDates] = useState([]);
  const [data, setData] = useState();
  const [optionSelected, setOptionSelected] = useState("");
  const navigate = useNavigate();

  const handlerSelectRomm = (e) => {
    console.log(e);
    setOptionSelected(e);
    setDates([8, 10, 15, 4, 5]);
  };
  const getListData = (value) => {
    let listDat = [];

    let bl = dates.includes(value.date());
    if (!optionSelected) return listDat;
    if (bl) {
      listDat = [{ priceDate: 3000000, priceHour: 300000, isVisible: true }];
    } else {
      listDat = [{ priceDate: 1000000, priceHour: 100000, isVisible: false }];
    }
    return listDat;
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item, idx) => (
          <li key={idx} onClick={() => setData(item)}>
            <div>
              {item.isVisible ? (
                <Button
                  style={{
                    background: "#ffff",
                    color: "green",
                    border: "1px solid green",
                  }}
                  className="button">
                  Mở
                </Button>
              ) : (
                <Button
                  className="button"
                  style={{
                    background: "#ffff",
                    color: "red",
                    border: "1px solid red",
                  }}>
                  Đóng
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
          style={{ color: "#03ac84" }}>
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
                onChange={handlerSelectRomm}
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
