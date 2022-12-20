import React from "react";
import classNames from "classnames/bind";
import styles from "./setting.module.scss";
import { Button, Form, Input } from "antd";

const cx = classNames.bind(styles);

const Setting = () => {
  const [form] = Form.useForm();
  return (
    <div className={cx("setting-notification-container")}>
      <div className={cx("wrapper")}>
        <Form
          layout={"vertical"}
          wrapperCol={{ span: 24 }}
          form={form}
          size="middle"
          // onValuesChange={onFormLayoutChange}
        >
          <Form.Item label="GoogleApiFcm" rules={[{ required: true }]}>
            <Input placeholder="" />
          </Form.Item>
          <Form.Item label="AuthKey" rules={[{ required: true }]}>
            <Input placeholder="" />
          </Form.Item>
          <Form.Item label="P12Password" rules={[{ required: true }]}>
            <Input placeholder="" />
          </Form.Item>
          <Form.Item label="P12Bundled" rules={[{ required: true }]}>
            <Input placeholder="" />
          </Form.Item>
          <Form.Item label="P12Certificate" rules={[{ required: true }]}>
            <Input placeholder="" />
          </Form.Item>
          <Form.Item>
            <Button type="primary">Submit</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Setting;
