import {
  CreditCardOutlined,
  IdcardOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Col, Row, Divider, Image } from "antd";
import React from "react";
import { IMG } from "../../../../../utils/baseURL";

const Session2 = ({ user }) => {
  return (
    <div className="chile" style={{ padding: "20px" }}>
      <h1 className="title">THÔNG TIN THANH TOÁN</h1>
      <Divider />
      <h3 className="sub-title">
        <UserOutlined />
        &nbsp; THÔNG TIN NGƯỜI KÍ THOẢ THUẬN
      </h3>
      <Row>
        <Col sm={24} xs={24} md={12}>
          <Row>
            <Col sm={24} xs={24} md={8}>
              <div className="label">Tên người đại diện pháp lý</div>
            </Col>
            <Col sm={24} xs={24} md={16}>
              <div className="value">
                :&emsp;&emsp;&emsp;{user?.representName}
              </div>
            </Col>
          </Row>
        </Col>
        <Col sm={24} xs={24} md={12}>
          <Row>
            <Col sm={24} xs={24} md={8}>
              <div className="label">Địa chỉ thường trú</div>
            </Col>
            <Col sm={24} xs={24} md={16}>
              <div className="value">
                :&emsp;&emsp;&emsp;
                {user?.addressPermanent}
              </div>
            </Col>
          </Row>
        </Col>
        <Col sm={24} xs={24} md={12}>
          <Row>
            <Col sm={24} xs={24} md={8}>
              <div className="label">Số điện thoại</div>
            </Col>
            <Col sm={24} xs={24} md={16}>
              <div className="value">:&emsp;&emsp;&emsp;{user?.phoneInfo}</div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider />
      <h3 className="sub-title">
        <CreditCardOutlined />
        &nbsp; THÔNG TIN TÀI KHOẢN THANH TOÁN
      </h3>
      <Row>
        <Col sm={24} xs={24} md={12}>
          <Row>
            <Col sm={24} xs={24} md={8}>
              <div className="label">Tên chủ tài khoản</div>
            </Col>
            <Col sm={24} xs={24} md={16}>
              <div className="value">
                :&emsp;&emsp;&emsp;{user?.bankAccountOwner}
              </div>
            </Col>
          </Row>
        </Col>
        <Col sm={24} xs={24} md={12}>
          <Row>
            <Col sm={24} xs={24} md={8}>
              <div className="label">Ngân hàng / Chi nhánh</div>
            </Col>
            <Col sm={24} xs={24} md={16}>
              <div className="value">
                :&emsp;&emsp;&emsp;
                {user?.bankName}
              </div>
            </Col>
          </Row>
        </Col>
        <Col sm={24} xs={24} md={12}>
          <Row>
            <Col sm={24} xs={24} md={8}>
              <div className="label">Số tài khoản</div>
            </Col>
            <Col sm={24} xs={24} md={16}>
              <div className="value">
                :&emsp;&emsp;&emsp;{user?.bankAccount}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider />
      <h3 className="sub-title">
        <IdcardOutlined />
        &nbsp; GIẤY TỜ TÙY THÂN
      </h3>
      <Row>
        <Col sm={24} xs={24} md={12}>
          <Row>
            <Col sm={24} xs={24} md={8}>
              <div className="label">Số CMND/CCCD</div>
            </Col>
            <Col sm={24} xs={24} md={16}>
              <div className="value">:&emsp;&emsp;&emsp;{user?.idNumber}</div>
            </Col>
          </Row>
        </Col>
        <Col sm={24} xs={24} md={12}>
          <Row>
            <Col sm={24} xs={24} md={8}>
              <div className="label">Ngày cấp</div>
            </Col>
            <Col sm={24} xs={24} md={16}>
              <div className="value">
                :&emsp;&emsp;&emsp;
                {user?.licenseDate}
              </div>
            </Col>
          </Row>
        </Col>
        <Col sm={24} xs={24} md={12}>
          <Row style={{ alignItems: "center" }}>
            <Col sm={24} xs={24} md={8}>
              <div className="label">Mặt trước CMND/CCCD</div>
            </Col>
            <Col sm={24} xs={24} md={16}>
              <div className="value">
                :&emsp;&emsp;&emsp;
                <Image
                  src={IMG(user?.CCCD1)}
                  width={230}
                  height={136}
                  style={{ borderRadius: "6px" }}
                />
              </div>
            </Col>
          </Row>
        </Col>
        <Col sm={24} xs={24} md={12}>
          <Row style={{ alignItems: "center" }}>
            <Col sm={24} xs={24} md={8}>
              <div className="label">Mặt trước CMND/CCCD</div>
            </Col>
            <Col sm={24} xs={24} md={16}>
              <div className="value">
                :&emsp;&emsp;&emsp;
                <Image
                  src={IMG(user?.CCCD2)}
                  width={230}
                  height={136}
                  style={{ borderRadius: "6px" }}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Session2;
