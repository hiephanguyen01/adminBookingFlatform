import { Col, Divider, Form, Image, Input, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { IMG } from "../../../../../utils/baseURL";
import "../Detail.scss";

export const PhotographerRoom = ({ data, category }) => {
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
        <Row gutter={[32,0]}>
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
            <Form.Item>
              <label className="label">Dịch vụ CHƯA bao gồm:</label>
              <Input
                value={"Phí đi theo để dặm phấn, chỉnh tóc, thay trang phục"}
                size="large"
              />
            </Form.Item>
          </Col>
          <Divider />
          <Col span={24}>
            <Form.Item>
              <label className="label">Ưu đãi</label>
              <Row gutter={32}>
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
            <Form.Item>
              <label className="label">Sản phẩm bàn giao</label>
              <Row gutter={[32, 32]}>
                <Col span={12}>
                  <Form.Item
                    label="Ảnh (sản phẩm)"
                    // name="Id"
                  >
                    <TextArea
                      value={"300 ảnh màu (25 x25 ) hoặc (30 x30) ép gỗ"}
                      rows={2}
                      style={{ padding: "10px" }}
                    />
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
                    <TextArea
                      value={
                        "01 Album size (30 x 30) hoặc (25 x 35) Laminate 30 trang, ép siêu mỏng theo công nghệ Hàn Quốc"
                      }
                      rows={2}
                      style={{ padding: "10px" }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Thời gian bàn giao dự kiến"
                    // name="Id"
                  >
                    <TextArea
                      value={"30 ngày (sau khi hoàn tất chụp ảnh)"}
                      rows={2}
                      style={{ padding: "10px" }}
                    />
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
              </Row>
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
                      }}
                    >
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
