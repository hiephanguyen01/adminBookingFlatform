import React, { useEffect } from "react";
import "./mailDetail.scss";
import { Col, Form, Input } from "antd";
import { mailBox } from "../../../services/MailBox";
import { useParams } from "react-router-dom";
import moment from "moment";

const MailDetail = () => {
  const [form] = Form.useForm();
  const { id } = useParams();

  useEffect(() => {
    const getMailDetail = async () => {
      try {
        const res = await mailBox.getMailById(id);
        if (res.data.success) {
          form.setFieldsValue({
            ...res.data.data,
            createdAt: moment(res.data.data.createdAt).format(
              "DD/MM/YYYY HH:mm:ss"
            ),
          });
        }
      } catch (error) {}
    };
    getMailDetail();

    const updateMailDetail = async () => {
      try {
        await mailBox.updateMail(id, { status: 1 });
      } catch (error) {}
    };
    updateMailDetail();
  }, []);

  return (
    <div className="mailDetail">
      <h3 className="mb-24">CHI TIẾT HỘP THƯ</h3>
      <Col span={16}>
        <Form form={form} layout="vertical" autoComplete="off" disabled>
          <Form.Item name="createdAt" label="Ngày gửi">
            <Input className="h-50px" />
          </Form.Item>{" "}
          <Form.Item name="name" label="Họ và tên">
            <Input className="h-50px" />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input className="h-50px" />
          </Form.Item>
          <Form.Item name="content" label="Vấn đề cần giúp đỡ">
            <Input.TextArea
              showCount={false}
              className="h-100px"
              style={{ resize: "none" }}
            />
          </Form.Item>
        </Form>
      </Col>
    </div>
  );
};

export default MailDetail;
