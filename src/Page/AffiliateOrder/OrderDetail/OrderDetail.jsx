import { CreditCardOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Col, Divider, Row } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handlerNameCategory, statusHandler } from "../../../../utils/category";
import { affiliateService } from "../../../services/AffiliateService";
import "./OrderDetail.scss";
import { commissionPercent, convertTimeUTC } from "../../../../utils/convert";
const OrderDetail = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const { data } = await affiliateService.getDetailOrdersPublisher(id);
      setData(data.data);
    })();
  }, [id]);
  
  return (
    <div className="OrderDetail">
      <div className="chile" style={{ padding: "20px" }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <p
              style={{ display: "inline", cursor: "pointer" }}
              onClick={() => navigate("/affiliate/order")}
            >
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
                <div className="value">
                  :&emsp;&emsp;&emsp;{data?.StudioRoom?.StudioPost?.id}
                </div>
              </Col>
            </Row>
          </Col>

          <Col sm={24} xs={24} md={12}>
            <Row>
              <Col sm={24} xs={24} md={8}>
                <div className="label">Đối tác</div>
              </Col>
              <Col sm={24} xs={24} md={16}>
                <div className="value">
                  :&emsp;&emsp;&emsp;{" "}
                  {data?.AffiliateUser?.firstName +
                    " " +
                    data?.AffiliateUser?.lastName}
                </div>
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
                  :&emsp;&emsp;&emsp;{data.StudioRoom?.StudioPost?.Name}
                </div>
              </Col>
            </Row>
          </Col>
          <Col sm={24} xs={24} md={12}>
            <Row>
              <Col sm={24} xs={24} md={8}>
                <div className="label">ID Publisher</div>
              </Col>
              <Col sm={24} xs={24} md={16}>
                <div className="value">
                  :&emsp;&emsp;&emsp; {data?.AffiliateUserId}
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
                <div className="value">
                  :&emsp;&emsp;&emsp;{handlerNameCategory(data?.category)}
                </div>
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
                  :&emsp;&emsp;&emsp;
                  {data?.StudioRoom?.Name}
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
                <div className="value">:&emsp;&emsp;&emsp;{data?.Id}</div>
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
                  :&emsp;&emsp;&emsp;
                  {data?.BookingValueBeforeDiscount?.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  }) || 0}
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
                <div className="value">
                  :&emsp;&emsp;&emsp;{data?.BookingUserName}
                </div>
              </Col>
            </Row>
          </Col>
          <Col sm={24} xs={24} md={12}>
            <Row>
              <Col sm={24} xs={24} md={8}>
                <div className="label">% Hoa hồng</div>
              </Col>
              <Col sm={24} xs={24} md={16}>
                <div className="value">
                  :&emsp;&emsp;&emsp;
                  {data.CommissionPercent*100}
                  %
                </div>
              </Col>
            </Row>
          </Col>
          <Col sm={24} xs={24} md={12}>
            <Row>
              <Col sm={24} xs={24} md={8}>
                <div className="label">Ngày đặt</div>
              </Col>
              <Col sm={24} xs={24} md={16}>
                <div className="value">
                  :&emsp;&emsp;&emsp;
                  {moment(data?.CreationTime).format("DD-MM-YYYY HH:mm")}
                </div>
              </Col>
            </Row>
          </Col>
          <Col sm={24} xs={24} md={12}>
            <Row>
              <Col sm={24} xs={24} md={8}>
                <div className="label">Trang thái đơn đặt</div>
              </Col>
              <Col sm={24} xs={24} md={16}>
                <div className="value">
                  :&emsp;&emsp;&emsp;
                  {statusHandler(data?.BookingStatus, data.PaymentStatus)}
                </div>
              </Col>
            </Row>
          </Col>
          <Col sm={24} xs={24} md={12}>
            <Row>
              <Col sm={24} xs={24} md={8}>
                <div className="label">Hoa hồng tạm tính</div>
              </Col>
              <Col sm={24} xs={24} md={16}>
                <div className="label">
                  :&emsp;&emsp;&emsp;{" "}
                  {data.BookingStatus !== 2
                    ? data?.AffiliateCommission?.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })
                    : 0}
                </div>
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
                  :&emsp;&emsp;&emsp;
                  {convertTimeUTC(
                    data?.OrderByTimeFrom || data?.OrderByDateFrom,
                    data?.OrderByTime
                  )}
                  - <br />
                  &nbsp;&emsp;&emsp;&emsp;
                  {convertTimeUTC(
                    data?.OrderByTimeTo || data?.OrderByDateTo,
                    data?.OrderByTime
                  )}
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
