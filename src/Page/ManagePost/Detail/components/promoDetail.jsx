import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";

import { Col, Form, Input, Radio, Row } from "antd";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { promoCodeService } from "../../../../services/PromoCodeService";
import styles from "./PromoPartnerDetail.module.scss";

const cx = classNames.bind(styles);

const PromoDetail = ({ promoId }) => {
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
    const getPromoDetail = async () => {
      const res = await promoCodeService.getPromoCodeById(promoId);
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
  }, [promoId]);

  return (
    <div className={cx("promo-create-container")}>
      <Form
        // labelCol={{ span: 12 }}
        // wrapperCol={{ span: 24 }}
        layout="vertical"
        size="large"
        form={form}
        // disabled={componentDisabled}
        // initialValues={promo}
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

            <div className={cx("w-100")}>
              <Form.Item
                label="Tiêu đề"
                wrapperCol={{ span: 24 }}
                name="Title"
                rules={[{ required: true }]}
              >
                <Input disabled={true} />
              </Form.Item>
            </div>
            <div className={cx("w-100")}>
              <Form.Item
                label="Nội dung"
                name={"Content"}
                rules={[{ required: true }]}
              >
                <Input.TextArea rows={4} disabled={true} />
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
                  <Input disabled={true} />
                </Form.Item>
              </div>
              <div className={cx("w-50")}>
                <Form.Item
                  label="Đối tác (%)"
                  name={"SpendingPartner"}
                  rules={[{ required: true }]}
                >
                  <Input disabled={true} />
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
                </Form.Item>
              </div>
            </div>
            {/* <div className={cx("w-100")}>
              <Form.Item label="Ghi chú" name={"Note"}>
                <Input disabled={true} />
              </Form.Item>
            </div> */}
          </Col>
          <Col span={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div className={cx("w-50")}>
                <Form.Item label="Ngày tham gia" rules={[{ required: true }]}>
                  <Input
                    // value={`${
                    //   Number(promo?.NoOfCode) - Number(promo?.NoOfJoined)
                    // }/${promo?.NoOfCode}`}
                    disabled={true}
                  />
                </Form.Item>
              </div>
              <div className={cx("w-50")}>
                <Form.Item label="Số mã đã dùng" rules={[{ required: true }]}>
                  <Input
                    value={`${promo?.countUsed}/${promo?.NoOfJoin}`}
                    disabled={true}
                  />
                </Form.Item>
              </div>
            </div>

            <div className={cx("join-object")}>Hình thức khuyến mãi</div>
            <Form.Item name={"TypeReduce"} rules={[{ required: true }]}>
              <Radio.Group className={cx("w-100")} disabled={true}>
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
                  <Input disabled={true} />
                </Form.Item>
                <Form.Item
                  label="Giá trị đơn đặt tối thiểu (VNĐ)"
                  name={"MinApply"}
                  rules={[{ required: promo.TypeReduce === 1 ? true : false }]}
                >
                  <Input disabled={true} />
                </Form.Item>{" "}
              </>
            ) : (
              <>
                <Form.Item
                  label="Tỉ lệ giảm (%)"
                  name={"ReduceValue"}
                  rules={[{ required: promo.TypeReduce === 2 ? true : false }]}
                >
                  <Input disabled={true} />
                </Form.Item>
                <Form.Item
                  label="Giá trị đơn đặt tối đa (VNĐ)"
                  name={"MaxReduce"}
                  rules={[{ required: promo.TypeReduce === 2 ? true : false }]}
                >
                  <Input disabled={true} />
                </Form.Item>
                <Form.Item
                  label="Giá trị đơn đặt tối thiểu (VNĐ)"
                  name={"MinApply"}
                  rules={[{ required: promo.TypeReduce === 2 ? true : false }]}
                >
                  <Input disabled={true} />
                </Form.Item>
              </>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default PromoDetail;
