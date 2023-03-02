import { Checkbox, Col, Divider, Form, Image, Input, Row } from "antd";
import React from "react";
import { IMG } from "../../../../../utils/baseURL";
import "../Detail.scss";

export const StudioRoom = ({ data, category }) => {
  if (!data) return null;

  const listCheckBox = [
    {
      label: "Quạt",
      value: data.HasFan,
    },
    {
      label: "Máy lạnh",
      value: data.HasAirConditioner,
    },
    {
      label: "Phòng thay đồ",
      value: data.HasDressingRoom,
    },
    {
      label: "Nhà vệ sinh riêng",
      value: data.HasWC,
    },
    {
      label: "Camera an ninh",
      value: data.HasCamera,
    },
    {
      label: "Wifi",
      value: data.HasWifi,
    },
    {
      label: "Chỗ đậu xe máy",
      value: data.HasMotorBikeParking,
    },
    {
      label: "Chỗ đậu xe ô tô",
      value: data.HasCarParking,
    },
    {
      label: "Nhân viên hỗ trợ",
      value: data.HasSupporter,
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
              label="Tên phòng"
              // name="Id"
            >
              <Input value={data.Name} style={{ padding: "10px" }} />
            </Form.Item>
            <Form.Item
              label="Giá niêm yết (đ/ngày)"
              // name="Id"
            >
              <Input value={data.PriceByDate} style={{ padding: "10px" }} />
            </Form.Item>{" "}
            <Form.Item
              label="Giá niêm yết (đ/giờ)"
              // name="Id"
            >
              <Input value={data.PriceByHour} style={{ padding: "10px" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Số đơn đặt"
              // name="Id"
            >
              <Input value={data.Bookings.length} style={{ padding: "10px" }} />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Diện tích (m2)
              "
                  // name="Id"
                >
                  <Input value={data.Area} style={{ padding: "10px" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Chiều dài (m)"
                  // name="Id"
                >
                  <Input value={data.Length} style={{ padding: "10px" }} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Chiều rộng (m)
              "
                  // name="Id"
                >
                  <Input value={data.Width} style={{ padding: "10px" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Chiều cao trần (m)"
                  // name="Id"
                >
                  <Input value={data.Height} style={{ padding: "10px" }} />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Divider />

            <Form.Item label="Thiết bị có sẵn">
              <Row gutter={[32, 32]}>
                <Col span={12}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: ".5rem",
                    }}>
                    <div style={{ flex: 1 }}>
                      <Checkbox value={data.HasBackground}>
                        Hệ thống đèn
                      </Checkbox>
                    </div>
                    <Input style={{ flex: 4 }} size="large" />
                  </div>
                </Col>
                <Col span={12}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: ".5rem",
                    }}>
                    <div style={{ flex: 1 }}>
                      <Checkbox>Phông nền</Checkbox>
                    </div>
                    <Input style={{ flex: 4 }} size="large" />
                  </div>
                </Col>
                <Col span={24}>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      gap: "2rem",
                    }}>
                    <Checkbox checked={data.HasTable}>Bàn</Checkbox>
                    <Checkbox checked={data.HasChair}>Ghế</Checkbox>
                    <Checkbox checked={data.HasSofa}>Sofa</Checkbox>
                    <Checkbox checked={data.HasFlower}>Hoa tươi</Checkbox>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: ".5rem",
                      }}>
                      <Checkbox checked={data.HasOtherDevice}>Khác</Checkbox>
                      <Input value={data.OtherDeviceDescription} size="large" />
                    </div>
                  </div>
                </Col>
              </Row>
            </Form.Item>
            <Col span={24}>
              <Divider />
              <Form.Item className="label" label="Tiện ích đi kèm">
                <Col span={24}>
                  <Row>
                    <Col span={20}>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                          gap: "2rem",
                        }}>
                        {listCheckBox.map((item) => {
                          return (
                            <Checkbox checked={item.value}>
                              {item.label}
                            </Checkbox>
                          );
                        })}
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Divider />
              <Row gutter={[32, 32]}>
                <Col span={12}>
                  <Form.Item
                    label="Số khách tối đa
              "
                    // name="Id"
                  >
                    <Input
                      value={data.MaximumCustomer}
                      style={{ padding: "10px" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Phụ thu phát sinh (đ/khách)"
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
            </Col>
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
                        <Image height={100} src={IMG(item)} />
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
