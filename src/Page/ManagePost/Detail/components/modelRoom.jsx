import { Checkbox, Col, Divider, Form, Image, Input, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { IMG } from "../../../../../utils/baseURL";
import "../Detail.scss";

export const ModelRoom = ({ data, category }) => {
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
        style={{ marginTop: "20px" }}>
        <Row gutter={32}>
          <Col span={12}>
            <Form.Item
              label="Số định danh"
              // name="Id"
            >
              <Input value={data.Name} style={{ padding: "10px" }} />
            </Form.Item>
            <Form.Item
              label="Tiêu đề (Tên của bạn)"
              // name="Id"
            >
              <Input value={data.PriceByDate} style={{ padding: "10px" }} />
            </Form.Item>{" "}
            <Form.Item
              label="Thời gian làm việc (Buổi sáng)"
              // name="Id"
            >
              <Input style={{ padding: "10px" }} />
            </Form.Item>
            <Form.Item
              label="Thời gian làm việc (Buổi chiều)"
              // name="Id"
            >
              <Input style={{ padding: "10px" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Mã bài đăng"
              // name="Id"
            >
              <Input value={data.Name} style={{ padding: "10px" }} />
            </Form.Item>
            <Form.Item
              label="Địa chỉ
              "
              // name="Id"
            >
              <Input value={data.Bookings.length} style={{ padding: "10px" }} />
            </Form.Item>
            <Form.Item
              label="Số  đơn đặt
              "
              // name="Id"
            >
              <Input value={data.Bookings.length} style={{ padding: "10px" }} />
            </Form.Item>
            <Form.Item
              label="Trang thái
              "
              // name="Id"
            >
              <Input style={{ padding: "10px" }} />
            </Form.Item>
          </Col>
          <Divider />
          <Col span={12}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Giới tính
              "
                  // name="Id"
                >
                  <Input value={data.Area} style={{ padding: "10px" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Chiều cao"
                  // name="Id"
                >
                  <Input value={data.Length} style={{ padding: "10px" }} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Ưu điểm"
              // name="Id"
            >
              <Input value={data.Name} style={{ padding: "10px" }} />
            </Form.Item>
            <Form.Item
              label="Giải thưởng
              "
              // name="Id"
            >
              <Input value={data.Bookings.length} style={{ padding: "10px" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Tuổi
              "
                  // name="Id"
                >
                  <Input value={data.Area} style={{ padding: "10px" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Số đo 3 vòng"
                  // name="Id"
                >
                  <Input value={data.Length} style={{ padding: "10px" }} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Mô tả"
              // name="Id"
            >
              <TextArea rows={6} style={{ padding: "10px" }} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Divider />
            <Form.Item className="label" label="Mạng xã hội">
              <Row gutter={[32, 32]}>
                {listCheckBox.map((item) => (
                  <Col span={6}>
                    <Form.Item>
                      <Checkbox>{item.label}</Checkbox>
                      <div
                        style={{
                          border: " 1px solid #B2B2B2",
                          padding: "12px 11px",
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: ".5rem",
                        }}>
                        <span>{item.number}</span>
                        <span>lượt theo dõi</span>
                      </div>
                    </Form.Item>
                  </Col>
                ))}
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
                style={{ display: "flex", gap: "1rem", alignItems: "stretch" }}>
                {data.Image.map((item, idx) => {
                  if (idx === 0) {
                    return (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: ".5rem",
                        }}>
                        <Image height={100} width={200} src={IMG(item)} />
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
                      }}>
                      <Image
                        style={{ objectFit: "cover" }}
                        height={100}
                        width={200}
                        src={IMG(item)}
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
