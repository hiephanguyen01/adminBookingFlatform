import { CreditCardOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Col, Divider, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./OrderDetail.scss";
const OrderDetail = () => {
  const navigate = useNavigate();
  return (
    <div className="OrderDetail">
      <div className="chile" style={{ padding: "20px" }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <p
              style={{ display: "inline", cursor: "pointer" }}
              onClick={() => navigate("/affiliate/order")}>
              Đơn đặt
            </p>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <p style={{ color: "#03AC84" }}>Chi tiết đơn đặt</p>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Divider />
      <div className="chile" style={{ padding: "20px" }}>
        <h1 className="title">CHI TIẾT ĐƠN ĐẶT</h1>
        <Divider />
        <h3 className="sub-title">
          <UserOutlined />
          &nbsp; THÔNG TIN DỊCH VỤ/SẢN PHẨM
        </h3>
        <Row>
          <Col sm={24} xs={24} md={12}>
            <Row>
              <Col sm={24} xs={24} md={8}>
                <div className="label">Mã bài đăng</div>
              </Col>
              <Col sm={24} xs={24} md={16}>
                <div className="value">:&emsp;&emsp;&emsp;728990</div>
              </Col>
            </Row>
          </Col>
          <Col sm={24} xs={24} md={12}>
            <Row>
              <Col sm={24} xs={24} md={8}>
                <div className="label">Đối tác</div>
              </Col>
              <Col sm={24} xs={24} md={16}>
                <div className="value">:&emsp;&emsp;&emsp; Wisteria Studio</div>
              </Col>
            </Row>
          </Col>
          <Col sm={24} xs={24} md={12}>
            <Row>
              <Col sm={24} xs={24} md={8}>
                <div className="label">Tên dịch vụ/sản phẩm</div>
              </Col>
              <Col sm={24} xs={24} md={16}>
                <div className="label">
                  :&emsp;&emsp;&emsp;Wisteria Studio - cho thuê studio giá rẻ
                </div>
              </Col>
            </Row>
          </Col>
          <Col sm={24} xs={24} md={12}>
            <Row>
              <Col sm={24} xs={24} md={8}>
                <div className="label">Phân loại</div>
              </Col>
              <Col sm={24} xs={24} md={16}>
                <div className="value">:&emsp;&emsp;&emsp;Studio</div>
              </Col>
            </Row>
          </Col>
          <Col sm={24} xs={24} md={12}>
            <Row>
              <Col sm={24} xs={24} md={8}>
                <div className="label">Chi tiết dịch vụ/sản phẩm</div>
              </Col>
              <Col sm={24} xs={24} md={16}>
                <div className="value">
                  :&emsp;&emsp;&emsp;Korea Premium- Phối cảnh Hàn quốc 1 phòng x
                  2 giờ
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Divider />
        <h3 className="sub-title">
          <CreditCardOutlined />
          &nbsp; THÔNG TIN ĐƠN ĐẶT
        </h3>
        <Row>
          <Col sm={24} xs={24} md={12}>
            <Row>
              <Col sm={24} xs={24} md={8}>
                <div className="label">Mã đơn đặt</div>
              </Col>
              <Col sm={24} xs={24} md={16}>
                <div className="value">:&emsp;&emsp;&emsp;094733</div>
              </Col>
            </Row>
          </Col>
          <Col sm={24} xs={24} md={12}>
            <Row>
              <Col sm={24} xs={24} md={8}>
                <div className="label">Giá trị đơn đặt</div>
              </Col>
              <Col sm={24} xs={24} md={16}>
                <div className="label" style={{ color: "red" }}>
                  :&emsp;&emsp;&emsp;3.000.000 VND
                </div>
              </Col>
            </Row>
          </Col>
          <Col sm={24} xs={24} md={12}>
            <Row>
              <Col sm={24} xs={24} md={8}>
                <div className="label">Người đặt</div>
              </Col>
              <Col sm={24} xs={24} md={16}>
                <div className="value">:&emsp;&emsp;&emsp;Huỳnh Thiên An</div>
              </Col>
            </Row>
          </Col>
          <Col sm={24} xs={24} md={12}>
            <Row>
              <Col sm={24} xs={24} md={8}>
                <div className="label">% Hoa hồng</div>
              </Col>
              <Col sm={24} xs={24} md={16}>
                <div className="value">:&emsp;&emsp;&emsp;20%</div>
              </Col>
            </Row>
          </Col>
          <Col sm={24} xs={24} md={12}>
            <Row>
              <Col sm={24} xs={24} md={8}>
                <div className="label">Ngày đặt</div>
              </Col>
              <Col sm={24} xs={24} md={16}>
                <div className="value">:&emsp;&emsp;&emsp;20/02/2022</div>
              </Col>
            </Row>
          </Col>
          <Col sm={24} xs={24} md={12}>
            <Row>
              <Col sm={24} xs={24} md={8}>
                <div className="label">Hoa hồng</div>
              </Col>
              <Col sm={24} xs={24} md={16}>
                <div className="label">:&emsp;&emsp;&emsp;304.000 VND</div>
              </Col>
            </Row>
          </Col>
          <Col sm={24} xs={24} md={12}>
            <Row>
              <Col sm={24} xs={24} md={8}>
                <div className="label">Thời gian thực hiện</div>
              </Col>
              <Col sm={24} xs={24} md={16}>
                <div className="label">
                  :&emsp;&emsp;&emsp;14:00 02/06/2022 - <br />
                  &nbsp;&emsp;&emsp;&emsp;16:00 02/06/2022
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OrderDetail;
