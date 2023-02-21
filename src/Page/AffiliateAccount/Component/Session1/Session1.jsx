import { Col, Divider, Row } from "antd";
import React from "react";

const Session1 = ({ user }) => {
  return (
    <div className="chile" style={{ padding: "20px" }}>
      <h1 className="title">THÔNG TIN TÀI KHOẢN</h1>
      <Divider />
      <Row>
        <Col md={12}>
          <Row>
            <Col md={8}>
              <div className="label">ID tài khoản</div>
            </Col>
            <Col md={16}>
              <div className="value">:&emsp;&emsp;&emsp;{user?.id}</div>
            </Col>
          </Row>
        </Col>
        <Col md={12}>
          <Row>
            <Col md={8}>
              <div className="label">Loại tài khoản</div>
            </Col>
            <Col md={16}>
              <div className="value">
                :&emsp;&emsp;&emsp;
                {user?.isPersonal ? "Cá nhân" : "Doanh nghiệp"}
              </div>
            </Col>
          </Row>
        </Col>
        <Col md={12}>
          <Row>
            <Col md={8}>
              <div className="label">Họ và tên</div>
            </Col>
            <Col md={16}>
              <div className="value">
                :&emsp;&emsp;&emsp;{user?.firstName + " " + user?.lastName}
              </div>
            </Col>
          </Row>
        </Col>
        <Col md={12}>
          <Row>
            <Col md={8}>
              <div className="label">Địa chỉ email</div>
            </Col>
            <Col md={16}>
              <div className="value">:&emsp;&emsp;&emsp;{user?.email}</div>
            </Col>
          </Row>
        </Col>
        <Col md={12}>
          <Row>
            <Col md={8}>
              <div className="label">Số điện thoại</div>
            </Col>
            <Col md={16}>
              <div className="value">:&emsp;&emsp;&emsp;{user?.phone}</div>
            </Col>
          </Row>
        </Col>
        <Col md={12}>
          <Row>
            <Col md={8}>
              <div className="label">Địa chỉ</div>
            </Col>
            <Col md={16}>
              <div className="value">:&emsp;&emsp;&emsp;{user?.address}</div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Session1;
