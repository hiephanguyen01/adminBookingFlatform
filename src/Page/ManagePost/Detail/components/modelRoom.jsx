import {
  Breadcrumb,
  Checkbox,
  Col,
  Divider,
  Form,
  Image,
  Input,
  Row,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { Link } from "react-router-dom";
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
      {/* <Breadcrumb style={{ fontSize: "17px" }}>
        <Breadcrumb.Item onClick={() => navigate("/posts")}>
          <Link to={"/posts"} style={{ color: "#03ac84", cursor:"pointer" }}>
            Quản lí bài đăng
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Thông tin chung</Breadcrumb.Item>
      </Breadcrumb> */}
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
              <Input value={data.PriceByDate} style={{ padding: "10px" }} />
            </Form.Item>{" "}
            <Form.Item
              label="Giá niêm yết (đ/giờ)"
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
              <Input value={data?.Bookings?.length || 0 } style={{ padding: "10px" }} />
            </Form.Item>

            <div style={{ display: "flex", gap: "16px", flex: "1 1 50%" }}>
              <Form.Item
                style={{ flex: "1" }}
                label="Thời gian thực hiện 
              "
                // name="Id"
              >
                <Input
                  value={4}
                  style={{ padding: "10px" }}
                />
              </Form.Item>
              <Form.Item
                style={{ flex: "1" }}
                label="Số sản phẩm tối đa
              "
                // name="Id"
              >
                <Input
                  value={data?.BookingCount || 0}
                  style={{ padding: "10px" }}
                />
              </Form.Item>
            </div>
          </Col>
          <Divider />
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
