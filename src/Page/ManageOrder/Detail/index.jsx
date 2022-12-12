import { Button, Checkbox, Form, Input, Image } from "antd";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { registerPartnerService } from "../../../services/RegisterPartnerService";
import "./detail.scss";
import moment from "moment";
import { baseURL, fallBackImg } from "../../../../utils/baseURL";
import { Loading } from "../../../Components/Loading";
import { orderService } from "../../../services/OrderService";
import "./detail.scss";

const Detail = ({ modify = false }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  useEffect(() => {
    (async () => {
      await getPartnerDetailById(id);
      setLoading(false);
    })();
  }, []);

  const getPartnerDetailById = async (id) => {
    try {
      const { data } = await orderService.ge(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <Loading />;
  const onFinish = () => {};
  const handleCheckBox = () => {};
  const category = useLocation();
  console.log(category);
  return (
    <section className="detail-order">
      <header className="booking-info">
        <p>THÔNG TIN ĐƠN ĐẶT</p>
        <Form
          layout="vertical"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
          style={{ marginTop: "20px" }}
        >
          <Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
              }}
              label="Mã đơn đặt"
              name="code"
            >
              <Input style={{ padding: "10px" }} />
            </Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
                marginLeft: "15px",
              }}
              label="Số định danh"
              name="identityCode"
            >
              <Input style={{ padding: "10px" }} />
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
              }}
              label="Mã bài đăng"
              name="postId"
            >
              <Input style={{ padding: "10px" }} />
            </Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
                marginLeft: "15px",
              }}
              label="Tên khách hàng"
              name="BookingUserName"
            >
              <Input style={{ padding: "10px" }} />
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
              }}
              label="Tên phòng"
              name="studioName"
            >
              <Input style={{ padding: "10px" }} />
            </Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
                marginLeft: "15px",
              }}
              label="Số  điện thoại"
              name="phoneNumer"
            >
              <Input style={{ padding: "10px" }} />
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
              }}
              label="Ngày đặt đơn"
              name="createdAt"
            >
              <Input style={{ padding: "10px" }} />
            </Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
                marginLeft: "15px",
              }}
              label="Email"
              name="email"
            >
              <Input style={{ padding: "10px" }} />
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
              }}
              label="Ngày thực hiện"
              name="startAt"
            >
              <Input style={{ padding: "10px" }} />
            </Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
                marginLeft: "15px",
              }}
              label="Trạng thái đơn đặt"
              name="bookingStatus"
            >
              <Input style={{ padding: "10px" }} />
            </Form.Item>
          </Form.Item>
        </Form>
      </header>
      <article className="total-and-discount-info">
        <Form
          layout="vertical"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
          style={{ marginTop: "20px" }}
        >
          <Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
              }}
              label="Tổng tạm tính"
              name="BookingValue"
            >
              <Input style={{ padding: "10px" }} />
            </Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
                marginLeft: "15px",
              }}
              label="Mã khuyến mãi"
              name="discount"
            >
              <Input style={{ padding: "10px" }} />
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
              }}
              label="Khuyến mãi"
              name="discount"
            >
              <Input style={{ padding: "10px" }} />
            </Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
                marginLeft: "15px",
              }}
              label="Tổng tiền"
              name="BookingValueBeforeDiscount"
            >
              <Input style={{ padding: "10px" }} />
            </Form.Item>
          </Form.Item>
        </Form>
      </article>
      <article className="payment-info">
        <p>THÔNG TIN THANH TOÁN</p>
        <Form
          layout="vertical"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
          style={{ marginTop: "20px" }}
        >
          <Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
              }}
              label="Hình thức thanh toán"
              name="paymentTypeOnline"
            >
              <Input style={{ padding: "10px" }} />
            </Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
                marginLeft: "15px",
              }}
              label="Trạng thái thanh toán"
              name="paymentStatus"
            >
              <Input style={{ padding: "10px" }} />
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
              }}
              label="Cổng thanh toán"
              name=""
            >
              <Input style={{ padding: "10px" }} />
            </Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
                marginLeft: "15px",
              }}
              label="Tiền cọc"
              name="deposit"
            >
              <Input style={{ padding: "10px" }} />
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
              }}
              label="Tên phòng"
              name="studioName"
            >
              <Input style={{ padding: "10px" }} />
            </Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
                marginLeft: "15px",
              }}
              label="Số  điện thoại"
              name="phoneNumer"
            >
              <Input style={{ padding: "10px" }} />
            </Form.Item>
          </Form.Item>
        </Form>
      </article>
      <article className="cancel-info">
        <p>HỦY ĐƠN</p>
        <Form
          layout="vertical"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
          style={{ marginTop: "20px" }}
        >
          <Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
              }}
              label="Ngày hủy"
              name="cancelDate"
            >
              <Input style={{ padding: "10px" }} />
            </Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
                marginLeft: "15px",
              }}
              label="Hủy đơn miễn phí"
              name="freeCancelationBefore"
            >
              <Input style={{ padding: "10px" }} />
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
              }}
              label="Lý do hủy đơn"
              name="reasonForCancelation"
            >
              <Input style={{ padding: "10px" }} />
            </Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
                marginLeft: "15px",
              }}
              label="Hạn hủy đơn miễn phí"
              name="deadlineForFreeCancelation"
            >
              <Input style={{ padding: "10px" }} />
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
              }}
              label="Số tài khoản nhận hoàn tiền"
              name="bankAccountForRefund"
            >
              <Input style={{ padding: "10px" }} />
            </Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
                marginLeft: "15px",
              }}
              label="Phí hủy đơn"
              name="cancelationFee"
            >
              <Input style={{ padding: "10px" }} />
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
              }}
              label="Số tiền được hoàn"
              name="refundAmount"
            >
              <Input style={{ padding: "10px" }} />
            </Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
                margin: "30px 0 0 15px",
              }}
              name="refunded"
            >
              <Checkbox size="large" onChange={handleCheckBox}>
                Đã hoàn tiền
              </Checkbox>
            </Form.Item>
          </Form.Item>
        </Form>
      </article>
      <footer className="detail-footer">
        <p>VẮNG MẶT</p>
        <Form
          layout="vertical"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
          style={{ marginTop: "20px" }}
        >
          <Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
              }}
              label="Phí vắng mặt"
              name="absentFee"
            >
              <Input style={{ padding: "10px" }} />
            </Form.Item>
            {modify && (
              <Form.Item
                style={{
                  width: "49%",
                  display: "inline-block",
                  margin: "33px 0 0 15px",
                }}
              >
                <Button size="large" type="primary">
                  Lưu thay đổi
                </Button>
              </Form.Item>
            )}
          </Form.Item>
        </Form>
      </footer>
    </section>
  );
};

export default Detail;
