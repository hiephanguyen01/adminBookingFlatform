import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./createWebHook.module.scss";
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  Select,
  Switch,
  Tabs,
  Upload,
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { bannerService } from "../../../../../services/Banner";
import toastMessage from "../../../../../Components/ToastMessage";
import { bankService } from "../../../../../services/BankService";
import TextArea from "antd/es/input/TextArea";
import { webHookService } from "../../../../../services/WebHookService";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const METHOD = [
  { value: "GET", label: "GET" },
  { value: "POST", label: "POST" },
  { value: "PUT", label: "PUT" },
  { value: "PATCH", label: "PATCH" },
  { value: "DELETE", label: "DELETE" },
];

const QUERIES = [
  { value: "Params", label: "Params" },
  { value: "Header", label: "Header" },
  { value: "Body", label: "Body" },
];

const FLOW = [
  { value: "1", label: "Thêm mới đơn đặt" },
  { value: "2", label: "Cập nhật trạng thái đơn đặt" },
  { value: "3", label: "Hoàn tất đơn đặt" },
];

const CreateWebHook = () => {
  const [form] = Form.useForm();
  const [webHook, setWebHook] = useState({});
  const [params, setParams] = useState([{ key: "", value: "" }]);
  const [header, setHeader] = useState([{ key: "", value: "" }]);
  const [body, setBody] = useState("");
  const handleOnChangeForm = (value) => {
    setWebHook({ ...webHook, ...value });
  };

  const convertQuery = (query) => {
    const newQuery = [...query].filter((item) => item.key !== "");
    return newQuery.reduce(
      (newArr, item) => ({
        ...newArr,
        [item.key.trim()]: item.value,
      }),
      {}
    );
  };
  const handleOnFinish = async () => {
    console.log(webHook, params, header, body);
    try {
      const newWebHook = {
        ...webHook,
        IsActive: webHook.IsActive ? webHook.IsActive : true,
        Params: convertQuery(params),
        Body: body !== "" ? JSON.parse(body) : {},
        Headers: convertQuery(header),
      };

      if (
        newWebHook.WebhookUri.includes("https://") ||
        newWebHook.WebhookUri.includes("http://")
      ) {
        await webHookService.createWebHook(newWebHook);
        form.resetFields();
        toastMessage("Tạo webHook thành công!", "success");
      } else {
        toastMessage("Vui lòng điền đúng API!", "warning");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChangeKeyParams = (e) => {
    const newParams = [...params].map((item, index) => {
      if (index === Number(e.target.name)) {
        return { ...item, key: e.target.value };
      }
      return item;
    });
    setParams(newParams);
  };
  const handleOnChangeValueParams = (e) => {
    let newParams = [...params].map((item, index) => {
      if (`${item.key}${index}` === e.target.name) {
        return { ...item, value: e.target.value };
      }
      return item;
    });
    setParams(newParams);
  };
  const handleAddRowParams = () => {
    setParams([...params, { key: "", value: "" }]);
  };
  const handleRemoveRowParams = (param, position) => {
    const newParams = params.filter((item, index) => {
      return `${item.key}${index}` !== `${param.key}${position}`;
    });
    setParams(newParams);
  };

  const handleOnChangeKeyHeader = (e) => {
    const newHeader = [...header].map((item, index) => {
      if (index === Number(e.target.name)) {
        return { ...item, key: e.target.value };
      }
      return item;
    });
    setHeader(newHeader);
  };
  const handleOnChangeValueHeader = (e) => {
    let newHeader = [...header].map((item, index) => {
      if (`${item.key}${index}` === e.target.name) {
        return { ...item, value: e.target.value };
      }
      return item;
    });
    setHeader(newHeader);
  };
  const handleAddRowHeader = () => {
    setHeader([...header, { key: "", value: "" }]);
  };
  const handleRemoveRowHeader = (param, position) => {
    const newHeader = header.filter((item, index) => {
      return `${item.key}${index}` !== `${param.key}${position}`;
    });
    setHeader(newHeader);
  };

  return (
    <div className={cx("create-banner-container")}>
      <Breadcrumb
        style={{
          fontSize: "16px",
          marginBottom: "10px",
          fontWeight: "bold",
        }}
      >
        <Breadcrumb.Item>
          <Link to={"/setting/webhook"} style={{ color: "#10b08a" }}>
            Quản lý webhook
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Tạo mới</Breadcrumb.Item>
      </Breadcrumb>
      <div className={cx("header")}>
        <h2>CREATE WEBHOOK</h2>
        <Button
          type="primary"
          style={{ backgroundColor: "#1677ff" }}
          size="large"
          onClick={handleOnFinish}
        >
          <PlusOutlined />
          ADD WEBHOOK
        </Button>
      </div>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        form={form}
        // initialValues={banner}
        size={"large"}
        onValuesChange={handleOnChangeForm}
      >
        <Form.Item
          label="Webhook name"
          name={"WebhookName"}
          rules={[{ required: true }]}
        >
          <Input placeholder="WebhookName" />
        </Form.Item>
        <Form.Item
          label="Active"
          name={"IsActive"}
          rules={[{ required: true }]}
        >
          <Switch defaultChecked={true} />
        </Form.Item>
        <Form.Item
          label="Select flow"
          name={"FlowId"}
          rules={[{ required: true }]}
        >
          <Select
            // style={{ width: 120 }}
            options={FLOW}
          />
        </Form.Item>
        <Form.Item label="Secret" name={"Secret"}>
          <Input placeholder="" />
        </Form.Item>
        <Form.Item label="Method" name={"Method"} rules={[{ required: true }]}>
          <Select
            // style={{ width: 120 }}
            options={METHOD}
          />
        </Form.Item>
        <Form.Item
          label="Api"
          name={"WebhookUri"}
          rules={[{ required: true }, { type: "url" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label=" ">
          <Tabs
            defaultActiveKey={"Params"}
            type="card"
            size="large"
            items={[
              {
                label: `Params`,
                key: "Params",

                children: (
                  <div className={cx("input-table")}>
                    <div
                      className={cx("input-table-row", "input-table-header")}
                    >
                      <div className={cx("input-table-col", "w-50")}>key</div>
                      <div className={cx("input-table-col", "w-50")}>value</div>
                    </div>
                    {params.map((item, index) => (
                      <div
                        key={index}
                        className={cx("input-table-row")}
                        onClick={() => {
                          if (index === params.length - 1) {
                            handleAddRowParams();
                          }
                        }}
                      >
                        <div className={cx("input-table-col", "w-50")}>
                          <input
                            type="text"
                            className={cx("input-text")}
                            placeholder="key"
                            name={`${index}`}
                            value={item.key}
                            onChange={handleOnChangeKeyParams}
                            //   ref={inputRef}
                          />
                        </div>
                        <div className={cx("input-table-col", "w-50")}>
                          <input
                            type="text"
                            className={cx("input-text")}
                            placeholder="value"
                            name={`${item.key}${index}`}
                            value={item.value}
                            onChange={handleOnChangeValueParams}
                            //   ref={inputRef}
                          />
                        </div>
                        {index !== params.length - 1 ? (
                          <i
                            className="fa-solid fa-trash-can btn-delete-row"
                            onClick={() => {
                              handleRemoveRowParams(item, index);
                            }}
                          ></i>
                        ) : (
                          <></>
                        )}
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                label: `Header`,
                key: "Header",

                children: (
                  <div className={cx("input-table")}>
                    <div
                      className={cx("input-table-row", "input-table-header")}
                    >
                      <div className={cx("input-table-col", "w-50")}>key</div>
                      <div className={cx("input-table-col", "w-50")}>value</div>
                    </div>
                    {header.map((item, index) => (
                      <div
                        key={index}
                        className={cx("input-table-row")}
                        onClick={() => {
                          if (index === header.length - 1) {
                            handleAddRowHeader();
                          }
                        }}
                      >
                        <div className={cx("input-table-col", "w-50")}>
                          <input
                            type="text"
                            className={cx("input-text")}
                            placeholder="key"
                            name={`${index}`}
                            value={item.key}
                            onChange={handleOnChangeKeyHeader}
                            //   ref={inputRef}
                          />
                        </div>
                        <div className={cx("input-table-col", "w-50")}>
                          <input
                            type="text"
                            className={cx("input-text")}
                            placeholder="value"
                            name={`${item.key}${index}`}
                            value={item.value}
                            onChange={handleOnChangeValueHeader}
                            //   ref={inputRef}
                          />
                        </div>
                        {index !== header.length - 1 ? (
                          <DeleteOutlined
                            className={cx("btn-delete-row")}
                            onClick={() => {
                              handleRemoveRowHeader(item, index);
                            }}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                label: `Body`,
                key: "Body",
                children: (
                  <TextArea
                    onChange={(e) => setBody(e.target.value)}
                    rows={4}
                  />
                ),
              },
            ]}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateWebHook;
