import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./editBank.module.scss";
import { Button, Form, Image, Input, Modal, Space, Switch, Upload } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { bannerService } from "../../../../../services/Banner";
import toastMessage from "../../../../../Components/ToastMessage";
import { useLocation, useNavigate } from "react-router-dom";
import { convertImage } from "../../../../../../utils/convert";
import { bankService } from "../../../../../services/BankService";

const cx = classNames.bind(styles);

const EditBank = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bank, setBank] = useState({});

  useEffect(() => {
    const getBankDetail = async () => {
      try {
        const res = await bankService.getDetailById(location.state.bankId);
        setBank(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBankDetail();
  }, [location.state.bannerId]);
  const handleOnChangeForm = (value) => {
    setBank({ ...bank, ...value });
  };
  const handleOnFinish = async () => {
    try {
      if (!bank.Url.includes("http")) {
        return toastMessage("Vui lòng điền đúng liên kết!", "warning");
      }
      await bankService.updateBank(location?.state?.bankId, bank);
      toastMessage("Cập nhật ngân hàng thành công!", "success");
    } catch (error) {
      toastMessage("Cập nhật ngân hàng thất bại!", "error");
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleDeleteBank = async () => {
    try {
      const res = await bankService.deleteBank(location.state.bankId);
      if (res.data.success) {
        navigate(`/setting/banks`);
      }
    } catch (error) {}
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={cx("create-banner-container")}>
      <div className={cx("header")}>
        <h2>Sửa ngân hàng</h2>
        <div>
          <Button
            // type="primary"
            // style={{ backgroundColor: "#1677ff" }}
            size="large"
            onClick={showModal}
          >
            <DeleteOutlined />
            Xóa
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: "#1677ff", marginLeft: "20px" }}
            size="large"
            onClick={handleOnFinish}
          >
            <PlusOutlined />
            Lưu thay đổi
          </Button>
        </div>
      </div>
      {Object.keys(bank).length > 0 && (
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          // form={form}
          initialValues={bank}
          // value={form}
          size={"large"}
          onValuesChange={handleOnChangeForm}
        >
          <Form.Item label="VN name" name={"VNName"}>
            <Input placeholder="name" />
          </Form.Item>
          <Form.Item label="ENG name" name={"EngName"}>
            <Input placeholder="name" />
          </Form.Item>
          <Form.Item label="Business name" name={"BusinessName"}>
            <Input placeholder="Business name" />
          </Form.Item>
          <Form.Item label="Url" name={"Url"}>
            <Input placeholder="Url" />
          </Form.Item>
          <Form.Item label="Address" name={"Address"}>
            <Input placeholder="Address" />
          </Form.Item>
        </Form>
      )}
      <Modal
        title="Xác nhận"
        open={isModalOpen}
        onOk={handleDeleteBank}
        onCancel={handleCancel}
        footer={[
          <Button
            type="default"
            onClick={() => setIsModalOpen(false)}
            style={{ marginRight: "15px" }}
          >
            Thoát
          </Button>,
          <Button type="primary" onClick={handleDeleteBank}>
            Đồng Ý
          </Button>,
        ]}
      >
        Bạn có muốn xóa banner này không?
      </Modal>
    </div>
  );
};

export default EditBank;
