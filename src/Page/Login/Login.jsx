import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/action/authAction";
const Login = ({ type = "" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const onFinish = (values) => {
    dispatch(login(values));
  };
  useEffect(() => {
    if (currentUser) {
      type === "affiliate" && navigate("/affiliate");
      type === "" && navigate("/dashboard");
    }
  }, [currentUser]);

  return (
    <div
      style={{
        backgroundColor: "rgb(246, 246, 246)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}>
      <div style={{ width: "min(100vw - 1rem, 400px)", marginInline: "auto" }}>
        <div className="chile" style={{ padding: "20px" }}>
          <h1 style={{ width: "fit-content", margin: "10px auto" }}>Login</h1>
          <Form
            name="basic"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off">
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
                type="primary"
                htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
