import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import dayjs from "dayjs";
import { MultiSelect } from "react-multi-select-component";

import styles from "./promoCreate.module.scss";
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
import { CATEGORIES } from "../../../../utils/CONST";
import { UserOutlined } from "@ant-design/icons";
import { convertImage } from "../../../../utils/convert";
import { partnerService } from "../../../services/PartnerService";
import { userService } from "../../../services/UserService";
import { promoCodeService } from "../../../services/PromoCodeService";
import toastMessage from "../../../Components/ToastMessage";
import diacriticless from "diacriticless";

const cx = classNames.bind(styles);

const PromoCreate = () => {
  const [form] = Form.useForm();
  const [promo, setPromo] = useState({
    Category: "",
    Content: "",
    CusApply: "",
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
    PartnerConfirm: true,
  });
  const [partners, setPartners] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCus, setSelectedCus] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState([]);
  const [modalCusOpen, setModalCusOpen] = useState(false);
  const [modalPartnerOpen, setModalPartnerOpen] = useState(false);

  useEffect(() => {
    const getPartner = async () => {
      const res = await partnerService.getAllPartnersNotification();
      setPartners(
        res.data.map((item) => ({
          ...item,
          value: item?.id,
          label: item?.PartnerName,
        }))
      );
    };
    getPartner();
    const getCustomer = async () => {
      const res = await userService.getAllCustomerNotification();
      setCustomers(
        res.data.map((item) => ({
          ...item,
          value: item.id,
          label: item?.Fullname,
        }))
      );
    };
    getCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

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
      PartnerConfirm: newPromo.PartnerConfirm,
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
      IsDeleted: false,
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
      await promoCodeService.createPromo(newDataSend);
      toastMessage("Tạo mã khuyến mãi thành công!", "success");
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
      //   PartnerConfirm: 1,
      // });
      form.resetFields();
    } catch (error) {
      toastMessage(error.response.data.message, "error");
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
                <Input />
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
                  <Input />
                </Form.Item>
              </div>
              <div className={cx("w-50")}>
                <Form.Item
                  label="Số lượng mã/đối tượng"
                  name={"NoOfJoin"}
                  rules={[{ required: true }]}
                >
                  <Input />
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
                <Input />
              </Form.Item>
            </div>
            <div className={cx("w-100")}>
              <Form.Item
                label="Nội dung"
                name={"Content"}
                rules={[{ required: true }]}
              >
                <Input.TextArea rows={4} />
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
                  <Input />
                </Form.Item>
              </div>
              <div className={cx("w-50")}>
                <Form.Item
                  label="Đối tác (%)"
                  name={"SpendingPartner"}
                  rules={[{ required: true }]}
                >
                  <Input />
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
                  name={"DateTimeApply"}
                  rules={[{ required: true }]}
                >
                  <DatePicker
                    format="YYYY-MM-DD HH:mm"
                    disabledDate={disabledDate}
                    disabledTime={disabledDateTime}
                    showTime={{ defaultValue: dayjs("00:00:00", "HH:mm") }}
                  />
                </Form.Item>
              </div>
              <div className={cx("w-50")}>
                <Form.Item
                  label="Ngày hết hạn"
                  name={"DateTimeExpire"}
                  rules={[{ required: true }]}
                >
                  <DatePicker
                    format="YYYY-MM-DD HH:mm"
                    disabledDate={disabledDate}
                    disabledTime={disabledDateTime}
                    showTime={{ defaultValue: dayjs("00:00:00", "HH:mm") }}
                  />
                </Form.Item>
              </div>
            </div>
            <div className={cx("w-100")}>
              <Form.Item label="Ghi chú" name={"Note"}>
                <Input />
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
                        onClick={() => {}}
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
                      >
                        <div>Tùy chọn khách hàng</div>
                        <div>
                          {promo.selectCus === 3 ? selectedCus.length : 0}/
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
                <Checkbox.Group className={cx("w-100")}>
                  <Row>
                    {CATEGORIES.map((item) => (
                      <Col span={8} key={item.id}>
                        <Checkbox value={item.id}>{item.label}</Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
              </Form.Item>
              {/* <div className={cx("w-50", "partner-title")}>Đối tác</div>
              <div className={cx("w-50", "cus-title")}>Khách hàng</div> */}
            </div>
            {/* <div className={cx("join-object")}></div> */}
            <Form.Item
              name={"TypeReduce"}
              label="Hình thức khuyến mãi"
              rules={[{ required: true }]}
            >
              <Radio.Group className={cx("w-100")}>
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
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Giá trị đơn đặt tối thiểu (VNĐ)"
                  name={"MinApply"}
                  rules={[{ required: promo.TypeReduce === 1 ? true : false }]}
                >
                  <Input />
                </Form.Item>{" "}
              </>
            ) : (
              <>
                <Form.Item
                  label="Tỉ lệ giảm (%)"
                  name={"ReduceValue"}
                  rules={[{ required: promo.TypeReduce === 2 ? true : false }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Giá trị đơn đặt giảm tối đa (VNĐ)"
                  name={"MaxReduce"}
                  rules={[{ required: promo.TypeReduce === 2 ? true : false }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Giá trị đơn đặt tối thiểu (VNĐ)"
                  name={"MinApply"}
                  rules={[{ required: promo.TypeReduce === 2 ? true : false }]}
                >
                  <Input />
                </Form.Item>
              </>
            )}
            <div className={cx("join-object")}>
              YÊU CẦU XÁC NHẬN THAM GIA TỪ ĐỐI TÁC
            </div>
            <Form.Item name={"PartnerConfirm"} rules={[{ required: true }]}>
              <Radio.Group className={cx("w-100")}>
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
        <Form.Item wrapperCol={{ span: 12 }}>
          <Button type="primary" htmlType="submit">
            Tạo khuyến mãi
          </Button>
        </Form.Item>
      </Form>
      {modalCusOpen && (
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
            filterOptions={(options, filter) => {
              if (!filter) {
                return options;
              }
              return options.filter(({ value, label }) => {
                if (!label) {
                  return;
                }
                return (
                  value &&
                  diacriticless(label)
                    .toUpperCase()
                    .match(diacriticless(filter.toUpperCase()))
                );
              });
            }}
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
                    checked={checked}
                    tabIndex={-1}
                    disabled={disabled}
                  />
                </div>
              );
            }}
          />
        </Modal>
      )}
      {modalPartnerOpen && (
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
            filterOptions={(options, filter) => {
              if (!filter) {
                return options;
              }
              return options.filter(({ value, label }) => {
                return (
                  value &&
                  diacriticless(label)
                    .toUpperCase()
                    .match(diacriticless(filter.toUpperCase()))
                );
              });
            }}
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
                    checked={checked}
                    tabIndex={-1}
                    disabled={disabled}
                  />
                </div>
              );
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default PromoCreate;
