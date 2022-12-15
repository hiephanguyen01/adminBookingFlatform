import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./createBank.module.scss";
import { Button, Form, Input, Switch, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { bannerService } from "../../../../../services/Banner";
import toastMessage from "../../../../../Components/ToastMessage";
import { bankService } from "../../../../../services/BankService";

const cx = classNames.bind(styles);

const CreateBank = () => {
  const [form] = Form.useForm();
  const [bank, setBank] = useState({});
  const handleOnChangeForm = (value) => {
    setBank({ ...bank, ...value });
  };
  const handleOnFinish = async () => {
    try {
      if (!bank.Url.includes("http")) {
        return toastMessage("Vui lòng điền đúng liên kết!", "warning");
      }
      await bankService.createBank(bank);
      toastMessage("Tạo ngân hàng thành công!", "success");
      form.resetFields();
      console.log(bank);
      // setBank({ name: "", description: "", image: null, isVisible: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cx("create-banner-container")}>
      <div className={cx("header")}>
        <h2>Tạo ngân hàng</h2>
        <Button
          type="primary"
          style={{ backgroundColor: "#1677ff" }}
          size="large"
          onClick={handleOnFinish}
        >
          <PlusOutlined />
          Thêm ngân hàng
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
    </div>
  );
};

export default CreateBank;
