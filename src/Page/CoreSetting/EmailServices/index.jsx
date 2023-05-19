import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Divider, Popconfirm, Space, Switch, Table } from "antd";
import React, { useEffect, useState } from "react";
import { openNotification } from "../../../../utils/Notification";
import { mailService } from "../../../services/MailService";
import EmailFormModal from "./components/EmailFormModal";

const EmailService = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataSrc, setDataSrc] = useState([]);
  const [dataEdit, setDataEdit] = useState(null);
  const [onLoadingSwitch, setOnLoadingSwitch] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setDataEdit(null);
  };
  const confirm = async (id) => {
    try {
      const { data } = await mailService.destoy(id);
      data && setDataSrc(dataSrc.filter((val) => val.id !== id));
      openNotification("success", "Thành công");
    } catch (error) {
      openNotification("error", "Thất bại");
    }
  };
  const onChangeCheck = async (record) => {
    try {
      setOnLoadingSwitch(true);
      await mailService.activate(record?.id);
    } catch (error) {
      console.log("🚀 ~ onChangeCheck ~ error:", error);
    }
    setOnLoadingSwitch(false);
  };

  const columns = [
    {
      title: "Active",
      dataIndex: "isActivate",
      sorter: {
        compare: (a, b) => a.isActivate - b.isActivate,
        multiple: 1,
      },
      render: (_, record) => (
        <Switch
          checkedChildren="Activate"
          unCheckedChildren="Inactivate"
          disabled={onLoadingSwitch}
          checked={_}
          onChange={() => onChangeCheck(record)}
        />
      ),
    },
    {
      title: "Mail",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Action",
      key: "id",
      dataIndex: "id",
      render: (id, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              showModal();
              setDataEdit(record);
            }}></Button>
          <Popconfirm
            title="Xoá"
            description="Bạn có chắc là muốn xoá chứ?"
            onConfirm={() => confirm(id)}
            okText="Yes"
            cancelText="No">
            <Button type="primary" icon={<DeleteOutlined />}></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    isModalOpen === false &&
      (async () => {
        setIsLoading(true);
        try {
          const { data } = await mailService.all();
          setDataSrc(data);
        } catch (error) {
          console.log("🚀 ~ error:", error);
        }
        setIsLoading(false);
      })();
  }, [isModalOpen, onLoadingSwitch]);

  return (
    <div>
      <div
        className="chile"
        style={{ padding: "20px", display: "flex", justifyContent: "end" }}>
        <Button type="primary" size="large" onClick={showModal}>
          Add Email
        </Button>
      </div>
      <Divider />
      <div className="chile">
        <Table loading={isLoading} dataSource={dataSrc} columns={columns} />
      </div>
      <EmailFormModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        data={dataEdit}
      />
    </div>
  );
};

export default EmailService;
