import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { mailService } from "../../../../../services/MailService";
import { openNotification } from "../../../../../../utils/Notification";

const EmailFormModal = ({ isModalOpen, handleCancel, data = null }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const services = [
    {
      service: "Gmail",
      host: "smtp.gmail.com",
    },
    {
      service: "Sendgrid",
      host: "smtp.sendgrid.net",
    },
  ];

  const onFinish = async (values) => {
    setLoading(true);
    try {
      values = {
        ...values,
        ...services.find((val) => val.service === values.service),
      };
      console.log("🚀 ~ onFinish ~ values:", values);

      if (!isEdit) {
        await mailService.create(values);
      } else {
        await mailService.edit(data.id, values);
      }
      openNotification("success", "Thành công");
      form.resetFields();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    handleCancel();
  };

  useEffect(() => {
    if (data) {
      setIsEdit(true);
      form.setFieldsValue(data);
      console.log("🚀 ~ useEffect ~ data:", data);
    } else {
      setIsEdit(false);
    }
  }, [data]);

  return (
    <div>
      <Modal
        title={isEdit ? "Sửa" : "Tạo"}
        open={isModalOpen}
        onCancel={() => {
          handleCancel();
          form.resetFields();
        }}
        footer={[]}>
        <Form
          form={form}
          disabled={loading}
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
          autoComplete="off">
          <Form.Item
            label="Email (user)"
            name="user"
            rules={[{ required: true, type: "email" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Password (api key)"
            name="pass"
            rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Service"
            name="service"
            rules={[{ required: true }]}>
            <Select
              style={{ width: "100%" }}
              options={[
                { value: "Gmail", label: "Gmail" },
                { value: "Sendgrid", label: "Sendgrid" },
              ]}
            />
          </Form.Item>
          {/* <Form.Item label="Host" name="host" rules={[{ required: true }]}>
            <Input />
          </Form.Item> */}
          <Form.Item label="Port" name="port" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
            <Button type="primary" htmlType="submit" size="large">
              {isEdit ? "Sửa" : "Tạo"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EmailFormModal;
