import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import dayjs from "dayjs";
import { MultiSelect } from "react-multi-select-component";

import styles from "./promoCustomerDetail.module.scss";
import {
  Avatar,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Space,
} from "antd";
import moment from "moment";
import { CATEGORIES } from "../../../../../utils/CONST";
import { UserOutlined } from "@ant-design/icons";
import { convertImage } from "../../../../../utils/convert";
import { partnerService } from "../../../../services/PartnerService";
import { userService } from "../../../../services/UserService";
import { promoCodeService } from "../../../../services/PromoCodeService";
import toastMessage from "../../../../Components/ToastMessage";
import { useLocation } from "react-router-dom";

const cx = classNames.bind(styles);

const PromoCustomerDetail = ({ edit = false }) => {
  const location = useLocation();
  const [form] = Form.useForm();
  const [promo, setPromo] = useState({
    Category: "",
    Content: "",
    CusApply: "",
    PartnerApply: "",
    DateTimeApply: "",
    DateTimeExpire: "",
    MaxReduce: "",
    MinApply: "",
    NoOfCode: "",
    NoOfJoin: "",
    NoOfJoined: "",
    Note: "",
    ReduceValue: "",
    SaleCode: "",
    SpendingBookingStudio: "",
    SpendingPartner: "",
    Title: "",
    TypeReduce: 1,
    createdAt: "",
    updatedAt: "",
    partnerConfirm: null,
  });
  const [partners, setPartners] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCus, setSelectedCus] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState([]);
  const [modalCusOpen, setModalCusOpen] = useState(false);
  const [modalPartnerOpen, setModalPartnerOpen] = useState(false);

  useEffect(() => {
    const getPartner = async () => {
      const resPartner = await partnerService.getAllPartnersNotification();
      setPartners(resPartner.data.map((item) => ({ ...item, value: item.id })));
    };

    const getCustomer = async () => {
      const resCus = await userService.getAllCustomerNotification();
      setCustomers(resCus.data.map((item) => ({ ...item, value: item.id })));
    };

    getPartner();
    getCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getPromoDetail = async () => {
      const res = await promoCodeService.getPromoCodeById(
        location.state.promoId
      );
      // console.log(res.data);
      // res.data.DateTimeApply = moment(res.data.DateTimeApply).format(
      //   "YYYY-MM-DD HH:mm"
      // );
      if (res.data.CusApply === null) {
        res.data.selectCus = 1;
      } else {
        res.data.selectCus = 3;
      }
      if (res.data.PartnerApply === null) {
        res.data.selectPartner = 1;
      } else {
        res.data.selectPartner = 3;
      }

      const newSelectedPartner = res.data.PartnerApply || "";
      setSelectedPartner(
        partners?.filter((item) => newSelectedPartner.includes(item.id))
      );

      const newSelectedCus = res.data.CusApply || "";
      setSelectedCus(
        customers?.filter((item) => newSelectedCus.includes(item.id))
      );
      setPromo(res.data);
      form.setFieldsValue(res.data);
    };

    getPromoDetail();
  }, [partners, customers]);

  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };
  console.log(promo);
  const disabledDateTime = (value) => {
    return {
      disabledHours: () => {
        if (value && moment(value["$d"]) > moment()) return [];
        return range(0, moment().get("hour"));
      },
      disabledMinutes: () => {
        if (value && moment(value["$d"]) > moment()) return [];
        return range(0, moment().get("hour"));
      },
      disabledSeconds: () => {
        if (value && moment(value["$d"]) > moment()) return [];
        return range(0, moment().get("hour"));
      },
    };
  };

  const disabledDate = (current) => {
    return current && current <= dayjs().subtract(1, "days");
  };

  const handleOnValuesChange = (value) => {
    // console.log(value);
    setPromo({ ...promo, ...value });
  };

  const handleOnSubmit = async (value) => {
    const newPromo = { ...promo };
    let customerApply, partnerApply;
    if (newPromo.selectCus === 3) {
      customerApply = selectedCus.map((item) => item.id).join(",");
    } else if (newPromo.selectCus === 2) {
      customerApply = customers
        .filter((item) => selectedCus.some((itm) => itm.id !== item.id))
        .map((item) => item.id)
        .join(",");
    }
    if (newPromo.selectPartner === 3) {
      partnerApply = selectedPartner.map((item) => item.id).join(",");
    } else if (newPromo.selectPartner === 2) {
      partnerApply = partners
        .filter((item) => selectedPartner.some((itm) => itm.id !== item.id))
        .map((item) => item.id)
        .join(",");
    }

    const newDataSend = {
      Category: newPromo.Category.join(","),
      Confirm: newPromo.partnerConfirm,
      Content: newPromo.Content,
      CusApply: customerApply,
      DateTimeApply: moment(newPromo.DateTimeApply["$d"])
        .add(7, "hour")
        .toISOString(),
      DateTimeExpire: moment(newPromo.DateTimeExpire["$d"])
        .add(7, "hour")
        .toISOString(),
      MaxReduce: Number(newPromo.MaxReduce),
      MinApply: Number(newPromo.MinApply),
      NoOfCode: Number(newPromo.NoOfCode),
      NoOfJoin: Number(newPromo.NoOfJoin),
      Note: newPromo.Note,
      PartnerApply: partnerApply,
      ReduceValue: Number(newPromo.ReduceValue),
      SaleCode: newPromo.SaleCode,
      SpendingBookingStudio: Number(newPromo.SpendingBookingStudio),
      SpendingPartner: Number(newPromo.SpendingPartner),
      Title: newPromo.Title,
      TypeReduce: newPromo.TypeReduce,
      PartnerConfirm: newPromo.PartnerConfirm,
    };
    try {
      if (
        Number(newDataSend.SpendingBookingStudio) +
          Number(newDataSend.SpendingPartner) !==
        100
      ) {
        toastMessage(
          "Tổng hỗ trợ booking studio và đối tác phải bằng 100%!",
          "warning"
        );
        return;
      }
      const res = await promoCodeService.updatePromoCode(
        location.state.promoId,
        newDataSend
      );
      if (res.data.success === false) {
        toastMessage(res.data.message, "error");
        return;
      }
      toastMessage("Cập nhật mã khuyến mãi thành công!", "success");
      // setPromo({
      //   Category: "",
      //   Content: "",
      //   CusApply: "",
      //   DateTimeApply: "",
      //   DateTimeExpire: "",
      //   MaxReduce: "",
      //   MinApply: "",
      //   NoOfCode: "",
      //   NoOfJoin: "",
      //   NoOfJoined: "",
      //   Note: "",
      //   ReduceValue: "",
      //   SaleCode: "",
      //   SpendingBookingStudio: "",
      //   SpendingPartner: "",
      //   Title: "",
      //   TypeReduce: 1,
      //   createdAt: "",
      //   updatedAt: "",
      //   partnerConfirm: 1,
      // });
    } catch (error) {
      toastMessage("Cập nhật mã khuyến mãi thất bại!", "error");
    }
  };

  return (
    <div className={cx("promo-create-container")}>
      <Form
        // labelCol={{ span: 12 }}
        // wrapperCol={{ span: 24 }}
        layout="vertical"
        size="large"
        onValuesChange={handleOnValuesChange}
        form={form}
        // disabled={componentDisabled}
        // initialValues={promo}
        onFinish={handleOnSubmit}
        colon={false}
      >
        <Row>
          <Col span={12}>
            <div className={cx("w-100")}>
              <Form.Item
                label="Mã khuyến mãi"
                wrapperCol={{ span: 24 }}
                name="SaleCode"
                rules={[{ required: true }]}
              >
                <Input disabled={true} />
              </Form.Item>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "95%",
              }}
            >
              <div className={cx("w-50")}>
                <Form.Item
                  label="Số lượng mã"
                  name={"NoOfCode"}
                  rules={[{ required: true }]}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </div>
              <div className={cx("w-50")}>
                <Form.Item
                  label="Số lượng mã/đối tượng"
                  name={"NoOfJoin"}
                  rules={[{ required: true }]}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </div>
            </div>
            <div className={cx("w-100")}>
              <Form.Item
                label="Tiêu đề"
                wrapperCol={{ span: 24 }}
                name="Title"
                rules={[{ required: true }]}
              >
                <Input disabled={!edit} />
              </Form.Item>
            </div>
            <div className={cx("w-100")}>
              <Form.Item
                label="Nội dung"
                name={"Content"}
                rules={[{ required: true }]}
              >
                <Input.TextArea rows={4} disabled={!edit} />
              </Form.Item>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "95%",
              }}
            >
              <div className={cx("w-50")}>
                <Form.Item
                  label="Hỗ trợ booking studio (%)"
                  name="SpendingBookingStudio"
                  rules={[{ required: true }]}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </div>
              <div className={cx("w-50")}>
                <Form.Item
                  label="Đối tác (%)"
                  name={"SpendingPartner"}
                  rules={[{ required: true }]}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "95%",
              }}
            >
              <div className={cx("w-50")}>
                <Form.Item
                  label="Ngày áp dụng"
                  // name={"DateTimeApply"}
                  rules={[{ required: true }]}
                >
                  <Input
                    value={moment(promo?.DateTimeApply).format(
                      "HH:hh DD-MM-YYYY"
                    )}
                    disabled={true}
                  />
                  {/* <DatePicker
                    showTime
                    // format={dayjs("YYYY-MM-DD HH:mm")}
                    // value={moment(promo?.DateTimeApply).format(
                    //   "YYYY-MM-DD HH:mm"
                    // )}
                    disabledDate={disabledDate}
                    disabledTime={disabledDateTime}
                    // showTime={{ defaultValue: dayjs("00:00:00", "HH:mm") }}
                  /> */}
                </Form.Item>
              </div>
              <div className={cx("w-50")}>
                <Form.Item
                  label="Ngày hết hạn"
                  // name={"DateTimeExpire"}
                  rules={[{ required: true }]}
                >
                  <Input
                    value={moment(promo?.DateTimeExpire).format(
                      "HH:hh DD-MM-YYYY"
                    )}
                    disabled={true}
                  />
                  {/* <DatePicker
                    format="YYYY-MM-DD HH:mm"
                    disabledDate={disabledDate}
                    disabledTime={disabledDateTime}
                    showTime={{ defaultValue: dayjs("00:00:00", "HH:mm") }}
                  /> */}
                </Form.Item>
              </div>
            </div>
            <div className={cx("w-100")}>
              <Form.Item label="Ghi chú" name={"Note"}>
                <Input disabled={!edit} />
              </Form.Item>
            </div>
          </Col>
          <Col span={12}>
            <div className={cx("join-object")}>Đối tượng tham gia</div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "95%",
              }}
            >
              <div className={cx("w-50", "partner-title")}>Đối tác</div>
              <div className={cx("w-50", "cus-title")}>Khách hàng</div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "95%",
              }}
            >
              <div className={cx("w-50")}>
                <Form.Item
                  className={cx("form-custom-radio")}
                  name={"selectPartner"}
                >
                  <Radio.Group
                    // onChange={() => {}}
                    // value={""}
                    className={cx("custom-radio-group")}
                  >
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <Radio
                        value={1}
                        className={cx("custom-radio")}
                        onClick={() => {
                          setSelectedPartner([]);
                        }}
                        disabled={!edit && promo?.selectPartner !== 1}
                      >
                        <div>Tất cả đối tác</div>
                        <div>{partners.length} đối tác</div>
                      </Radio>

                      <Radio
                        value={2}
                        className={cx("custom-radio")}
                        onClick={() => {
                          if (Number(promo.selectPartner) !== 2) {
                            setSelectedPartner([]);
                          }
                          setModalPartnerOpen(true);
                        }}
                        disabled={!edit && promo?.selectPartner !== 2}
                      >
                        <div>Tất cả đối tác NGOẠI TRỪ</div>
                        <div>
                          {promo.selectPartner === 2
                            ? selectedPartner.length
                            : 0}
                          /{partners.length} đối tác
                        </div>
                      </Radio>
                      <Radio
                        value={3}
                        className={cx("custom-radio")}
                        onClick={() => {
                          if (Number(promo.selectPartner) !== 3) {
                            setSelectedPartner([]);
                          }
                          setModalPartnerOpen(true);
                        }}
                        disabled={!edit && promo?.selectPartner !== 3}
                      >
                        <div>Tùy chọn đối tác</div>
                        <div>
                          {promo.selectPartner === 3
                            ? selectedPartner.length
                            : 0}
                          /{partners.length} đối tác
                        </div>
                      </Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>
              </div>
              <div className={cx("w-50")}>
                <Form.Item
                  className={cx("form-custom-radio")}
                  name={"selectCus"}
                >
                  <Radio.Group className={cx("custom-radio-group")}>
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <Radio
                        value={1}
                        className={cx("custom-radio")}
                        disabled={!edit && promo?.selectCus !== 1}
                      >
                        <div>Tất cả khách hàng</div>
                        <div>{customers.length} đối tác</div>
                      </Radio>

                      <Radio
                        value={2}
                        className={cx("custom-radio")}
                        onClick={() => {
                          if (promo.selectCus !== 2) {
                            setSelectedCus([]);
                          }
                          setModalCusOpen(true);
                        }}
                        disabled={!edit && promo?.selectCus !== 2}
                      >
                        <div>Tất cả khách hàng NGOẠI TRỪ</div>
                        <div>
                          {promo.selectCus === 2 ? selectedCus.length : 0}/
                          {customers.length} khách hàng
                        </div>
                      </Radio>
                      <Radio
                        value={3}
                        className={cx("custom-radio")}
                        onClick={() => {
                          if (promo.selectCus !== 3) {
                            setSelectedCus([]);
                          }
                          setModalCusOpen(true);
                        }}
                        disabled={!edit && promo?.selectCus !== 3}
                      >
                        <div>Tùy chọn khách hàng</div>
                        <div>
                          {promo.selectCus === 3 ? selectedCus?.length : 0}/
                          {customers.length} khách hàng
                        </div>
                      </Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>
              </div>
            </div>
            <div className={cx("join-object")}>Loại hình đơn đặt áp dụng</div>
            <div className={cx("w-100")}>
              <Form.Item name={"Category"} rules={[{ required: true }]}>
                <Checkbox.Group className={cx("w-100")} disabled={!edit}>
                  <Row>
                    {CATEGORIES.map((item) => (
                      <Col span={8} key={item.id}>
                        <Checkbox value={item.id.toString()}>
                          {item.label}
                        </Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
              </Form.Item>
              {/* <div className={cx("w-50", "partner-title")}>Đối tác</div>
              <div className={cx("w-50", "cus-title")}>Khách hàng</div> */}
            </div>
            <div className={cx("join-object")}>Hình thức khuyến mãi</div>
            <Form.Item name={"TypeReduce"} rules={[{ required: true }]}>
              <Radio.Group className={cx("w-100")} disabled={!edit}>
                <Row>
                  <Col span={12}>
                    <Radio value={1}>Giảm tiền</Radio>
                  </Col>

                  <Col span={12}>
                    <Radio value={2}>Giảm tỷ lệ (%)</Radio>
                  </Col>
                </Row>
              </Radio.Group>
            </Form.Item>

            {promo.TypeReduce === 1 ? (
              <>
                <Form.Item
                  label="Số tiền giảm (VNĐ)"
                  name={"ReduceValue"}
                  rules={[{ required: promo.TypeReduce === 1 ? true : false }]}
                >
                  <Input disabled={!edit} />
                </Form.Item>
                <Form.Item
                  label="Giá trị đơn đặt tối thiểu (VNĐ)"
                  name={"MinApply"}
                  rules={[{ required: promo.TypeReduce === 1 ? true : false }]}
                >
                  <Input disabled={!edit} />
                </Form.Item>{" "}
              </>
            ) : (
              <>
                <Form.Item
                  label="Tỉ lệ giảm (%)"
                  name={"ReduceValue"}
                  rules={[{ required: promo.TypeReduce === 2 ? true : false }]}
                >
                  <Input disabled={!edit} />
                </Form.Item>
                <Form.Item
                  label="Giá trị đơn đặt tối đa (VNĐ)"
                  name={"MaxReduce"}
                  rules={[{ required: promo.TypeReduce === 2 ? true : false }]}
                >
                  <Input disabled={!edit} />
                </Form.Item>
                <Form.Item
                  label="Giá trị đơn đặt tối thiểu (VNĐ)"
                  name={"MinApply"}
                  rules={[{ required: promo.TypeReduce === 2 ? true : false }]}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </>
            )}
            <div className={cx("join-object")}>
              YÊU CẦU XÁC NHẬN THAM GIA TỪ ĐỐI TÁC
            </div>
            <Form.Item name={"PartnerConfirm"} rules={[{ required: true }]}>
              <Radio.Group className={cx("w-100")} disabled={!edit}>
                <Row>
                  <Col span={12}>
                    <Radio value={true}>Có</Radio>
                  </Col>

                  <Col span={12}>
                    <Radio value={false}>Không</Radio>
                  </Col>
                </Row>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        {edit && (
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
        )}
      </Form>
      <Modal
        // title={}
        className={cx("modal-option")}
        centered
        open={modalCusOpen}
        onOk={() => {
          setModalCusOpen(false);
        }}
        onCancel={() => {
          setModalCusOpen(false);
        }}
        closable={false}
        bodyStyle={{ height: "350px" }}
      >
        <MultiSelect
          className={""}
          options={customers}
          value={selectedCus}
          onChange={setSelectedCus}
          labelledBy="selected"
          // defaultIsOpen={true}
          isOpen={true}
          hasSelectAll={false}
          ItemRenderer={({ checked, option, onClick, disabled }) => {
            return (
              <div className={cx("select-item")}>
                <div className={cx("check-item")}>
                  <Avatar
                    size="large"
                    icon={<UserOutlined />}
                    src={convertImage(option.Image || "")}
                  />
                  <div>{option.Fullname}</div>
                </div>
                <input
                  className="Checkbox-input"
                  style={{ width: "20px", height: "20px" }}
                  type="checkbox"
                  onChange={onClick}
                  checked={selectedCus.some((item) => item.id === option.id)}
                  tabIndex={-1}
                  disabled={!edit}
                />
              </div>
            );
          }}
        />
      </Modal>
      <Modal
        // title={}
        className={cx("modal-option")}
        centered
        open={modalPartnerOpen}
        onOk={() => {
          setModalPartnerOpen(false);
        }}
        onCancel={() => {
          setModalPartnerOpen(false);
        }}
        closable={false}
        bodyStyle={{ height: "350px" }}
      >
        <MultiSelect
          className={""}
          options={partners}
          value={selectedPartner}
          onChange={setSelectedPartner}
          labelledBy="selected"
          // defaultIsOpen={true}
          isOpen={true}
          hasSelectAll={false}
          ItemRenderer={({ checked, option, onClick, disabled }) => {
            return (
              <div className={cx("select-item")}>
                <div className={cx("check-item")}>
                  <Avatar
                    size="large"
                    icon={<UserOutlined />}
                    src={convertImage(option.Image || "")}
                  />
                  <div>{option.PartnerName}</div>
                </div>
                <input
                  className="Checkbox-input"
                  style={{ width: "20px", height: "20px" }}
                  type="checkbox"
                  onChange={onClick}
                  checked={selectedPartner.some(
                    (item) => item.id === option.id
                  )}
                  tabIndex={-1}
                  disabled={!edit}
                />
              </div>
            );
          }}
        />
      </Modal>
    </div>
  );
};

export default PromoCustomerDetail;
