import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import dayjs from "dayjs";
import { MultiSelect } from "react-multi-select-component";

import styles from "./PromoPartnerDetail.module.scss";
import {
  Avatar,
  Breadcrumb,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  List,
  Modal,
  Progress,
  Radio,
  Row,
  Space,
} from "antd";
import moment from "moment";
import { CATEGORIES } from "../../../../../utils/CONST";
import { RightOutlined, UserOutlined } from "@ant-design/icons";
import { convertImage } from "../../../../../utils/convert";
import { partnerService } from "../../../../services/PartnerService";
import { userService } from "../../../../services/UserService";
import { promoCodeService } from "../../../../services/PromoCodeService";
import toastMessage from "../../../../Components/ToastMessage";
import { Link, useLocation } from "react-router-dom";

const cx = classNames.bind(styles);

const PromoPartnerDetail = ({ edit = false }) => {
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
  const [partnerJoined, setPartnerJoined] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCus, setSelectedCus] = useState([]);
  const [cusJoined, setCusJoined] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState([]);
  const [modalCusOpen, setModalCusOpen] = useState(false);
  const [modalPartnerOpen, setModalPartnerOpen] = useState(false);
  const [modalCusJoinedOpen, setModalCusJoinedOpen] = useState(false);
  const [modalPartnerJoinedOpen, setModalPartnerJoinedOpen] = useState(false);

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

  useEffect(() => {
    const getCusJoinedPromo = async () => {
      const res = await promoCodeService.getCustomerJoinedPromo(
        location?.state?.promoId
      );
      setCusJoined(res.data.data);
    };

    getCusJoinedPromo();
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
    const newDataSend = {
      IsDeleted: true,
    };
    try {
      const res = await promoCodeService.updatePromoCode(
        location.state.promoId,
        newDataSend
      );
      if (res.data.success === false) {
        toastMessage(res.data.message, "error");
        return;
      }
      const newPromo = { ...promo, IsDeleted: true };
      setPromo(newPromo);
      toastMessage("Cập nhật mã khuyến mãi thành công!", "success");
    } catch (error) {
      toastMessage("Cập nhật mã khuyến mãi thất bại!", "error");
    }
  };

  const handleSaveAndCreate = async () => {
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
      IsDeleted: false,
      PartnerConfirm: true,
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
      const res = await promoCodeService.createPromo(newDataSend);
      if (res.data.success === false) {
        toastMessage(res.data.message, "error");
        return;
      }
      toastMessage("Tạo mã khuyến mãi thành công!", "success");
    } catch (error) {
      toastMessage("Tạo mã khuyến mãi thất bại!", "error");
    }
  };

  return (
    <div className={cx("promo-create-container")}>
      <Breadcrumb
        style={{
          fontSize: "16px",
          marginBottom: "10px",
          fontWeight: "bold",
        }}
      >
        <Breadcrumb.Item>
          <Link to={"/promo-code"} style={{ color: "#10b08a" }}>
            Mã khuyến mãi
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{edit ? "Chỉnh sửa" : "Chi tiết"}</Breadcrumb.Item>
      </Breadcrumb>
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
                <Input disabled={!edit} />
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
                    value={moment(promo?.DateTimeApply)
                      .utc()
                      .format("HH:hh DD-MM-YYYY")}
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
                    value={moment(promo?.DateTimeExpire)
                      .utc()
                      .format("HH:hh DD/MM/YYYY")}
                    disabled={true}
                  />
                  {/* <DatePicker
                    defaultValue={
                      promo?.DateTimeExpire ? moment(promo?.DateTimeExpire) : ""
                    }
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "95%",
              }}
            >
              <div className={cx("w-50")}>
                <Form.Item label="Số mã còn lại" rules={[{ required: true }]}>
                  <Input
                    value={`${
                      Number(promo?.NoOfCode) - Number(promo?.NoOfJoined)
                    }/${promo?.NoOfCode}`}
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
                <Form.Item label="Trạng thái" rules={[{ required: true }]}>
                  <Input
                    value={
                      promo?.IsDeleted
                        ? "Đã hủy"
                        : moment(promo?.DateTimeExpire) > moment()
                        ? "Đang diễn ra"
                        : "Hết hạn"
                    }
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
                          setSelectedPartner([...partners]);
                          setModalPartnerOpen(true);
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
                        onClick={() => {
                          setSelectedCus([...customers]);
                          setModalCusOpen(true);
                        }}
                        disabled={!edit && promo?.selectCus !== 1}
                      >
                        <div>Tất cả khách hàng</div>
                        <div>{customers.length} khách hàng</div>
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
        <Row>
          <Col span={12}>
            <div
              className={cx("join-object-view")}
              onClick={() => setModalPartnerJoinedOpen(true)}
            >
              <span>
                {partners.length}/{partners.length} đối tác tham gia
              </span>
              <RightOutlined className={cx("icon-arrow")} />
            </div>
          </Col>
          <Col span={12}>
            <div
              className={cx("join-object-view")}
              onClick={() => setModalCusJoinedOpen(true)}
            >
              <span>
                {cusJoined.length}/{customers.length} khách hàng tham gia
              </span>
              <RightOutlined className={cx("icon-arrow")} />
            </div>
          </Col>
        </Row>
        {edit && (
          <Space style={{ marginTop: "20px" }}>
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button
                type="primary"
                htmlType="submit"
                disabled={promo.IsDeleted}
              >
                Hủy mã
              </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button type="default" onClick={handleSaveAndCreate}>
                Lưu và tạo mới
              </Button>
            </Form.Item>
          </Space>
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
        footer={[
          <Button type="primary" onClick={() => setModalCusOpen(false)}>
            OK
          </Button>,
        ]}
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
                    src={convertImage(option?.Image || "")}
                  />
                  <div>{option.Fullname}</div>
                </div>
                <input
                  className="Checkbox-input"
                  style={{ width: "20px", height: "20px" }}
                  type="checkbox"
                  onChange={onClick}
                  checked={selectedCus.some((item) => item.id === option?.id)}
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
        footer={[
          <Button type="primary" onClick={() => setModalPartnerOpen(false)}>
            OK
          </Button>,
        ]}
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
      <Modal
        title={"Danh sách khách hàng tham gia"}
        className={cx("modal-option")}
        centered
        open={modalCusJoinedOpen}
        onOk={() => {
          setModalCusJoinedOpen(false);
        }}
        onCancel={() => {
          setModalCusJoinedOpen(false);
        }}
        // footer={[]}
        footer={[
          <Button type="primary" onClick={() => setModalCusJoinedOpen(false)}>
            OK
          </Button>,
        ]}
        closable={false}
        bodyStyle={{ height: "350px" }}
      >
        <div
          style={{
            height: "100%",
            overflow: "auto",
            padding: "0 16px",
            border: "1px solid rgba(140, 140, 140, 0.35)",
          }}
        >
          <List
            dataSource={cusJoined}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={<Avatar src={convertImage(item.Image)} size={40} />}
                  title={item.Fullname}
                  description={item.Phone}
                />
                <div className={cx("circle-used")}>
                  {item.Used}/{promo.NoOfJoin}
                </div>
              </List.Item>
            )}
          />
        </div>
      </Modal>

      <Modal
        title={"Danh sách đối tác tham gia"}
        className={cx("modal-option")}
        centered
        open={modalPartnerJoinedOpen}
        onOk={() => {
          setModalPartnerJoinedOpen(false);
        }}
        onCancel={() => {
          setModalPartnerJoinedOpen(false);
        }}
        // footer={[]}
        footer={[
          <Button
            type="primary"
            onClick={() => setModalPartnerJoinedOpen(false)}
          >
            OK
          </Button>,
        ]}
        closable={false}
        bodyStyle={{ height: "350px" }}
      >
        <div
          style={{
            height: "100%",
            overflow: "auto",
            padding: "0 16px",
            border: "1px solid rgba(140, 140, 140, 0.35)",
          }}
        >
          <List
            dataSource={partners}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={<Avatar src={convertImage(item.Image)} size={40} />}
                  title={item.PartnerName}
                  description={item.Phone}
                />
                <div className={cx("circle-used")}>
                  {item.Used || 1}/{promo.NoOfJoin}
                </div>
              </List.Item>
            )}
          />
        </div>
      </Modal>
    </div>
  );
};

export default PromoPartnerDetail;
