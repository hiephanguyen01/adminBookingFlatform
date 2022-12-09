import React, { useState } from "react";
import classNames from "classnames/bind";
import dayjs from "dayjs";

import styles from "./promoCreate.module.scss";
import { Col, DatePicker, Form, Input, Radio, Row, Space } from "antd";
import moment from "moment";

const cx = classNames.bind(styles);

const PromoCreate = () => {
  const [partners, setPartners] = useState([]);
  const [sustomers, setCustomers] = useState([]);

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
  return (
    <div className={cx("promo-create-container")}>
      <Form
        // labelCol={{ span: 12 }}
        // wrapperCol={{ span: 24 }}
        layout="vertical"
        size="large"
        // onValuesChange={onFormLayoutChange}
        // disabled={componentDisabled}
      >
        <Row>
          <Col span={12}>
            <div className={cx("w-100")}>
              <Form.Item label="Mã khuyến mãi" wrapperCol={{ span: 24 }}>
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
                <Form.Item label="Số lượng mã">
                  <Input />
                </Form.Item>
              </div>
              <div className={cx("w-50")}>
                <Form.Item label="Số lượng mã/đối tượng">
                  <Input />
                </Form.Item>
              </div>
            </div>
            <div className={cx("w-100")}>
              <Form.Item label="Tiêu đề" wrapperCol={{ span: 24 }}>
                <Input />
              </Form.Item>
            </div>
            <div className={cx("w-100")}>
              <Form.Item label="Nội dung">
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
                <Form.Item label="Hỗ trợ booking studio (%)">
                  <Input />
                </Form.Item>
              </div>
              <div className={cx("w-50")}>
                <Form.Item label="Đối tác">
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
                <Form.Item label="Input">
                  <DatePicker
                    format="YYYY-MM-DD HH:mm"
                    disabledDate={disabledDate}
                    disabledTime={disabledDateTime}
                    showTime={{ defaultValue: dayjs("00:00:00", "HH:mm") }}
                  />
                </Form.Item>
              </div>
              <div className={cx("w-50")}>
                <Form.Item label="Input">
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
              <Form.Item label="Input">
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
                <Form.Item className={cx("form-custom-radio")} name={"option"}>
                  <Radio.Group
                    // onChange={() => {}}
                    // value={""}
                    className={cx("custom-radio-group")}
                  >
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <Radio
                        value={1}
                        className={cx("custom-radio")}
                        onClick={() => {}}
                      >
                        <div>Tất cả đối tác</div>
                        <div>{partners.length} đối tác</div>
                      </Radio>

                      <Radio
                        value={2}
                        className={cx("custom-radio")}
                        onClick={() => {}}
                      >
                        <div>Tất cả đối tác NGOẠI TRỪ</div>
                        <div>
                          {/* {data.option === 2 ? selected.length : 0}/ */}
                          {partners.length} đối tác
                        </div>
                      </Radio>
                      <Radio
                        value={3}
                        className={cx("custom-radio")}
                        onClick={() => {
                          // setModalOpen(true);
                          // if (data.option !== 3) {
                          //   setSelected([]);
                          // }
                        }}
                      >
                        <div>Tùy chọn đối tác</div>
                        <div>
                          {/* {data.option === 3 ? selected.length : 0}/ */}
                          {partners.length} đối tác
                        </div>
                      </Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>
              </div>
              <div className={cx("w-50")}>
                <Form.Item className={cx("form-custom-radio")} name={"option"}>
                  <Radio.Group
                    // onChange={() => {}}
                    // value={""}
                    className={cx("custom-radio-group")}
                  >
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <Radio
                        value={1}
                        className={cx("custom-radio")}
                        onClick={() => {}}
                      >
                        <div>Tất cả đối tác</div>
                        <div>{partners.length} đối tác</div>
                      </Radio>

                      <Radio
                        value={2}
                        className={cx("custom-radio")}
                        onClick={() => {}}
                      >
                        <div>Tất cả đối tác NGOẠI TRỪ</div>
                        <div>
                          {/* {data.option === 2 ? selected.length : 0}/ */}
                          {partners.length} đối tác
                        </div>
                      </Radio>
                      <Radio
                        value={3}
                        className={cx("custom-radio")}
                        onClick={() => {
                          // setModalOpen(true);
                          // if (data.option !== 3) {
                          //   setSelected([]);
                          // }
                        }}
                      >
                        <div>Tùy chọn đối tác</div>
                        <div>
                          {/* {data.option === 3 ? selected.length : 0}/ */}
                          {partners.length} đối tác
                        </div>
                      </Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>
              </div>
            </div>
            <div className={cx("join-object")}>Loại hình đơn đặt áp dụng</div>
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
            <div className={cx("join-object")}>Hình thức khuyến mãi</div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "95%",
              }}
            >
              <Radio.Group>
                <div className={cx("w-50", "partner-title")}>
                  <Radio value={0} onClick={() => setSelected([])}>
                    Giảm tiền
                  </Radio>
                </div>
              </Radio.Group>

              <div className={cx("w-50", "cus-title")}>
                <Radio value={1} onClick={() => setSelected([])}>
                  Giảm tỷ lệ (%)
                </Radio>
              </div>
            </div>

            <Form.Item label="Input">
              <Input />
            </Form.Item>
            <Form.Item label="Input">
              <Input />
            </Form.Item>
            <div className={cx("join-object")}>
              YÊU CẦU XÁC NHẬN THAM GIA TỪ ĐỐI TÁC
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "95%",
              }}
            >
              <Radio.Group>
                <div className={cx("w-50", "partner-title")}>
                  <Radio value={0} onClick={() => setSelected([])}>
                    Có
                  </Radio>
                </div>
              </Radio.Group>

              <div className={cx("w-50", "cus-title")}>
                <Radio value={1} onClick={() => setSelected([])}>
                  Không
                </Radio>
              </div>
            </div>
          </Col>
        </Row>
        {/* <Form.Item label="Checkbox" name="disabled" valuePropName="checked">
          <Checkbox>Checkbox</Checkbox>
        </Form.Item>
        <Form.Item label="Radio">
          <Radio.Group>
            <Radio value="apple"> Apple </Radio>
            <Radio value="pear"> Pear </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Select">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="TreeSelect">
          <TreeSelect
            treeData={[
              {
                title: "Light",
                value: "light",
                children: [{ title: "Bamboo", value: "bamboo" }],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="Cascader">
          <Cascader
            options={[
              {
                value: "zhejiang",
                label: "Zhejiang",
                children: [
                  {
                    value: "hangzhou",
                    label: "Hangzhou",
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="DatePicker">
          <DatePicker />
        </Form.Item>
        <Form.Item label="RangePicker">
          <RangePicker />
        </Form.Item>
        <Form.Item label="InputNumber">
          <InputNumber />
        </Form.Item>
        <Form.Item label="TextArea">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Switch" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList">
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item label="Button">
          <Button>Button</Button>
        </Form.Item> */}
      </Form>
    </div>
  );
};

export default PromoCreate;
