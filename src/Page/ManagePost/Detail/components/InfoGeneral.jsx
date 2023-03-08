import { Breadcrumb, Col, Form, Image, Input, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IMG } from "../../../../../utils/baseURL";
import { convertTimeUTC } from "../../../../../utils/convert";

export const InfoGeneral = ({ data }) => {
  if (!data) return null;
  console.log("ìnochung", data);
  const navigate = useNavigate();
  return (
    <>
      <Breadcrumb style={{ fontSize: "17px" }}>
        <Breadcrumb.Item onClick={() => navigate("/posts")}>
          <Link to={"/posts"} style={{ color: "#03ac84" }}>
            Quản lí bài đăng
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Thông tin chung</Breadcrumb.Item>
      </Breadcrumb>
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
              label="Số định danh "
              // name="Id"
            >
              <Input value={data.IdentifierCode} style={{ padding: "10px" }} />
            </Form.Item>
            <Form.Item
              label="Tiêu đề"
              // name="Id"
            >
              <Input value={data.Name} style={{ padding: "10px" }} />
            </Form.Item>
            <Form.Item
              label="Thời gian làm việc (Buổi sáng)"
              // name="Id"
            >
              <Input value={data.OpenMorningHour} style={{ padding: "10px" }} />
            </Form.Item>{" "}
            <Form.Item
              label="Thời gian làm việc (Buổi chiều)"
              // name="Id"
            >
              <Input
                value={data.CloseAfternoonHour}
                style={{ padding: "10px" }}
              />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Ngày đăng">
                  <Input
                    value={convertTimeUTC(data.CreationTime)}
                    style={{ padding: "10px" }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Ngày cập nhật">
                  <Input
                    value={convertTimeUTC(data.LastModificationTime)}
                    style={{ padding: "10px" }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Ảnh đại diện"
              // name="Id"
            >
              <div style={{ display: "flex", gap: "1rem" }}>
                {data.Image.slice(0, 1).map((item) => {
                  return <Image width={200} src={IMG(item)} />;
                })}
              </div>
            </Form.Item>
            <Form.Item
              label="Hình Ảnh"
              // name="Id"
            >
              <div style={{ display: "flex", gap: "1rem" }}>
                {data.Image.slice(1).map((item) => {
                  return (
                    <Image
                      style={{ objectFit: "cover" }}
                      width={200}
                      src={IMG(item)}
                    />
                  );
                })}
              </div>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Mã bài đăng"
              // name="Id"
            >
              <Input value={data.id} style={{ padding: "10px" }} />
            </Form.Item>
            <Form.Item
              label="Địa chỉ"
              // name="Id"
            >
              <Input value={data.Address} style={{ padding: "10px" }} />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Số đơn đặt
              "
                  // name="Id"
                >
                  <Input
                    value={data.BookingCount}
                    style={{ padding: "10px" }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Trạng thái"
                  // name="Id"
                >
                  <Input
                    value={
                      data.IsVisible ? "Mở/có thể dặt" : "Đóng/không thể đặt"
                    }
                    style={{ padding: "10px" }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Ghi chú"
              // name="Id"
            >
              <Input value={data.Note} style={{ padding: "10px" }} />
            </Form.Item>
            <Form.Item
              label="Mô tả"
              // name="Id"
            >
              <TextArea
                rows={6}
                value={data.Description}
                style={{ padding: "10px" }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
