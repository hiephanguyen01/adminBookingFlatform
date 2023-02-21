import { EditFilled } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Divider, Row, Table } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./LinkDetail.scss";
const LinkDetail = () => {
  const navigate = useNavigate();
  const dataSource = [
    {
      key: "1",
      price: "3.000.000đ / ngày  ",
      comissions: "20%",
      priceCommissions: "100.000 VND",
    },
    {
      key: "2",
      price: "500.000đ / giờ  ",
      comissions: "20%",
      priceCommissions: "500.000 VND",
    },
  ];
  const columns = [
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Tỉ lệ hoa hồng",
      dataIndex: "comissions",
      key: "comissions",
      render: (_, record) => (
        <>
          {_} &nbsp;
          <Button shape="circle" icon={<EditFilled />} />
        </>
      ),
    },
    {
      title: "Hoa hồng ",
      dataIndex: "priceCommissions",
      key: "priceCommissions",
    },
  ];

  return (
    <div className="LinkDetail">
      <div className="chile" style={{ padding: "20px" }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <p
              style={{ display: "inline", cursor: "pointer" }}
              onClick={() => navigate("/affiliate/link")}>
              Quản lý link
            </p>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <p style={{ color: "#03AC84" }}>Chi tiết link</p>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Divider />
      <div className="chile" style={{ padding: "20px" }}>
        <h1 className="title">THÔNG TIN TÀI KHOẢN</h1>
        <Divider />
        <Row>
          <Col sm={12}>
            <Col md={24}>
              <Row>
                <Col md={8}>
                  <div className="label">Tên dịch vụ/sản phẩm</div>
                </Col>
                <Col md={16}>
                  <div className="value">
                    :&emsp;&emsp;&emsp;Wisteria Studio - Cho thuê Studio chụp
                    hình
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md={24}>
              <Row>
                <Col md={8}>
                  <div className="label">Phân loại</div>
                </Col>
                <Col md={16}>
                  <div className="value">:&emsp;&emsp;&emsp; Studio</div>
                </Col>
              </Row>
            </Col>
            <Col md={24}>
              <Row>
                <Col md={8}>
                  <div className="label">Đã đặt</div>
                </Col>
                <Col md={16}>
                  <div className="value">:&emsp;&emsp;&emsp;2902</div>
                </Col>
              </Row>
            </Col>
            <Col md={24}>
              <Row>
                <Col md={8}>
                  <div className="label">Link xem trực tiếp</div>
                </Col>
                <Col md={16}>
                  <div className="value">
                    :&emsp;&emsp;&emsp;https://bookingstudio.dfd...
                  </div>
                </Col>
              </Row>
            </Col>
          </Col>
          <Col sm={12}>
            <Table dataSource={dataSource} columns={columns} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LinkDetail;
