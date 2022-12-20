import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";

import styles from "./webHook.module.scss";
import {
  Button,
  Form,
  Input,
  Modal,
  Pagination,
  Select,
  Space,
  Switch,
  Table,
  Tag,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import toastMessage from "../../../Components/ToastMessage";
import { Link } from "react-router-dom";
import { cityService } from "../../../services/CityService";
import { districtService } from "../../../services/DistrictService";
import { webHookService } from "../../../services/WebHookService";

const cx = classNames.bind(styles);

const WebHook = () => {
  const limit = 5;
  const [form] = Form.useForm();
  const [webHooks, setWebHooks] = useState([]);
  const [chooseWebHook, setChooseWebHook] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [filter, setFilter] = useState({
    page: 1,
    limit: limit,
    method: "",
  });

  useEffect(() => {
    const getAllWebHook = async () => {
      const res = await webHookService.getAllWebHook(filter);
      setWebHooks(res.data);
    };
    getAllWebHook();
  }, [filter]);

  const handleDelete = async () => {
    try {
      await webHookService.deleteWebHook(chooseWebHook.Id);
      const res = await webHookService.getAllWebHook(filter);
      setWebHooks(res.data);
      setIsDeleteModalOpen(false);
      toastMessage("Xóa thành công!", "success");
    } catch (error) {
      toastMessage("Xóa thất bại!", "error");
    }
  };

  const handleOnChangeChecked = async (checked, webHook) => {
    try {
      const newWebHook = { ...webHook, IsActive: checked };
      await webHookService.updateWebHook(webHook.Id, newWebHook);
      const res = await webHookService.getAllWebHook(filter);
      setWebHooks(res.data);
      toastMessage("Cập nhật thành công!", "success");
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "WebhookName",
      key: "WebhookName",
      width: 150,
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: "Method",
      dataIndex: "Method",
      key: "Method",
      width: 100,
    },
    {
      title: "Api",
      dataIndex: "WebhookUri",
      key: "WebhookUri",
      width: 200,
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: "Flow Id",
      dataIndex: "FlowId",
      key: "FlowId",
      width: 100,
    },
    {
      title: "Body",
      dataIndex: "Body",
      key: "Body",
      // width: 200,
      ellipsis: {
        showTitle: false,
      },
      render: (value) => <>{JSON.stringify(value)}</>,
    },
    {
      title: "Active",
      // dataIndex: "IsActive",
      // key: "IsActive",
      width: 150,
      render: (value) => (
        <Switch
          checked={value.IsActive}
          onChange={(checked) => {
            console.log(123);
            handleOnChangeChecked(checked, value);
          }}
        ></Switch>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (value) => (
        <Space size="middle">
          <Button
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => {
              setIsDeleteModalOpen(true);
              setChooseWebHook(value);
            }}
          />
          <Link to={"edit"} state={{ webHookId: value.Id }}>
            <Button
              type="primary"
              shape="circle"
              style={{ backgroundColor: "#1677ff" }}
              icon={<EditOutlined />}
            />
          </Link>
        </Space>
      ),
      width: 150,
    },
  ];

  return (
    <>
      <div className={cx("webHook-filter")}>
        <span className={cx("label-city")}>Chọn phương thức</span>

        <Select
          defaultValue={""}
          style={{ width: 200 }}
          onChange={(e) => setFilter({ ...filter, method: e })}
          options={[
            { value: "", label: "Tất cả" },
            { value: "get", label: "GET" },
            { value: "post", label: "POST" },
            { value: "put", label: "PUT" },
            { value: "patch", label: "PATCH" },
            { value: "delete", label: "DELETE" },
          ]}
          size="large"
        />
      </div>
      <div className={cx("webHook-container")}>
        <div className={cx("webHook-header")}>
          <h2>Quản lý webHook</h2>
          <Link to={"create"}>
            <Button
              type="primary"
              style={{ backgroundColor: "#1677ff" }}
              size="large"
            >
              <PlusOutlined />
              Tạo webHook
            </Button>
          </Link>
        </div>
        <Table
          columns={columns}
          dataSource={webHooks.slice(
            (filter.page - 1) * filter.limit,
            filter.page * filter.limit
          )}
          size="middle"
          pagination={false}
        />
        <Pagination
          defaultCurrent={filter.page}
          current={filter.page}
          total={Math.ceil(webHooks.length / limit) * 10}
          style={{ textAlign: "end", marginTop: "15px" }}
          onChange={(page) => setFilter({ ...filter, page })}
        />
        <Modal
          title="Basic Modal"
          open={isDeleteModalOpen}
          onOk={() => handleDelete()}
          onCancel={() => setIsDeleteModalOpen(false)}
        >
          Bạn có muốn xóa webhook này không?
        </Modal>
      </div>
    </>
  );
};

export default WebHook;
