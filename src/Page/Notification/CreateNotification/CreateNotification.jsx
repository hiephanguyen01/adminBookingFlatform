import classNames from "classnames/bind";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import ReactQuill from "react-quill";
dayjs.extend(customParseFormat);

import "react-quill/dist/quill.snow.css";

import styles from "./createNotification.module.scss";
import "./replaceStyles.scss";

import { LoadingOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Upload,
} from "antd";
import moment from "moment";
import { convertImage } from "../../../../utils/convert";
import { openNotification } from "../../../../utils/Notification";
import { notifyService } from "../../../services/notifyService";
import { partnerService } from "../../../services/PartnerService";
import { userService } from "../../../services/UserService";

const cx = classNames.bind(styles);

const NOTIFY_TYPE = [
  { value: 1, label: "Khuyến mãi" },
  { value: 2, label: "Sự kiện" },
  { value: 3, label: "Chính sách" },
];

const CreateNotification = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState({
    Content: "",
    Object: 0,
    Title: "",
    Type: 1,
    option: 1,
    SendingTime: moment(),
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [partner, setPartner] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const getPartner = async () => {
      const res = await partnerService.getAllPartnersNotification();
      setPartner(res.data.map((item) => ({ ...item, value: item.id })));
    };
    getPartner();
    const getCustomer = async () => {
      const res = await userService.getAllCustomerNotification();
      console.log(res.data);
      setCustomer(res.data.map((item) => ({ ...item, value: item.id })));
    };
    getCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeEditor = (html) => {
    setText(html);
  };
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike", "blockquote", "link"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        ["image"],
        // ["clean"],
      ],
    },
  };
  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "header",
    "blockquote",
    "code-block",
    "indent",
    "list",
    "direction",
    "align",
    "link",
    "image",
    "video",
    "formula",
  ];
  const [loading, setLoading] = useState(false);

  const onFormChange = (value) => {
    setData({ ...data, ...value });
  };

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
    return current && current < dayjs().subtract(1, "days");
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let newData = { ...data },
        newException = "";
      if (newData.Object === 0) {
        if (newData.option === 2) {
          newException =
            selected.map((item) => item.id).join(",") + ":" + newData.Object;
        } else if (newData.option === 3) {
          newException =
            partner
              .filter((item) => selected.some((itm) => itm.id !== item.id))
              .map((item) => item.id)
              .join(",") +
            ":" +
            newData.Object;
        } else {
          newException = ":" + newData.Object;
        }
      } else if (newData.Object === 1) {
        if (newData.option === 2) {
          newException =
            selected.map((item) => item.id).join(",") + ":" + newData.Object;
        } else if (newData.option === 3) {
          newException =
            customer
              .filter((item) => selected.some((itm) => itm.id !== item.id))
              .map((item) => item.id)
              .join(",") +
            ":" +
            newData.Object;
        } else {
          newException = ":" + newData.Object;
        }
      }
      // delete newNotification.image.preview;
      const formData = new FormData();
      formData.append("Title", newData.Title);
      formData.append("Content", newData.Content);
      formData.append("Type", newData.Type);
      formData.append(
        "SendingTime",
        moment(newData.SendingTime["$d"]).toISOString()
      );
      formData.append("Exception", newException);
      formData.append("image", newData.image.file.originFileObj);
      await notifyService.createNotification(formData);
      openNotification("success", "Tạo thông báo thành công!");
      form.resetFields();
      setData({
        Content: "",
        Object: 0,
        Title: "",
        Type: 1,
        option: 1,
        SendingTime: moment(),
      });
      setSelected([]);
    } catch (error) {
      openNotification("error", "Tạo thông báo thất bại!");
    }
    setLoading(false);
  };

  return (
    <div className={cx("create-notification-wrapper")}>
      <Form
        wrapperCol={{ span: 24 }}
        form={form}
        layout="vertical"
        onValuesChange={onFormChange}
        disabled={loading}
        size="large"
        onFinish={handleSubmit}
      >
        <Row gutter={[20, 20]}>
          <Col md={12} xs={24} sx={24}>
            <div className={cx("")}>
              <Form.Item
                className={cx("form-custom")}
                label="Loại thông báo"
                name={"Type"}
              >
                <Select>
                  {NOTIFY_TYPE.map((item) => (
                    <Select.Option key={item.value} value={item.value}>
                      {item.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                className={cx("form-custom")}
                label="Tiêu đề"
                name={"Title"}
              >
                <Input />
              </Form.Item>
              <Form.Item
                className={cx("form-custom")}
                label="Nội dung"
                name={"Content"}
              >
                <ReactQuill
                  className={cx("custom-quill")}
                  // style={{ height: "200px" }}
                  // value={text}
                  // onChange={handleChangeEditor}
                  modules={modules}
                  // formats={formats}
                />
              </Form.Item>
            </div>
          </Col>
          <Col md={12} xs={24} sx={24}>
            <div>
              <Form.Item
                className={cx("form-custom")}
                label="Đối tượng nhận thông báo"
                name={"Object"}
              >
                <Radio.Group>
                  <Radio value={0} onClick={() => setSelected([])}>
                    Đối tác
                  </Radio>
                  <Radio value={1} onClick={() => setSelected([])}>
                    Khách hàng
                  </Radio>
                </Radio.Group>
              </Form.Item>
              {data?.Object === 0 ? (
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
                        onClick={() => {
                          setSelected([]);
                        }}
                      >
                        <div>Tất cả đối tác</div>
                        <div>{partner.length} đối tác</div>
                      </Radio>

                      <Radio
                        value={2}
                        className={cx("custom-radio")}
                        onClick={() => {
                          setModalOpen(true);
                          if (data.option !== 2) {
                            setSelected([]);
                          }
                        }}
                      >
                        <div>Tất cả đối tác NGOẠI TRỪ</div>
                        <div>
                          {data.option === 2 ? selected.length : 0}/
                          {partner.length} đối tác
                        </div>
                      </Radio>
                      <Radio
                        value={3}
                        className={cx("custom-radio")}
                        onClick={() => {
                          setModalOpen(true);
                          if (data.option !== 3) {
                            setSelected([]);
                          }
                        }}
                      >
                        <div>Tùy chọn đối tác</div>
                        <div>
                          {data.option === 3 ? selected.length : 0}/
                          {partner.length} đối tác
                        </div>
                      </Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>
              ) : (
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
                        onClick={() => {
                          setSelected([]);
                        }}
                      >
                        <div>Tất cả khách hàng</div>
                        <div>{customer.length} khách hàng</div>
                      </Radio>

                      <Radio
                        value={2}
                        className={cx("custom-radio")}
                        onClick={() => {
                          setModalOpen(true);
                          setSelected([]);
                        }}
                      >
                        <div>Tất cả khách hàng NGOẠI TRỪ</div>
                        <div>
                          {data.option === 2 ? selected.length : 0}/
                          {customer.length} khách hàng
                        </div>
                      </Radio>
                      <Radio
                        value={3}
                        className={cx("custom-radio")}
                        onClick={() => {
                          setModalOpen(true);
                          if (data.option !== 3) {
                            setSelected([]);
                          }
                        }}
                      >
                        <div>Tùy chọn khách hàng</div>
                        <div>
                          {data.option === 3 ? selected.length : 0}/
                          {customer.length} khách hàng
                        </div>
                      </Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>
              )}

              <Form.Item
                label="Upload"
                // valuePropName="fileList"
                name={"image"}
              >
                {/* <Upload
                  // action="/upload.do"
                  listType="picture-card"
                  multiple={false}
                  onPreview={false}
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload> */}
                <Upload
                  listType="picture-card"
                  // fileList={fileList}
                  // onPreview={handlePreview}
                  // onChange={handleChange}
                  directory={false}
                >
                  {data?.image?.fileList.length >= 1 ? null : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
              <Form.Item name={"SendingTime"}>
                <DatePicker
                  format="YYYY-MM-DD HH:mm"
                  disabledDate={disabledDate}
                  disabledTime={disabledDateTime}
                  showTime={{ defaultValue: dayjs("00:00:00", "HH:mm") }}
                />
              </Form.Item>
            </div>
          </Col>
        </Row>

        <Form.Item className={cx("")} wrapperCol={{ span: "6" }}>
          <Button
            htmlType="submit"
            disabled={loading}
            size="large"
            type="primary"
          >
            {loading && <LoadingOutlined />}
            &nbsp;Gửi thông báo
          </Button>
        </Form.Item>
      </Form>
      <Modal
        // title={}
        className={cx("modal-option")}
        centered
        open={modalOpen}
        onOk={() => {
          setModalOpen(false);
        }}
        onCancel={() => {
          setModalOpen(false);
        }}
        closable={false}
        bodyStyle={{ height: "350px" }}
      >
        <MultiSelect
          className={""}
          options={data.Object === 0 ? partner : customer}
          value={selected}
          onChange={setSelected}
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
                  <div>{option.PartnerName || option.Fullname}</div>
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
    </div>
  );
};

export default CreateNotification;
