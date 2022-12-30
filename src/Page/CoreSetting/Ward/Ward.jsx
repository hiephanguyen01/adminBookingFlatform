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
import * as XLSX from "xlsx";

const cx = classNames.bind(styles);

const Ward = () => {
  const [form] = Form.useForm();
  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [provinceCode, setProvinceCode] = useState();
  const [districtCode, setDistrictCode] = useState();
  const [currentWard, setCurrentWard] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateOpenModal, setIsCreateOpenModal] = useState(false);
  const [fileData, setFileData] = useState([]);

  // const getAllDistrict = useCallback(async () => {
  //   const res = await districtService.getAllDistrict(provinceCode);
  //   setDistrict(res.data);
  // }, [provinceCode]);

  useEffect(() => {
    const getAllCity = async () => {
      const res = await cityService.getAllCity();
      setCity(res.data);
      setProvinceCode(res.data[0].Code);
    };
    getAllCity();
  }, []);

  useEffect(() => {
    const getDistrict = async () => {
      const res = await districtService.getAllDistrict(provinceCode);
      setDistrict(res.data);
      setDistrictCode(res?.data[0]?.Code);
    };
    getDistrict();
  }, [provinceCode]);

  useEffect(() => {
    const getAllWard = async () => {
      const res = await wardService.getAllWard(districtCode);
      setWard(res?.data);
    };
    getAllWard();
  }, [districtCode]);

  const handleDelete = async () => {
    try {
      await wardService.deleteWard(currentWard.id);
      const res = await wardService.getAllWard(districtCode);
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
      const res = await wardService.getAllWard(districtCode);
      setWard(res.data);
      setIsEditModalOpen(false);
      toastMessage("Cập nhật thông tin thành công!", "success");
    } catch (error) {
      toastMessage("Cập nhật thông tin thất bại!", "error");
    }
  };

  const handleCreate = async () => {
    try {
      if (fileData.length > 0) {
        for (let i = 0; i < fileData.length; i++) {
          await wardService.createWard(fileData[i]);
        }
        setFileData([]);
      } else {
        await wardService.createWard({
          ...currentWard,
          DistrictCode: districtCode,
        });
      }
      const res = await wardService.getAllWard(districtCode);
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
    setProvinceCode(value);
    // const res = await districtService.getAllWard(value);
    // // console.log(res);
    // setWard(res.data);
  };

  const readFileExcel = async (fileExcel) => {
    try {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(fileExcel);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsName = wb.SheetNames[2];
        const ws = wb.Sheets[wsName];
        const data = XLSX.utils.sheet_to_json(ws);
        const formatData = data.reduce(
          (newArr, d) => [
            ...newArr,
            {
              Name: d["Phường/Xã"],
              Prefix: d["Prefix"] || "",
              DistrictCode: d["Mã Quận/Huyện"],
            },
          ],
          []
        );
        console.log(formatData);
        setFileData(formatData);
      };
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={cx("district-filter")}>
        <Space direction="horizontal">
          <Space style={{ marginRight: "20px" }}>
            <span className={cx("label-city")}>Tỉnh/thành phố</span>
            {city.length > 0 && (
              <Select
                showSearch
                value={provinceCode}
                style={{ width: 200 }}
                onChange={handleProvinceChange}
                options={city.map((ct) => ({
                  label: ct.Name,
                  value: ct.Code,
                }))}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.label.toLowerCase().includes(input.toLowerCase())
                }
                size="large"
              />
            )}
          </Space>
          <div>
            <span className={cx("label-city")}>Quận/huyện</span>
            {district.length > 0 && (
              <Select
                value={districtCode}
                style={{ width: 200 }}
                onChange={(value) => setDistrictCode(value)}
                options={district.map((dt) => ({
                  label: dt.Name,
                  value: dt.Code,
                }))}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.label.toLowerCase().includes(input.toLowerCase())
                }
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
            }}
          >
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
              style={{ marginRight: "15px" }}
            >
              Thoát
            </Button>,
            <Button type="primary" onClick={handleDelete}>
              Xóa
            </Button>,
          ]}
        >
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
              style={{ marginRight: "15px" }}
            >
              Thoát
            </Button>,
            <Button type="primary" onClick={handleEdit}>
              Cập nhật
            </Button>,
          ]}
        >
          <Form
            form={form}
            size="large"
            // initialValues={currentWard}
            style={{ marginTop: "30px" }}
            onValuesChange={(value) =>
              setCurrentWard({ ...currentWard, ...value })
            }
            labelCol={{ span: "6" }}
            wrapperCol={{ span: "17" }}
          >
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
            <Button type="primary" onClick={handleCreate}>
              Lưu
            </Button>,
          ]}
        >
          <Form
            form={form}
            size="large"
            // initialValues={currentWard}
            style={{ marginTop: "30px" }}
            onValuesChange={(value) =>
              setCurrentWard({ ...currentWard, ...value })
            }
            labelCol={{ span: "6" }}
            wrapperCol={{ span: "17" }}
          >
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
