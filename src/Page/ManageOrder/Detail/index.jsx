import {
  Breadcrumb,
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Image,
  Input,
  Row,
  Select,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { IMG } from "../../../../utils/baseURL";
import { converPriceVND, convertTimeUTC } from "../../../../utils/convert";
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
  }, [id, state]);

  const listCheckBox = [
    {
      label: "Quạt",
      value: data?.HasFan,
    },
    {
      label: "Máy lạnh",
      value: data?.HasAirConditioner,
    },
    {
      label: "Phòng thay đồ",
      value: data?.HasDressingRoom,
    },
    {
      label: "Nhà vệ sinh riêng",
      value: data?.HasWC,
    },
    {
      label: "Camera an ninh",
      value: data?.HasCamera,
    },
    {
      label: "Wifi",
      value: data?.HasWifi,
    },
    {
      label: "Chỗ đậu xe máy",
      value: data?.HasMotorBikeParking,
    },
    {
      label: "Chỗ đậu xe ô tô",
      value: data?.HasCarParking,
    },
    {
      label: "Nhân viên hỗ trợ",
      value: data?.HasSupporter,
    },
  ];

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
  return (
    <section className="detail-order">
      <Breadcrumb
        style={{
          fontSize: "16px",
          marginBottom: "10px",
          fontWeight: "bold",
        }}
      >
        <Breadcrumb.Item>
          <Link to={"/manage-order"} style={{ color: "#10b08a" }}>
            Quản lý đơn đặt
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Chi tiết</Breadcrumb.Item>
      </Breadcrumb>
      <Form
        initialValues={{
          Id: data.id,
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
          // DeletionTime:data.DeletionTime,
          // BookingValueBeforeDiscount: data.BookingValueBeforeDiscount,
          // PromoCodeId: data.PromoCodeId,
          PaymentTypeOnline: data.PaymentTypeOnline,
          PaymentStatus: data.PaymentStatus,
          IsRefund: data.IsRefund,
          AffiliateUserId: data.AffiliateUserId,
          accountUser: data.accountUser,
          bank: data.bank,
          bankAccount: data.bankAccount,
          OrderNote: data.OrderNote,
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
        style={{ marginTop: "20px" }}
      >
        <header className="booking-info">
          <p>THÔNG TIN ĐƠN ĐẶT</p>
          <Form.Item
            style={{
              width: "49%",
              display: "inline-block",
              marginRight: "15px",
            }}
            label="ID"
            name="Id"
          >
            <Input
              disabled={true}
              value={data?.id}
              style={{ padding: "10px" }}
            />
          </Form.Item>
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
              marginRight: "15px",
            }}
            label="Số định danh"
            // name="IdentifierCode"
          >
            <Input
              disabled
              value={data.CreatorUserId}
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
              marginRight: "15px",
            }}
            label="Tên khách hàng"
            name="BookingUserName"
          >
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
              marginRight: "15px",
            }}
            label="Số điện thoại"
            name="BookingPhone"
          >
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
              marginRight: "15px",
            }}
            label="Email"
            name="BookingEmail"
          >
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
            label="Ngày thực hiện"
          >
            <Input
              disabled
              value={
                data.OrderByTime
                  ? `${convertTimeUTC(
                      data.OrderByTimeFrom,
                      true
                    )} - ${convertTimeUTC(data.OrderByTimeTo, true)} `
                  : `${convertTimeUTC(data.OrderByDateFrom)} - ${convertTimeUTC(
                      data.OrderByDateTo
                    )} `
              }
              style={{ padding: "10px" }}
            />
          </Form.Item>

          <Form.Item
            style={{
              width: "49%",
              display: "inline-block",
              marginRight: "15px",
            }}
            label="Trạng thái đơn đặt"
            name="BookingStatus"
          >
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
          <Form.Item
            style={{
              width: "49%",
              display: "inline-block",
              // marginRight: "15px",
            }}
            label="Lời nhắn"
            name="OrderNote"
          >
            <Input
              // value={data.Note}
              disabled={modify ? false : true}
              style={{ padding: "10px" }}
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
              value={Number(data.BookingValueBeforeDiscount).toLocaleString(
                "it-IT",
                {
                  style: "currency",
                  currency: "VND",
                }
              )}
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
            <Input
              disabled
              value={Number(data?.saleValue).toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
              style={{ padding: "10px" }}
            />
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
              value={Number(data.BookingValue)?.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
              style={{ padding: "10px" }}
            />
          </Form.Item>
        </article>
        <article className="payment-info">
          <p>THÔNG TIN PHÒNG</p>
          <div style={{ marginTop: "1rem" }}>
            <label
              style={{
                fontWeight: "bold",
                paddingBottom: ".5rem",
                display: "inline-block",
                fontSize: "1rem",
              }}
            >
              Kích thước
            </label>
            <Col span={24}>
              <Form.Item
                style={{
                  width: "49%",
                  display: "inline-block",
                }}
                label="Diện tích (m2)"
                // name="BookingValueBeforeDiscount"
              >
                <Input
                  disabled
                  value={Number(data.BookingValueBeforeDiscount).toLocaleString(
                    "it-IT",
                    {
                      style: "currency",
                      currency: "VND",
                    }
                  )}
                  style={{ padding: "10px" }}
                />
              </Form.Item>
              <Form.Item
                style={{
                  width: "49%",
                  display: "inline-block",
                  marginLeft: "15px",
                }}
                label="Chiều dài (m)"
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
                label="Chiều rộng (m)"
                // name="discount"
              >
                <Input
                  disabled
                  value={Number(data?.saleValue).toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                  style={{ padding: "10px" }}
                />
              </Form.Item>
              <Form.Item
                style={{
                  width: "49%",
                  display: "inline-block",
                  marginLeft: "15px",
                }}
                label="Chiều cao trần (m)"
                // name="BookingValue"
              >
                <Input
                  disabled
                  value={Number(data.BookingValue)?.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                  style={{ padding: "10px" }}
                />
              </Form.Item>
              <Divider />

              <Form.Item>
                <label
                  style={{
                    fontWeight: "bold",
                    paddingBottom: ".5rem",
                    display: "inline-block",
                    fontSize: "1rem",
                  }}
                >
                  Thiết bị có sẵn
                </label>
                <Row gutter={[32, 32]}>
                  <Col span={12}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: ".5rem",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <Checkbox value={data.HasBackground}>
                          Hệ thống đèn
                        </Checkbox>
                      </div>
                      <Input style={{ flex: 4 }} size="large" />
                    </div>
                  </Col>
                  <Col span={12}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: ".5rem",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <Checkbox>Phông nền</Checkbox>
                      </div>
                      <Input style={{ flex: 4 }} size="large" />
                    </div>
                  </Col>
                  <Col span={24}>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: "2rem",
                      }}
                    >
                      <Checkbox checked={data.HasTable}>Bàn</Checkbox>
                      <Checkbox checked={data.HasChair}>Ghế</Checkbox>
                      <Checkbox checked={data.HasSofa}>Sofa</Checkbox>
                      <Checkbox checked={data.HasFlower}>Hoa tươi</Checkbox>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: ".5rem",
                        }}
                      >
                        <Checkbox checked={data.HasOtherDevice}>Khác</Checkbox>
                        <Input
                          value={data.OtherDeviceDescription}
                          size="large"
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </Form.Item>
              <Col span={24}>
                <Divider />
                <Form.Item className="label">
                  <label
                    style={{
                      fontWeight: "bold",
                      paddingBottom: ".5rem",
                      display: "inline-block",
                      fontSize: "1rem",
                    }}
                  >
                    Tiện ích đi kèm
                  </label>
                  <Col span={24}>
                    <Row>
                      <Col span={20}>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            gap: "2rem",
                          }}
                        >
                          {listCheckBox.map((item) => {
                            return (
                              <Checkbox checked={item.value}>
                                {item.label}
                              </Checkbox>
                            );
                          })}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Divider />
                <Row gutter={[32, 32]}>
                  <Col span={12}>
                    <Form.Item
                      label="Số khách tối đa
              "
                      // name="Id"
                    >
                      <Input
                        value={data.MaximumCustomer}
                        style={{ padding: "10px" }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Phụ thu phát sinh (đ/khách)"
                      // name="Id"
                    >
                      <Input
                        value={converPriceVND(data.Surcharge)}
                        style={{ padding: "10px" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Col>
          </div>
        </article>
        <article className="payment-info">
          <p>THÔNG TIN THANH TOÁN</p>

          <Form.Item
            style={{
              width: "49%",
              display: "inline-block",
            }}
            label="Hình thức thanh toán"
            name="PaymentTypeOnline"
          >
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
            name="PaymentStatus"
          >
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
                value={
                  data?.BookingStatus === 2
                    ? moment(data.DeletionTime).format("DD/MM/YYYY HH:MM")
                    : ""
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
                marginRight: "15px",
              }}
              label="Số tài khoản nhận hoàn tiền"
              name="bankAccount"
            >
              <Input disabled style={{ padding: "10px" }} />
            </Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
              }}
              label="Tên tài khoản"
              name="accountUser"
            >
              <Input disabled style={{ padding: "10px" }} />
            </Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
              }}
              label="Ngân hàng"
              name="bank"
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
              name="IsRefund"
              valuePropName="checked"
            >
              <Checkbox
                disabled={modify ? false : true}
                size="large"
                // onChange={(e) => setIsRefund(e.target.checked)}
                // checked={data.IsRefund}
                // disabled
              >
                Đã hoàn tiền
              </Checkbox>
            </Form.Item>
            <Form.Item
              style={{
                width: "49%",
                display: "inline-block",
                margin: "30px 0 0 0px",
              }}
              label="Ảnh minh chứng"
            >
              <Image src={IMG(data?.EvidenceImage)} />
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
                }}
              >
                <Button
                  loading={loadingBtn}
                  size="large"
                  htmlType="submit"
                  type="primary"
                >
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
