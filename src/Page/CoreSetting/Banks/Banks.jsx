import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";

import styles from "./banks.module.scss";
import { Button, Modal, Pagination, Space, Switch, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { convertImage } from "../../../../utils/convert";
import { bankService } from "../../../services/BankService";
import toastMessage from "../../../Components/ToastMessage";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const Banks = () => {
  const limit = 4;
  const [bank, setBank] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getAllBanks = async () => {
      const res = await bankService.getAllBank();
      console.log(res.data);
      setBank(res.data.data);
    };
    getAllBanks();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = (bank) => {
    handleDeleteBanks(bank);
    setIsModalOpen(false);
  };

  const handleOnChecked = async (e, value) => {
    try {
      const formData = new FormData();
      formData.append("IsVisible", e);
      let res;
      if (e) {
        res = await bankService.updateBank(value.id, formData);
      } else {
        res = await bankService.updateBank(value.id, formData);
      }
      const newBanks = bank.map((item) => {
        if (item.id === res.data.data.id) {
          return res.data.data;
        }
        return item;
      });
      setBank(newBanks);
      toastMessage("Cập nhật banner thành công!", "success");
    } catch (error) {}
  };

  const handleDeleteBanks = async (bank) => {
    try {
      const res = await bankService.deleteBank(bank.id);
      if (res.data.success) {
        const res = await bankService.getAllBank();
        setBank(res.data.data);
        // const newBanks = [...bank];
        // setBank(newBanks.filter((item) => item !== bank.id));
      }
    } catch (error) {}
  };

  const columns = [
    {
      title: "VN Name",
      dataIndex: "VNName",
      key: "VNName",
      width: 200,
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: "Eng Name",
      dataIndex: "EngName",
      key: "EngName",
      width: 200,
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: "Business Name",
      dataIndex: "BusinessName",
      key: "BusinessName",
      ellipsis: {
        showTitle: false,
      },
      width: 200,
    },
    {
      title: "Url",
      key: "Url",
      dataIndex: "Url",
      ellipsis: {
        showTitle: false,
      },
      width: 200,
      render: (url) => (
        <a href={url} target={"_blank"}>
          {url}
        </a>
      ),
    },
    {
      title: "Address",
      key: "Address",
      dataIndex: "Address",
      ellipsis: {
        showTitle: false,
      },
      width: 200,
    },
    {
      title: "Action",
      key: "action",
      render: (value) => (
        <Space size="middle">
          <Button
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={showModal}
          />
          <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={() => handleOk(value)}
            onCancel={handleCancel}
          >
            Bạn có muốn xóa ngân hàng này không?
          </Modal>
          <Link to={"edit"} state={{ bankId: value.id }}>
            <Button
              type="primary"
              shape="circle"
              style={{ backgroundColor: "#1677ff" }}
              icon={<EditOutlined />}
            />
          </Link>
        </Space>
      ),
      width: 200,
    },
  ];

  return (
    <div className={cx("bank-container")}>
      <div className={cx("bank-header")}>
        <h2>Quản lý ngân hàng</h2>
        <Link to={"create"}>
          <Button
            type="primary"
            style={{ backgroundColor: "#1677ff" }}
            size="large"
          >
            <PlusOutlined />
            Tạo ngân hàng
          </Button>
        </Link>
      </div>
      <Table
        columns={columns}
        dataSource={bank.slice((currentPage - 1) * limit, currentPage * limit)}
        size="middle"
        pagination={false}
      />

      <Pagination
        defaultCurrent={currentPage}
        current={currentPage}
        total={Math.ceil(bank.length / limit) * 10}
        style={{ textAlign: "end", marginTop: "15px" }}
        onChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Banks;
