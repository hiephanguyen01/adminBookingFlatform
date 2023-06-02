import { LockOutlined, CustomerServiceOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Divider, message, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { affiliateService } from "../../../services/AffiliateService";
import Session1 from "../Component/Session1/Session1";
import Session2 from "../Component/Session2/Session2";
import "./AffiliateDetail.scss";
import ModalRequired from "../Component/ModalRequired/ModalRequired";
import { openNotification } from "../../../../../affiliate-booking/components/Notification";
const AffiliateDetail = () => {
  const [user, setUser] = useState({});
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const confirm = async () => {
    try {
      setConfirmLoading(true);
      await affiliateService.activate(id);
    } catch (error) {}
    setConfirmLoading(false);
  };

  useEffect(() => {
    if (!confirmLoading) {
      (async () => {
        const { data } = await affiliateService.details(id);
        setUser(data);
      })();
    }
  }, [id, confirmLoading]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async (text) => {
    try {
      await affiliateService.sendRequest({ text }, id);
      openNotification("success", "Thành công");
    } catch (error) {
      openNotification("error", "Vui lòng thử lại sau");
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="AffiliateDetail">
      <div className="chile" style={{ padding: "20px" }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <p
              style={{ display: "inline", cursor: "pointer" }}
              onClick={() => navigate("/affiliate/manage")}>
              Tài khoản
            </p>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <p style={{ color: "#03AC84" }}>Chi tiết tài khoản</p>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Divider />
      <Session1 user={user} />
      <Divider />
      <Session2 user={user} />
      <Divider />
      <div className="center">
        <Popconfirm
          placement="top"
          title={
            user?.isActivate
              ? "Việc khóa tài khoản sẽ khiến tài khoản ngừng hoạt động tạm thời."
              : "Mở khoá tài khoản"
          }
          okButtonProps={{ loading: confirmLoading }}
          onConfirm={confirm}
          okText="Đồng ý"
          cancelText="Huỷ">
          <Button
            block
            type="primary"
            icon={<LockOutlined />}
            size="large"
            style={{
              marginRight: "20px",
              width: "300px",
              background: user?.isActivate ? "" : "black",
            }}>
            {user?.isActivate ? "Khoá tài khoản" : "Mở khoá tài khoản"}
          </Button>
        </Popconfirm>
        <Button
          block
          onClick={showModal}
          icon={<CustomerServiceOutlined />}
          size="large"
          style={{
            marginRight: "20px",
            width: "300px",
          }}>
          Customer Service
        </Button>
      </div>
      <ModalRequired
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default AffiliateDetail;
