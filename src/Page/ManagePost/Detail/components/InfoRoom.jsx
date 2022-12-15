import React, { useState } from "react";
import {
  Space,
  Table,
  Tag,
  Breadcrumb,
  Modal,
  Form,
  Row,
  Col,
  Input,
  Image,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import TextArea from "antd/es/input/TextArea";
import { BASEURL_IMG } from "../../../../../utils/baseURL";
const { Column, ColumnGroup } = Table;

export const InfoRoom = ({ service }) => {
  console.log(service);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Breadcrumb style={{ fontSize: "17px" }}>
        <Breadcrumb.Item style={{ color: "#03ac84" }}>
          Quản lí bài đăng
        </Breadcrumb.Item>
        <Breadcrumb.Item>Thông tin phòng</Breadcrumb.Item>
      </Breadcrumb>
      {/* <Input size="large" placeholder="Tìm kiếm" prefix={<SearchOutlined />} /> */}

      <div style={{ marginTop: "2rem" }}>
        <Table dataSource={service}>
          <Column title="Tên Phòng" dataIndex="Name" key="Name" />
          <ColumnGroup title="Giá niêm yết">
            <Column
              title="đ/Giờ"
              dataIndex="PriceByHour"
              key="PriceByHour"
              render={(item) => {
                return Number(item).toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                });
              }}
            />
            <Column
              title="đ/Ngày"
              dataIndex="PriceByDate"
              key="PriceByDate"
              render={(item) => {
                return Number(item).toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                });
              }}
            />
          </ColumnGroup>
          <Column title="Số đơn đặt" dataIndex="address" key="address" />
          <Column
            title="Thao tác"
            key="action"
            render={(_, record) => {
              console.log(record);
              return (
                <a
                  onClick={() => {
                    setData(record);
                    showModal();
                  }}
                >
                  xem chi tiết
                </a>
              );
            }}
          />
        </Table>
      </div>
      <Modal
        // closable={false}
        footer={null}
        maskClosable={false}
        // title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width="1190px"
      >
        <Form
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
                label="Tên phòng "
                // name="Id"
              >
                <Input value={data?.Name} style={{ padding: "10px" }} />
              </Form.Item>
              <Form.Item
                label="Phong cách"
                // name="Id"
              >
                <Input value={data?.Style} style={{ padding: "10px" }} />
              </Form.Item>
              <Form.Item
                label="Diện tích"
                // name="Id"
              >
                <Input value={data?.Area} style={{ padding: "10px" }} />
              </Form.Item>
              <Form.Item label="Số đơn đặt">
                <Input style={{ padding: "10px" }} />
              </Form.Item>

              <Form.Item
                label="Ảnh đại diện"
                // name="Id"
              >
                <div style={{ display: "flex", gap: "1rem" }}>
                  {data?.Image?.map((item) => {
                    return <Image width={200} src={`${BASEURL_IMG}/${item}`} />;
                  })}
                </div>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Giá niêm yết(đ/giờ)"
                // name="Id"
              >
                <Input
                  value={Number(data?.PriceByHour).toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                  style={{ padding: "10px" }}
                />
              </Form.Item>
              <Form.Item
                label="Giá niêm yết(đ/ngày)"
                // name="Id"
              >
                <Input
                  value={Number(data?.PriceByDate).toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                  style={{ padding: "10px" }}
                />
              </Form.Item>

              <Form.Item
                label="Mô tả phòng"
                // name="Id"
              >
                <TextArea
                  rows={6}
                  value={data?.Description}
                  style={{ padding: "10px" }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};
