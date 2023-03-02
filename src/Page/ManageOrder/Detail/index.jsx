import { Breadcrumb, Button, Checkbox, Form, Input, Select } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { openNotification } from "../../../../utils/Notification";
import { Loading } from "../../../Components/Loading";
import { orderService } from "../../../services/OrderService";
import "./detail.scss";

import "./detail.scss";

const Detail = ({ modify = false }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [data, setData] = useState();
  const { state } = useLocation();
  useEffect(() => {
    (async () => {
      await getPartnerDetailById(id);
      setLoading(false);
    })();
  }, []);

  const getPartnerDetailById = async (id) => {
    try {
      const { data } = await orderService.getOrderById(id, state?.category);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <Loading />;
  const onFinish = async (value) => {
    setLoadingBtn(true);

    try {
      await orderService.updateOrderByid(
        { ...value, TenantId: data.TenantId },
        id,
        state.category
      );
      await getPartnerDetailById(id);
      setLoadingBtn(false);
      openNotification("success", "Cập nhật thành công!");
    } catch (error) {
      console.log(error);
      openNotification("error", "Cập nhật thất bại!");
      setLoadingBtn(false);
    }
  };
  const bookingStatus = (value) => {
    switch (value) {
      case 1:
        return "Đã hoàn thành";
      case 2:
        return "Đã huý";
      case 3:
        return "Vắng mặt";
      case 4:
        return "Chờ thực hiện";
    }
  };
  return (
    <section className="detail-order">
      <Breadcrumb
        style={{
          fontSize: "16px",
          marginBottom: "10px",
          fontWeight: "bold",
        }}>
        <Breadcrumb.Item>
          <Link to={"/manage-order"} style={{ color: "#10b08a" }}>
            Quản lý đơn đặt
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Chi tiết</Breadcrumb.Item>
      </Breadcrumb>
      <Form
        initialValues={{
          // Id: data.id,
          // StudioPostId: data.StudioRoom.id,
          // Name: data.StudioRoom.Name,
          // CreationTime: data.CreationTime,
          // OrderByDateFrom: data.OrderByDateFrom,
          // IdentifyCode: data.IdentifyCode,
          BookingUserName: data.BookingUserName,
          BookingPhone: data.BookingPhone,
          BookingEmail: data.BookingEmail,
          BookingStatus: data.BookingStatus,
          BookingValue: data.BookingValue,
          // BookingValueBeforeDiscount: data.BookingValueBeforeDiscount,
          // PromoCodeId: data.PromoCodeId,
          PaymentTypeOnline: data.PaymentTypeOnline,
          PaymentStatus: data.PaymentStatus,
          IsRefund: data.IsRefund,
        }}
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
        <header className="booking-info">
          <p>THÔNG TIN ĐƠN ĐẶT</p>

          <Form.Item
            style={{
              width: "49%",
              display: "inline-block",
            }}
            label="Mã đơn đặt"
            // name="Id"
          >
            <Input
              disabled
              value={data.IdentifyCode}
              style={{ padding: "10px" }}
            />
          </Form.Item>
          <Form.Item
            style={{
              width: "49%",
              display: "inline-block",
              marginLeft: "15px",
            }}
            label="Số định danh"
            // name="IdentifierCode"
          >
            <Input
              disabled
              value={data.IdentifierCode}
              style={{ padding: "10px" }}
            />
          </Form.Item>
          <Form.Item
            style={{
              width: "49%",
              display: "inline-block",
            }}
            label="Mã bài đăng"
            // name="StudioPostId"
          >
            <Input
              disabled
              value={
                data?.StudioRoom?.StudioPostId ||
                data?.PhotographerServicePackage?.PhotographerPostId ||
                data?.MakeupServicePackage?.MakeupPostId ||
                data?.ModelServicePackage?.ModelPostId
              }
              style={{ padding: "10px" }}
            />
          </Form.Item>
          <Form.Item
            style={{
              width: "49%",
              display: "inline-block",
              marginLeft: "15px",
            }}
            label="Tên khách hàng"
            name="BookingUserName">
            <Input
              disabled={modify ? false : true}
              style={{ padding: "10px" }}
            />
          </Form.Item>
          <Form.Item
            style={{
              width: "49%",
              display: "inline-block",
            }}
            label="Tên phòng"
            // name="Name"
          >
            <Input
              disabled
              value={
                data?.StudioRoom?.Name ||
                data?.PhotographerServicePackage?.Name ||
                data?.MakeupServicePackage?.Name ||
                data?.ModelServicePackage?.Name
              }
              style={{ padding: "10px" }}
            />
          </Form.Item>
          <Form.Item
            style={{
              width: "49%",
              display: "inline-block",
              marginLeft: "15px",
            }}
            label="Số điện thoại"
            name="BookingPhone">
            <Input
              disabled={modify ? false : true}
              style={{ padding: "10px" }}
            />
          </Form.Item>

          <Form.Item
            style={{
              width: "49%",
              display: "inline-block",
            }}
            label="Ngày đặt đơn"
            // name="CreationTime"
          >
            <Input
              disabled
              value={moment(data.CreationTime).format("DD-MM-YYYY HH:mm")}
              style={{ padding: "10px" }}
            />
          </Form.Item>
          <Form.Item
            style={{
              width: "49%",
              display: "inline-block",
              marginLeft: "15px",
            }}
            label="Email"
            name="BookingEmail">
            <Input
              disabled={modify ? false : true}
              style={{ padding: "10px" }}
            />
          </Form.Item>

          <Form.Item
            style={{
              width: "49%",
              display: "inline-block",
            }}
            label="Ngày thực hiện">
            <Input
              disabled
              value={
                data.OrderByTime
                  ? `${moment(data.OrderByTimeFrom).format(
                      "DD-MM-YYYY HH:mm"
                    )} - ${moment(data.OrderByTimeTo).format(
                      "DD-MM-YYYY HH:mm"
                    )} `
                  : `${moment(data.OrderByDateFrom).format(
                      "DD-MM-YYYY "
                    )} - ${moment(data.OrderByDateTo).format("DD-MM-YYYY")} `
              }
              style={{ padding: "10px" }}
            />
          </Form.Item>
          <Form.Item
            style={{
              width: "49%",
              display: "inline-block",
              marginLeft: "15px",
            }}
            label="Trạng thái đơn đặt"
            name="BookingStatus">
            <Select
              disabled={modify ? false : true}
              size="large"
              // onChange={handleChange}
              options={[
                {
                  value: 1,
                  label: "Đã hoàn thành",
                },
                {
                  value: 2,
                  label: "Đã hủy",
                },
                {
                  value: 3,
                  label: "Đã vắng mặt",
                },
                {
                  value: 4,
                  label: "Chờ thực hiện",
                },
              ]}
            />
          </Form.Item>
        </header>
        <article className="total-and-discount-info">
          <Form.Item
            style={{
              width: "49%",
              display: "inline-block",
            }}
            label="Tổng tạm tính"
            // name="BookingValueBeforeDiscount"
          >
            <Input
              disabled
              value={data.BookingValueBeforeDiscount}
              style={{ padding: "10px" }}
            />
          </Form.Item>
          <Form.Item
            style={{
              width: "49%",
              display: "inline-block",
              marginLeft: "15px",
            }}
            label="Mã khuyến mãi"
            // name="PromoCodeId"
          >
            <Input
              disabled
              value={data.PromoCodeId}
              style={{ padding: "10px" }}
            />
          </Form.Item>

          <Form.Item
            style={{
              width: "49%",
              display: "inline-block",
            }}
            label="Khuyến mãi"
            // name="discount"
          >
            <Input disabled style={{ padding: "10px" }} />
          </Form.Item>
          <Form.Item
            style={{
              width: "49%",
              display: "inline-block",
              marginLeft: "15px",
            }}
            label="Tổng tiền"
            // name="BookingValue"
          >
            <Input
              disabled
              value={data.BookingValue}
              style={{ padding: "10px" }}
            />
          </Form.Item>
        </article>
        <article className="payment-info">
          <p>THÔNG TIN THANH TOÁN</p>

          <Form.Item
            style={{
              width: "49%",
              display: "inline-block",
            }}
            label="Hình thức thanh toán"
            name="PaymentTypeOnline">
            <Select
              disabled={modify ? false : true}
              size="large"
              options={[
                {
                  value: 1,
                  label: "Online",
                },
                {
                  value: 0,
                  label: "Offline",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            style={{
              width: "49%",
              display: "inline-block",
              marginLeft: "15px",
            }}
            label="Trạng thái thanh toán"
            name="PaymentStatus">
            <Select
              disabled={modify ? false : true}
              size="large"
              options={[
                {
                  value: 1,
                  label: "Chờ thanh toán",
                },
                {
                  value: 2,
                  label: "Đã cọc",
                },
                {
                  value: 3,
                  label: "Đã thanh toán",
                },
                {
                  value: 4,
                  label: "Null",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            style={{
              width: "49%",
              display: "inline-block",
            }}
            label="Cổng thanh toán"
            // name=""
          >
            <Input disabled style={{ padding: "10px" }} />
          </Form.Item>
          <Form.Item
            style={{
              width: "49%",
              display: "inline-block",
              marginLeft: "15px",
            }}
            disabled
            label="Tiền cọc"
            // name="deposit"
          >
            <Input
              disabled
              value={data.DepositValue}
              style={{ padding: "10px" }}
            />
          </Form.Item>
        </article>
        <article className="cancel-info">
          <p>HỦY ĐƠN</p>

          <Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
              }}
              label="Ngày hủy"
              // name="cancelDate"
            >
              <Input
                disabled
                value={data.DeletionTime}
                style={{ padding: "10px" }}
              />
            </Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
                marginLeft: "15px",
              }}
              label="Hủy đơn miễn phí"
              // name="freeCancelationBefore"
            >
              <Input disabled style={{ padding: "10px" }} />
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
              }}
              label="Lý do hủy đơn"
              // name="reasonForCancelation"
            >
              <Input
                disabled
                value={data.DeletedNote}
                style={{ padding: "10px" }}
              />
            </Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
                marginLeft: "15px",
              }}
              label="Hạn hủy đơn miễn phí"
              // name="deadlineForFreeCancelation"
            >
              <Input disabled style={{ padding: "10px" }} />
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
              }}
              label="Số tài khoản nhận hoàn tiền"
              // name="bankAccountForRefund"
            >
              <Input disabled style={{ padding: "10px" }} />
            </Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
                marginLeft: "15px",
              }}
              label="Phí hủy đơn"
              // name="cancelationFee"
            >
              <Input disabled style={{ padding: "10px" }} />
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
              }}
              label="Số tiền được hoàn"
              // name="refundAmount"
            >
              <Input disabled style={{ padding: "10px" }} />
            </Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
                margin: "30px 0 0 15px",
              }}
              name="IsRefund">
              <Checkbox
                disabled={modify ? false : true}
                size="large"
                checked={data.IsRefund}
                // disabled
              >
                Đã hoàn tiền
              </Checkbox>
            </Form.Item>
          </Form.Item>
        </article>
        <footer className="detail-footer">
          <p>VẮNG MẶT</p>

          <Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
              }}
              label="Phí vắng mặt"
              // name="absentFee"
            >
              <Input style={{ padding: "10px" }} />
            </Form.Item>
            {modify && (
              <Form.Item
                style={{
                  width: "49%",
                  display: "inline-block",
                  margin: "33px 0 0 15px",
                }}>
                <Button
                  loading={loadingBtn}
                  size="large"
                  htmlType="submit"
                  type="primary">
                  Lưu thay đổi
                </Button>
              </Form.Item>
            )}
          </Form.Item>
        </footer>
      </Form>
    </section>
  );
};

export default Detail;
