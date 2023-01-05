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

export const PhotographerRoom = ({ data, category }) => {
  console.log("detal", data);
  if (!data) return null;

  const listCheckBox = [
    {
      label: "Facebook",
      // value: data.HasFan,
      number: 1200,
    },
    {
      label: "Instagram",
      // value: data.HasFan,
      number: 1200,
    },
    {
      label: "Youtube",
      // value: data.HasFan,
      number: 1200,
    },
    {
      label: "TikTok",
      // value: data.HasFan,
      number: 1200,
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
              label="Giá niêm yết (đ/ngày)"
              // name="Id"
            >
              <Input
                value={data.PriceByDate.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
                style={{ padding: "10px" }}
              />
            </Form.Item>{" "}
            <Form.Item
              label="Giá niêm yết (đ/giờ)"
              // name="Id"
            >
              <Input
                value={data.PriceByHour.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
                style={{ padding: "10px" }}
              />
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
              label="Số đơn đặt
              "
              // name="Id"
            >
              <Input value={data.Bookings.length} style={{ padding: "10px" }} />
            </Form.Item>
          </Col>
          <Divider />
          <Col span={12}>
            <Form.Item
              label="Số thợ chụp"
              // name="Id"
            >
              <Input value={data.Name} style={{ padding: "10px" }} />
            </Form.Item>
            <Form.Item
              label="Số stylist
              "
              // name="Id"
            >
              <Input value={data.Bookings.length} style={{ padding: "10px" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Số thợ trang điểm"
              // name="Id"
            >
              <Input style={{ padding: "10px" }} />
            </Form.Item>
          </Col>
          <Divider />
          <Col span={12}>
            <Form.Item
              label="Trang phục"
              // name="Id"
            >
              <Input value={data.Name} style={{ padding: "10px" }} />
            </Form.Item>
            <Form.Item
              label="Bối cảnh
              "
              // name="Id"
            >
              <Input value={data.Bookings.length} style={{ padding: "10px" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Phụ kiện"
              // name="Id"
            >
              <Input style={{ padding: "10px" }} />
            </Form.Item>
            <Form.Item
              label="Số sản phẩm tối đa"
              // name="Id"
            >
              <Input style={{ padding: "10px" }} />
            </Form.Item>
          </Col>
          <Divider />
          <Col span={24}>
            <Form.Item className="label" label="Dịch vụ CHƯA bao gồm:">
              <Input />
            </Form.Item>
          </Col>
          <Divider />
          <Col span={24}>
            <Form.Item className="label" label="Ưu đãi">
              <Row gutter={[32, 32]}>
                <Col span={12}>
                  <Form.Item
                    label="Số sản phẩm tối đa"
                    // name="Id"
                  >
                    <TextArea rows={2} style={{ padding: "10px" }} />
                  </Form.Item>
                  <Form.Item
                    label="Hình ảnh"
                    // name="Id"
                  >
                    <TextArea rows={2} style={{ padding: "10px" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Make up"
                    // name="Id"
                  >
                    <TextArea rows={2} style={{ padding: "10px" }} />
                  </Form.Item>
                  <Form.Item
                    label="Khác"
                    // name="Id"
                  >
                    <TextArea rows={2} style={{ padding: "10px" }} />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
          </Col>
          <Divider />
          <Col span={24}>
            <Form.Item className="label" label="Sản phẩm bàn giao">
              <Row gutter={[32, 32]}>
                <Col span={12}>
                  <Form.Item
                    label="Ảnh (sản phẩm)"
                    // name="Id"
                  >
                    <TextArea rows={2} style={{ padding: "10px" }} />
                  </Form.Item>
                  <Form.Item
                    label="Video"
                    // name="Id"
                  >
                    <TextArea rows={2} style={{ padding: "10px" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Album"
                    // name="Id"
                  >
                    <TextArea rows={2} style={{ padding: "10px" }} />
                  </Form.Item>
                  <Form.Item
                    label="Thời gian bàn giao dự kiến"
                    // name="Id"
                  >
                    <TextArea rows={2} style={{ padding: "10px" }} />
                  </Form.Item>
                </Col>
              </Row>
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
                        <Image
                          height={100}
                          width={200}
                          src={`${BASEURL_IMG}/${item}`}
                        />
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
                        width={200}
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
