import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames/bind";

import styles from "./ward.module.scss";
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
import toastMessage from "../../../Components/ToastMessage";
import { cityService } from "../../../services/CityService";
import { districtService } from "../../../services/DistrictService";
import { wardService } from "../../../services/WardService";

const cx = classNames.bind(styles);

const Ward = () => {
  const [form] = Form.useForm();
  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [provinceId, setProvinceId] = useState();
  const [districtId, setDistrictId] = useState();
  const [currentWard, setCurrentWard] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateOpenModal, setIsCreateOpenModal] = useState(false);

  // const getAllDistrict = useCallback(async () => {
  //   const res = await districtService.getAllDistrict(provinceId);
  //   setDistrict(res.data);
  // }, [provinceId]);

  useEffect(() => {
    const getAllCity = async () => {
      const res = await cityService.getAllCity();
      setCity(res.data);
      setProvinceId(res.data[0].id);
    };
    getAllCity();
  }, []);

  useEffect(() => {
    const getDistrict = async () => {
      const res = await districtService.getAllDistrict(provinceId);
      setDistrict(res.data);
      setDistrictId(res?.data[0]?.id);
    };
    getDistrict();
  }, [provinceId]);

  useEffect(() => {
    const getAllWard = async () => {
      const res = await wardService.getAllWard(districtId, provinceId);
      setWard(res?.data);
    };
    getAllWard();
  }, [districtId, provinceId]);

  const handleDelete = async () => {
    try {
      await wardService.deleteWard(currentWard.id);
      const res = await wardService.getAllWard(districtId);
      setWard(res.data);
      setIsDeleteModalOpen(false);
      toastMessage("Xóa thành công!", "success");
    } catch (error) {
      toastMessage("Xóa thất bại!", "error");
    }
  };

  const handleEdit = async () => {
    try {
      await wardService.updateWard(currentWard.id, currentWard);
      const res = await wardService.getAllWard(districtId);
      setWard(res.data);
      setIsEditModalOpen(false);
      toastMessage("Cập nhật thông tin thành công!", "success");
    } catch (error) {
      toastMessage("Cập nhật thông tin thất bại!", "error");
    }
  };

  const handleCreate = async () => {
    try {
      await wardService.createWard({
        ...currentWard,
        DistrictId: districtId,
        ProvinceId: provinceId,
      });
      const res = await wardService.getAllWard(districtId);
      setWard(res.data);
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
              setCurrentWard(value);
            }}
          />
          <Button
            type="primary"
            shape="circle"
            style={{ backgroundColor: "#1677ff" }}
            icon={<EditOutlined />}
            onClick={() => {
              setIsEditModalOpen(true);
              setCurrentWard(value);
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
    // const res = await districtService.getAllWard(value);
    // setWard(res.data);
  };

  return (
    <>
      <div className={cx("district-filter")}>
        <Space direction="horizontal">
          <Space style={{ marginRight: "20px" }}>
            <span className={cx("label-city")}>Tỉnh/thành phố</span>
            {city.length > 0 && (
              <Select
                value={provinceId}
                style={{ width: 200 }}
                onChange={handleProvinceChange}
                options={city.map((ct) => ({
                  label: ct.Name,
                  value: ct.id,
                }))}
                size="large"
              />
            )}
          </Space>
          <div>
            <span className={cx("label-city")}>Quận/huyện</span>
            {district.length > 0 && (
              <Select
                value={districtId}
                style={{ width: 200 }}
                onChange={(value) => setDistrictId(value)}
                options={district.map((dt) => ({
                  label: dt.Name,
                  value: dt.id,
                }))}
                size="large"
              />
            )}
          </div>
        </Space>
      </div>
      <div className={cx("district-container")}>
        <div className={cx("district-header")}>
          <h2>Quản lý phường/xã</h2>
          <Button
            type="primary"
            style={{ backgroundColor: "#1677ff" }}
            size="large"
            onClick={() => {
              setIsCreateOpenModal(true);
              form.resetFields();
            }}>
            <PlusOutlined />
            Tạo phường/xã
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={ward}
          size="middle"
          pagination={false}
          scroll={{
            y: 350,
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
              style={{ marginRight: "15px" }}>
              Thoát
            </Button>,
            <Button type="primary" onClick={handleDelete}>
              Xóa
            </Button>,
          ]}>
          Bạn có muốn xóa {currentWard.Prefix} {currentWard.Name} này không?
        </Modal>
        <Modal
          title="Cập nhật thông tin phường/xã"
          open={isEditModalOpen}
          onOk={() => handleEdit()}
          onCancel={() => setIsEditModalOpen(false)}
          footer={[
            <Button
              type="default"
              onClick={() => setIsEditModalOpen(false)}
              style={{ marginRight: "15px" }}>
              Thoát
            </Button>,
            <Button type="primary" onClick={handleEdit}>
              Cập nhật
            </Button>,
          ]}>
          <Form
            form={form}
            size="large"
            // initialValues={currentWard}
            style={{ marginTop: "30px" }}
            onValuesChange={(value) =>
              setCurrentWard({ ...currentWard, ...value })
            }
            labelCol={{ span: "6" }}
            wrapperCol={{ span: "17" }}>
            <Form.Item label="Loại" name={"Prefix"}>
              <Select
                options={[
                  { value: "phường", label: "Phường" },
                  { value: "xã", label: "Xã" },
                ]}
              />
            </Form.Item>
            <Form.Item label="Tên phường/xã" name={"Name"}>
              <Input />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Tạo phường/xã"
          open={isCreateOpenModal}
          onOk={() => handleCreate()}
          onCancel={() => setIsCreateOpenModal(false)}
          footer={[
            <Button
              type="default"
              onClick={() => setIsCreateOpenModal(false)}
              style={{ marginRight: "15px" }}>
              Thoát
            </Button>,
            <Button type="primary" onClick={handleCreate}>
              Lưu
            </Button>,
          ]}>
          <Form
            form={form}
            size="large"
            // initialValues={currentWard}
            style={{ marginTop: "30px" }}
            onValuesChange={(value) =>
              setCurrentWard({ ...currentWard, ...value })
            }
            labelCol={{ span: "6" }}
            wrapperCol={{ span: "17" }}>
            <Form.Item label="Loại" name={"Prefix"}>
              <Select
                options={[
                  { value: "phường", label: "Phường" },
                  { value: "xã", label: "Xã" },
                ]}
              />
            </Form.Item>
            <Form.Item label="Tên phường/xã" name={"Name"}>
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default Ward;
