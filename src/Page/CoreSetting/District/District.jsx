import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";

import styles from "./district.module.scss";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Switch,
  Table,
  Tag,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { convertImage } from "../../../../utils/convert";
import toastMessage from "../../../Components/ToastMessage";
import { Link } from "react-router-dom";
import { cityService } from "../../../services/CityService";
import { districtService } from "../../../services/DistrictService";

const cx = classNames.bind(styles);

const District = () => {
  const [form] = Form.useForm();
  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);
  const [provinceId, setProvinceId] = useState([]);
  const [currentDistrict, setCurrentDistrict] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateOpenModal, setIsCreateOpenModal] = useState(false);

  useEffect(() => {
    const getAllCity = async () => {
      const res = await cityService.getAllCity();
      setCity(res.data);
    };
    getAllCity();
  }, []);

  useEffect(() => {
    const getAllDistrict = async () => {
      const res = await districtService.getAllDistrict(city[0]?.id);
      // console.log(res);
      setDistrict(res.data);
    };
    getAllDistrict();
    setProvinceId(city[0]?.id);
  }, [city]);

  const handleDelete = async () => {
    try {
      await districtService.deleteDistrict(currentDistrict.id);
      const res = await districtService.getAllDistrict(provinceId);
      setDistrict(res.data);
      setIsDeleteModalOpen(false);
      toastMessage("Xóa thành công!", "success");
    } catch (error) {
      toastMessage("Xóa thất bại!", "success");
    }
  };

  const handleEdit = async () => {
    try {
      await districtService.updateDistrict(currentDistrict.id, currentDistrict);
      const res = await districtService.getAllDistrict(provinceId);
      setDistrict(res.data);
      setIsEditModalOpen(false);
      toastMessage("Cập nhật thông tin thành công!", "success");
    } catch (error) {
      toastMessage("Cập nhật thông tin thất bại!", "error");
    }
  };

  const handleCreate = async () => {
    try {
      await districtService.createDistrict({
        ...currentDistrict,
        ProvinceId: Number(provinceId),
      });
      const res = await districtService.getAllDistrict(provinceId);
      setDistrict(res.data);
      setIsCreateOpenModal(false);
      toastMessage("Tạo thành công!", "success");
    } catch (error) {
      toastMessage("Tạo phố thất bại!", "error");
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
      title: "Prefix",
      dataIndex: "Prefix",
      key: "Prefix",
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
              setCurrentDistrict(value);
            }}
          />
          <Button
            type="primary"
            shape="circle"
            style={{ backgroundColor: "#1677ff" }}
            icon={<EditOutlined />}
            onClick={() => {
              setIsEditModalOpen(true);
              setCurrentDistrict(value);
              form.setFieldsValue(value);
            }}
          />
        </Space>
      ),
      width: 200,
    },
  ];

  const handleProvinceChange = async (value) => {
    setProvinceId(value);
    const res = await districtService.getAllDistrict(value);
    // console.log(res);
    setDistrict(res.data);
  };

  return (
    <>
      <div className={cx("district-filter")}>
        <span className={cx("label-city")}>Tỉnh/thành phố</span>
        {city.length > 0 && (
          <Select
            defaultValue={city[0]?.id}
            style={{ width: 200 }}
            onChange={handleProvinceChange}
            options={city.map((ct) => ({
              label: ct.Name,
              value: ct.id,
            }))}
            size="large"
          />
        )}
      </div>
      <div className={cx("district-container")}>
        <div className={cx("district-header")}>
          <h2>Quản lý quận/huyện</h2>
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
            Tạo quận/huyện
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={district}
          size="middle"
          pagination={false}
          scroll={{
            y: 350,
          }}
        />
        <Modal
          title="Basic Modal"
          open={isDeleteModalOpen}
          onOk={() => handleDelete()}
          onCancel={() => setIsDeleteModalOpen(false)}
        >
          Bạn có muốn xóa {currentDistrict.Prefix} {currentDistrict.Name} này
          không?
        </Modal>
        <Modal
          title="Cập nhật thông tin quận/huyện phố"
          open={isEditModalOpen}
          onOk={() => handleEdit()}
          onCancel={() => setIsEditModalOpen(false)}
        >
          <Form
            form={form}
            size="large"
            // initialValues={currentDistrict}
            style={{ marginTop: "30px" }}
            onValuesChange={(value) =>
              setCurrentDistrict({ ...currentDistrict, ...value })
            }
            labelCol={{ span: "6" }}
            wrapperCol={{ span: "17" }}
          >
            <Form.Item label="Loại" name={"Prefix"}>
              <Select
                options={[
                  { value: "quận", label: "Quận" },
                  { value: "huyện", label: "Huyện" },
                ]}
              />
            </Form.Item>
            <Form.Item label="Tên quận/huyện" name={"Name"}>
              <Input />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Tạo quận/huyện"
          open={isCreateOpenModal}
          onOk={() => handleCreate()}
          onCancel={() => setIsCreateOpenModal(false)}
        >
          <Form
            form={form}
            size="large"
            // initialValues={currentDistrict}
            style={{ marginTop: "30px" }}
            onValuesChange={(value) =>
              setCurrentDistrict({ ...currentDistrict, ...value })
            }
            labelCol={{ span: "6" }}
            wrapperCol={{ span: "17" }}
          >
            <Form.Item label="Loại" name={"Prefix"}>
              <Select
                options={[
                  { value: "quận", label: "Quận" },
                  { value: "huyện", label: "Huyện" },
                ]}
              />
            </Form.Item>
            <Form.Item label="Tên quận/huyện" name={"Name"}>
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default District;
