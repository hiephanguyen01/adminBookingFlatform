import { Checkbox, Col, Divider, Form, Image, Input, Row } from "antd";
import React from "react";
import { IMG } from "../../../../../utils/baseURL";
import { convertTimeUTC } from "../../../../../utils/convert";
import "../Detail.scss";

export const MakeupRoom = ({ data, category }) => {
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
              <Input
                value={convertTimeUTC(data.CreationTime)}
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
              label="Số  đơn đặt
              "
              // name="Id"
            >
              <Input value={data.Bookings.length} style={{ padding: "10px" }} />
            </Form.Item>
          </Col>
          <Col span={18}>
            <Form.Item>
              <label className="label">Dịch vụ ĐÃ bao gồm:</label>
              <Row gutter={[32, 32]}>
                {/* <Col span={12}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".5rem",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <Checkbox >Hệ thống đèn</Checkbox>
                  </div>
                  <Input style={{ flex: 4 }} size="large" />
                </div>
              </Col> */}

                <Col span={24}>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      gap: "2rem",
                    }}
                  >
                    <Checkbox>Làm tóc</Checkbox>
                    <Checkbox>Trang điểm</Checkbox>
                    <Checkbox>Mỹ phẩm</Checkbox>
                    <Checkbox>Mỹ phẩm cao cấp</Checkbox>
                    <div
                      style={{
                        display: "flex",
                        gap: ".8rem",
                        alignItems: "center",
                        flex: "1",
                      }}
                    >
                      <Checkbox>Phụ kiện </Checkbox>
                      <Input style={{ flex: 4 }} size="large" />
                    </div>
                  </div>
                </Col>

                <Col span={8}>
                  <div
                    style={{
                      display: "flex",
                      gap: ".8rem",
                      alignItems: "center",
                      flex: "1",
                    }}
                  >
                    <span>Số lượng kiểu trang điểm</span>
                    <Input size="large" style={{ width: "20%" }}></Input>
                  </div>
                </Col>
              </Row>
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
            <Form.Item>
              <label className="label">Dịch vụ CHƯA bao gồm:</label>
              <Col span={24}>
                <Form.Item>
                  <Input
                    value={
                      "Phí đi theo để dặm phấn, chỉnh tóc, thay trang phục"
                    }
                    style={{ padding: "10px" }}
                  />
                </Form.Item>
              </Col>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Divider />
            <Form.Item>
              <label className="label">Mô tả thêm</label>
              <Col span={24}>
                <Form.Item>
                  <Input style={{ padding: "10px" }} />
                </Form.Item>
              </Col>
            </Form.Item>
          </Col>
          <Divider />
          <Col span={24}>
            <Row gutter={[32, 32]}>
              <Col span={12}>
                <Row>
                  <label className="label">Thiết lập chính sách theo giờ</label>
                  <Col span={24}>
                    <Form.Item
                      label="Đặt cọc"
                      // name="Id"
                    >
                      <Input
                        value={`${data.DepositByHour||0}%`}
                        style={{ padding: "10px" }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Hình thức thanh toán cọc"
                      // name="Id"
                    >
                      <Input
                        value={
                          data.DepositPaymentTypeByHour ? "Online" : "Offline"
                        }
                        style={{ padding: "10px" }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Huỷ miễn phí"
                      // name="Id"
                    >
                      <Input
                        value={data.FreeCancelByHour}
                        style={{ padding: "10px" }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Phí đơn đặt"
                      // name="Id"
                    >
                      <Input
                        value={`${data.CancelPriceByHour||0}%`}
                        style={{ padding: "10px" }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Phí vắng mặt"
                      // name="Id"
                    >
                      <Input
                        value={`${data.AbsentPriceByHour||0}%`}
                        style={{ padding: "10px" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>

              <Col span={12}>
                <Row>
                  <label className="label">
                    Thiết lập chính sách theo ngày
                  </label>
                  <Col span={24}>
                    <Form.Item
                      label="Đặt cọc"
                      // name="Id"
                    >
                      <Input
                        value={`${data.DepositByDate||0}%`}
                        style={{ padding: "10px" }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Hình thức thanh toán cọc"
                      // name="Id"
                    >
                      <Input
                        value={
                          data.DepositPaymentTypeByHour ? "Online" : "Offline"
                        }
                        style={{ padding: "10px" }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Huỷ miễn phí"
                      // name="Id"
                    >
                      <Input
                        value={data.FreeCancelByDate}
                        style={{ padding: "10px" }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Phí đơn đặt"
                      // name="Id"
                    >
                      <Input
                        value={`${data.CancelPriceByDate||0}%`}
                        style={{ padding: "10px" }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Phí vắng mặt"
                      // name="Id"
                    >
                      <Input
                        value={`${data.AbsentPriceByDate || 0}%`}
                        style={{ padding: "10px" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Divider/>
          <Col span={20}>
            <Form.Item>
              <label className="label">Hình ảnh</label>
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
                      }}
                    >
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
