import { Breadcrumb, Col, Divider, Image, Row } from "antd";
import React, { useEffect, useState } from "react";
import { EditOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Pagination,
  Select,
  Space,
  Table,
  Tag,
  Checkbox,
} from "antd";
import { orderService } from "../../../../services/OrderService";
import moment from "moment";
import TextArea from "antd/es/input/TextArea";
import { BASEURL_IMG } from "../../../../../utils/baseURL";
import "../Detail.scss";

export const MakeupRoom = ({ data, category }) => {
  console.log("detal", data);
  if (!data) return null;

  const listCheckBox = [
    {
      label: "Làm tóc",
      // value: data.HasFan,
    },
    {
      label: "Trang điểm",
      // value: data.HasAirConditioner,
    },
    {
      label: "Mỹ phẩm",
      // value: data.HasDressingRoom,
    },
    {
      label: "Mỹ phẩm cao cấp",
      // value: data.HasWC,
    },
    {
      label: "Phụ kiện",
      // value: data.HasCamera,
      input: <Input />,
    },
    {
      label: "Số lượng kiểu trang điểm",
      // value: data.HasCamera,
      input: <Input />,
    },
  ];

  return (
    <>
      <Form
        className="InfoGeneral"
        // initialValues={{
        //   id: data.id,
        //   Name: data.name,
        //   Address: data.Address,
        //   BookingCount: data.BookingCount,
        //   Description: data.Description,
        //   LastModificationTime: data.LastModificationTime,
        //   CreationTime: data.CreationTime,
        //   Note: data.Note,
        // }}
        layout="vertical"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 24,
        }}
        onFinish={(e) => onFinish(e)}
        autoComplete="off"
        style={{ marginTop: "20px" }}
      >
        <Row gutter={32}>
          <Col span={12}>
            <Form.Item
              label="Loại dịch vụ"
              // name="Id"
            >
              <Input value={data.Name} style={{ padding: "10px" }} />
            </Form.Item>
            <Form.Item
              label="Giá niêm yết (đ/gói)"
              // name="Id"
            >
              <Input value={data.PriceByDate} style={{ padding: "10px" }} />
            </Form.Item>{" "}
            <Form.Item
              label="Thời gian thực hiện"
              // name="Id"
            >
              <Input style={{ padding: "10px" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Tên dịch vụ"
              // name="Id"
            >
              <Input value={data.Name} style={{ padding: "10px" }} />
            </Form.Item>
            <Form.Item
              label="Số  đơn đặt
              "
              // name="Id"
            >
              <Input value={data.Bookings.length} style={{ padding: "10px" }} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Divider />

            <Form.Item>
              <Row gutter={[32, 32]}>
                <Col span={12}>
                  <Form.Item
                    label="Địa điểm"
                    // name="Id"
                  >
                    <Input value={data.Name} style={{ padding: "10px" }} />
                  </Form.Item>
                  <Form.Item
                    label="Số khách tối đa"
                    // name="Id"
                  >
                    <Input
                      value={data.PriceByDate}
                      style={{ padding: "10px" }}
                    />
                  </Form.Item>{" "}
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Địa chỉ cụ thể"
                    // name="Id"
                  >
                    <Input value={data.Name} style={{ padding: "10px" }} />
                  </Form.Item>
                  <Form.Item
                    label="Phụ thu phát sinh (đ/khách)
              "
                    // name="Id"
                  >
                    <Input
                      value={data.Bookings.length}
                      style={{ padding: "10px" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Divider />
            <Form.Item className="label" label="Dịch vụ CHƯA bao gồm:">
              <Col span={24}>
                <Form.Item>
                  <Input
                    value={data.Bookings.length}
                    style={{ padding: "10px" }}
                  />
                </Form.Item>
              </Col>
            </Form.Item>
          </Col>
          <Divider />
          <Col span={20}>
            <Form.Item
              label="Hình ảnh"
              // name="Id"
            >
              <div
                style={{ display: "flex", gap: "1rem", alignItems: "stretch" }}
              >
                {data.Image.map((item, idx) => {
                  if (idx === 0) {
                    return (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: ".5rem",
                        }}
                      >
                        <Image height={100} src={`${BASEURL_IMG}/${item}`} />
                        <span>Ảnh bìa</span>
                      </div>
                    );
                  }
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: ".5rem",
                      }}
                    >
                      <Image
                        style={{ objectFit: "cover" }}
                        height={100}
                        src={`${BASEURL_IMG}/${item}`}
                      />
                      <span>Ảnh {idx}</span>
                    </div>
                  );
                })}
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
