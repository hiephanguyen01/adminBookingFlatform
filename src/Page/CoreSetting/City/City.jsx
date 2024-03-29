import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";

import styles from "./city.module.scss";
import { Button, Form, Input, Modal, Space, Switch, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { convertImage } from "../../../../utils/convert";
import toastMessage from "../../../Components/ToastMessage";
import { Link } from "react-router-dom";
import { cityService } from "../../../services/CityService";
import * as XLSX from "xlsx";

const cx = classNames.bind(styles);

const City = () => {
  const limit = 4;
  const [form] = Form.useForm();
  const [city, setCity] = useState([]);
  const [currentCity, setCurrentCity] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateOpenModal, setIsCreateOpenModal] = useState(false);
  const [fileData, setFileData] = useState([]);

  useEffect(() => {
    const getAllCity = async () => {
      const res = await cityService.getAllCity();
      setCity(res.data);
    };
    getAllCity();
  }, []);

  const handleDelete = async () => {
    try {
      await cityService.deleteCity(currentCity.id);
      const res = await cityService.getAllCity();
      setCity(res.data);
      setIsDeleteModalOpen(false);
    } catch (error) {}
  };

  const handleEditCity = async () => {
    try {
      await cityService.updateCity(currentCity.id, currentCity);
      const res = await cityService.getAllCity();
      setCity(res.data);
      setIsEditModalOpen(false);
      toastMessage("Cập nhật thông tin tỉnh/thành phố thành công!", "success");
    } catch (error) {
      toastMessage("Cập nhật thông tin tỉnh/thành phố thất bại!", "error");
    }
  };

  const handleCreateCity = async () => {
    try {
      if (fileData.length > 0) {
        for (let i = 0; i < fileData.length; i++) {
          await cityService.createCity(fileData[i]);
        }
        setFileData([]);
      } else {
        await cityService.createCity(currentCity);
      }
      const res = await cityService.getAllCity();
      setCity(res.data);
      setIsCreateOpenModal(false);
      toastMessage("Tạo tỉnh/thành phố thành công!", "success");
    } catch (error) {
      toastMessage("Tạo tỉnh/thành phố thất bại!", "error");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 200,
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      width: 200,
    },
    {
      title: "Code",
      dataIndex: "Code",
      key: "Code",
    },
    {
      title: "TenantId",
      dataIndex: "TenantId",
      key: "TenantId",
      width: 150,
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
              setCurrentCity(value);
            }}
          />
          <Button
            type="primary"
            shape="circle"
            style={{ backgroundColor: "#1677ff" }}
            icon={<EditOutlined />}
            onClick={() => {
              setIsEditModalOpen(true);
              setCurrentCity(value);
              form.setFieldsValue(value);
            }}
          />
        </Space>
      ),
      width: 200,
    },
  ];

  const readFileExcel = async (fileExcel) => {
    try {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(fileExcel);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsName = wb.SheetNames[0];
        const ws = wb.Sheets[wsName];
        const data = XLSX.utils.sheet_to_json(ws);
        const formatData = data.reduce(
          (newArr, d) => [
            ...newArr,
            { Name: d["Tỉnh/Thành phố"], Code: d["Mã Tỉnh/Thành phố"] },
          ],
          []
        );
        setFileData(formatData);
      };
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cx("city-container")}>
      <div className={cx("city-header")}>
        <h2>Quản lý tỉnh/ thành phố</h2>
        <Button
          type="primary"
          style={{ backgroundColor: "#1677ff" }}
          size="large"
          onClick={() => {
            setIsCreateOpenModal(true);
            form.resetFields();
          }}
        >
          <PlusOutlined />
          Tạo tỉnh/thành phố
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={city}
        size="middle"
        pagination={false}
        scroll={{
          y: 450,
        }}
      />
      <Modal
        title="Xác nhận"
        open={isDeleteModalOpen}
        onOk={() => handleDelete()}
        onCancel={() => setIsDeleteModalOpen(false)}
        footer={[
          <Button
            type="default"
            onClick={() => setIsDeleteModalOpen(false)}
            style={{ marginRight: "15px" }}
          >
            Thoát
          </Button>,
          <Button type="primary" onClick={handleDelete}>
            Đồng Ý
          </Button>,
        ]}
      >
        Bạn có muốn xóa tỉnh {currentCity.Name} này không?
      </Modal>
      <Modal
        title="Cập nhật thông tin tỉnh/thành phố"
        open={isEditModalOpen}
        onOk={() => handleEditCity()}
        onCancel={() => setIsEditModalOpen(false)}
        footer={[
          <Button
            type="default"
            onClick={() => setIsEditModalOpen(false)}
            style={{ marginRight: "15px" }}
          >
            Thoát
          </Button>,
          <Button type="primary" onClick={handleEditCity}>
            Cập nhật
          </Button>,
        ]}
      >
        <Form
          form={form}
          size="large"
          // initialValues={currentCity}
          style={{ marginTop: "30px" }}
          onValuesChange={(value) =>
            setCurrentCity({ ...currentCity, ...value })
          }
        >
          <Form.Item label="Tên tỉnh" name={"Name"}>
            <Input />
          </Form.Item>
          <Form.Item label="Mã tỉnh" name={"Code"}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Tạo tỉnh/thành phố"
        open={isCreateOpenModal}
        onOk={() => handleCreateCity()}
        onCancel={() => setIsCreateOpenModal(false)}
        footer={[
          <input
            type="file"
            onChange={(e) => readFileExcel(e.target.files[0])}
          />,
          <Button
            type="default"
            onClick={() => setIsCreateOpenModal(false)}
            style={{ marginRight: "15px" }}
          >
            Thoát
          </Button>,
          <Button type="primary" onClick={handleCreateCity}>
            Lưu
          </Button>,
        ]}
      >
        <Form
          form={form}
          size="large"
          // initialValues={currentCity}
          style={{ marginTop: "30px" }}
          onValuesChange={(value) =>
            setCurrentCity({ ...currentCity, ...value })
          }
          labelCol={{ span: "8" }}
        >
          <Form.Item label="Tên tỉnh/thành phố" name={"Name"}>
            <Input />
          </Form.Item>
          <Form.Item label="Mã tỉnh" name={"Code"}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default City;
