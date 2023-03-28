import { Breadcrumb, Button, Col, Form, Image, Input, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { registerPartnerService } from "../../../services/RegisterPartnerService";
import "./detail.scss";
import moment from "moment";
import { baseURL, fallBackImg } from "../../../../utils/baseURL";
import { LockOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { openNotification } from "../../../../utils/Notification";
import { Loading } from "../../../Components/Loading";
export const EditCustomer = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [data, setData] = useState();
  const [text, setText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    (async () => {
      await getCustomerDetailById(id);
      setLoading(false);
    })();
  }, []);

  const getCustomerDetailById = async (id) => {
    try {
      const { data } = await registerPartnerService.getCustomerById(id);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLockAccount = async (value) => {
    setLoadingBtn(true);
    try {
      if (value) {
        await registerPartnerService.updateCustomer(id, {
          IsDeleted: true,
          Note: text,
        });
        openNotification("success", "Tài Khoản đã được khoá!");
        setText("");
        setIsModalOpen(false);
        getCustomerDetailById(id);
        setLoadingBtn(false);
      } else {
        await registerPartnerService.updateCustomer(id, { IsDeleted: false });
        openNotification("success", "Tài Khoản đã được mở khoá!");
        getCustomerDetailById(id);
        setLoadingBtn(false);
      }
    } catch (error) {
      setLoadingBtn(false);
      console.log(error);
    }
  };
  if (loading) return <Loading />;
  return (
    <div className="CustomerDetail">
      <Breadcrumb style={{ marginBottom: "10px" }}>
        <Breadcrumb.Item>
          <Link to="/manage/customer">Quản lý tài khoản khách hàng</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Chỉnh sửa tài khoản</Breadcrumb.Item>
      </Breadcrumb>
      <Form layout="vertical" autoComplete="off">
        <Row gutter={64}>
          <Col span={12}>
            <Form.Item label="Số định danh">
              <Input
                disabled
                type={"text"}
                defaultValue={data?.IdentifierCode}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Tên tài khoản">
              <Input disabled type={"text"} defaultValue={data?.Email} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Số điện thoại">
              <Input disabled type={"text"} defaultValue={data?.Phone} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Tài khoản Google">
              <Input disabled type={"text"} defaultValue={data?.GoogleEmail} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Tài khoản Facebook">
              <Input disabled type={"text"} value={data?.FacebookEmail} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Row gutter={12}>
              <Col span={6}>
                <Form.Item
                  label="Ngày tạo
">
                  <Input
                    disabled
                    value={moment(data?.CreationTime).format(
                      "DD/MM/YYYY HH:mm"
                    )}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Cập nhật gần nhất

">
                  <Input
                    disabled
                    value={moment(data?.LastModificationTime).format(
                      "DD/MM/YYYY HH:mm"
                    )}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Số đơn đặt
">
                  <Input disabled value={data?.NumberOfOrder} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Trạng thái
">
                  <Input
                    disabled
                    value={data.IsDeleted ? "Tài khoản đã khoá" : "Active"}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Ghi chú
">
              <Input disabled value={data.Note} />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      {data.IsDeleted ? (
        <div
          style={{
            padding: "1rem 2rem",
            background: "#ffeded",
            display: "flex",
            justifyContent: "space-between",
          }}>
          <div>
            <LockOutlined style={{ color: "#e22828" }} />
            <span style={{ color: "#e22828" }}>Tài khoản đang bị khóa</span>
          </div>
          <Button
            loading={loadingBtn}
            onClick={() => handleLockAccount(false)}
            danger>
            MỞ KHÓA TÀI KHOẢN
          </Button>
        </div>
      ) : (
        <div style={{ textAlign: "right" }}>
          <Button
            style={{ marginLeft: "auto" }}
            onClick={() => showModal()}
            danger>
            KHÓA TÀI KHOẢN
          </Button>
        </div>
      )}
      <Modal
        className="modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        footer={null}
        maskClosable={false}>
        <>
          <div className="title">
            <QuestionCircleOutlined />
            <span>Bạn có chắc rằng muốn khóa tài khoản người dùng này?</span>
          </div>
          <TextArea
            style={{ margin: "1rem 0" }}
            rows={4}
            onChange={(e) => setText(e.target.value)}
            placeholder="Lý do khoá tài khoản ?"
            value={text}
          />

          <div
            className="buttons"
            style={{ display: "flex", justifyContent: "right", gap: ".5rem" }}>
            <Button
              htmlType="submit"
              size="large"
              color="green"
              onClick={handleCancel}
              //   style={{ background: "rgb(3, 172, 132)", color: "#fff" }}
            >
              Huỷ
            </Button>
            <Button
              onClick={() => handleLockAccount(true)}
              size="large"
              type="primary"
              loading={loadingBtn}>
              Khoá tài khoản
            </Button>
          </div>
        </>
      </Modal>
    </div>
  );
};
