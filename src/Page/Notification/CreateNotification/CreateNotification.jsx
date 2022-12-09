import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import ReactQuill, { Quill, editor } from "react-quill";
import { MultiSelect } from "react-multi-select-component";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

import "react-quill/dist/quill.snow.css";

import styles from "./createNotification.module.scss";
import "./replaceStyles.scss";

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
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import moment from "moment";
import { partnerService } from "../../../services/PartnerService";
import { userService } from "../../../services/UserService";
import { convertImage } from "../../../../utils/convert";
import { notifyService } from "../../../services/notifyService";
import toastMessage from "../../../Components/ToastMessage";

const cx = classNames.bind(styles);

const NOTIFY_TYPE = [
  { value: 1, label: "Khuyến mãi" },
  { value: 2, label: "Sự kiện" },
  { value: 3, label: "Chính sách" },
];

const CreateNotification = () => {
  const [data, setData] = useState({
    Content: "",
    Object: 0,
    Title: "",
    Type: 1,
    option: 1,
    SendingTime: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [partner, setPartner] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const getPartner = async () => {
      const res = await partnerService.getAllPartnersNotification();
      console.log(res.data);
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
    console.log(html);
    setText(html);
  };
  // const modules = {
  //   toolbar: {
  //     container: "#ccc",
  //   },
  // };
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
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url?.substring(file.url?.lastIndexOf("/") + 1)
    );
  };

  // const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

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

  const disabledDateTime = () => {
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
    // console.log(value);
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
      console.log({
        Title: newData.Title,
        Content: newData.Content,
        Type: newData.Type,
        SendingTime: moment(newData.SendingTime["$d"])
          .add(7, "hour")
          .toISOString(),
        Exception: newException,
        image: data.image.file,
      });
      // delete newNotification.image.preview;
      const formData = new FormData();
      formData.append("Title", newData.Title);
      formData.append("Content", newData.Content);
      formData.append("Type", newData.Type);
      formData.append(
        "SendingTime",
        moment(newData.SendingTime["$d"]).add(7, "hour").toISOString()
      );
      formData.append("Exception", newException);
      formData.append("image", newData.image.file.originFileObj);
      await notifyService.createNotification(formData);
      toastMessage("Tạo thông báo thành công!", "success");
    } catch (error) {
      toastMessage("Tạo thông báo thất bại!", "error");
    }
  };

  return (
    <div className={cx("create-notification-wrapper")}>
      <Form
        // labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        layout="vertical"
        onValuesChange={onFormChange}
        // disabled={componentDisabled}
        size="large"
        initialValues={data}
        onFinish={handleSubmit}
      >
        <Row>
          <Col span={12}>
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
                  // modules={modules}
                  formats={formats}
                />
              </Form.Item>
            </div>
          </Col>
          <Col span={12}>
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

        <Form.Item className={cx("")} htmlType="submit" onClick={handleSubmit}>
          <Button type="primary">Gửi thông báo</Button>
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
