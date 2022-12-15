import { LoadingOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Form, Input } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { openNotification } from "../../../../utils/Notification";
import { adminService } from "../../../services/AdminService";
const CreateAccount = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const generatePassword = () => {
    var chars =
      "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var passwordLength = 9;
    let password = "am-";
    for (var i = 0; i <= passwordLength; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    form.setFieldsValue({
      password,
    });
  };
  const generateUsername = () => {
    var chars = "0123456789abcdefghijklmnopqrstuvwxyz";
    var usernameLength = 8;
    let username = "acc-";
    for (var i = 0; i <= usernameLength; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      username += chars.substring(randomNumber, randomNumber + 1);
    }
    form.setFieldsValue({
      username,
    });
  };

  const copyToClipboard = () => {
    var copyText = `username:${form.getFieldValue(
      "username"
    )} || password:${form.getFieldValue("password")}`;
    navigator.clipboard.writeText(copyText);
    openNotification("success", "account copied");
  };
  const onFinish = async (values) => {
    try {
      setLoading(true);
      await adminService.createAdmin(values);
      openNotification("success", "Create succeed");
    } catch (error) {
      openNotification("error", "Create failed, please check again");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        backgroundColor: "rgb(246, 246, 246)",
        minHeight: "calc(100vh - 200px)",
        display: "flex",
        alignItems: "center",
      }}>
      <div style={{ width: "min(100vw - 1rem, 500px)", marginInline: "auto" }}>
        <div className="chile" style={{ padding: "20px" }}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/permission">Quản lý quyền</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Tạo tài khoản admin</Breadcrumb.Item>
          </Breadcrumb>
          <h1 style={{ width: "fit-content", margin: "10px auto" }}>
            Tạo tài khoản admin
          </h1>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off">
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input account's name!",
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone number"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input phone number!",
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}>
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                style={{ width: "100%" }}
                type="dashed"
                onClick={generateUsername}>
                Generate username
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                style={{ width: "100%" }}
                type="dashed"
                onClick={generatePassword}>
                Generate password
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                style={{ width: "100%" }}
                type="default"
                onClick={copyToClipboard}>
                Copy account
              </Button>
            </Form.Item>

            <Form.Item>
              <Button
                disabled={loading}
                style={{ width: "100%" }}
                type="primary"
                htmlType="submit">
                {loading && <LoadingOutlined />}
                &nbsp; Create
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
