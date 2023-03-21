import { Button, Col, Modal, Popover, Row, Tag } from "antd";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom/dist";
import { logOut } from "../../store/action/authAction";
import "./Header.scss";
import logo from "../../assets/logo.svg";
import {
  AliwangwangOutlined,
  BellOutlined,
  NotificationFilled,
} from "@ant-design/icons";
import { notificationService } from "../../services/notificationService";
import {
  openNotification,
  openNotificationText,
} from "../../../utils/Notification";
import NotiCard from "../NotiCard";
const Header = () => {
  const location = useLocation();
  const [time, setTime] = useState();
  const [notiList, setNotiList] = useState([]);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const socket = useSelector((state) => state.userReducer.socket);
  const navigate = useNavigate();
  const renewtList = useCallback((data) => {
    setNotiList((list) => {
      return [data, ...list];
    });
  }, []);
  useEffect(() => {
    const timee = setTimeout(() => {
      setTime(moment().format("Do MMMM YYYY, h:mm:ss a"));
    }, 1 * 1000);

    return () => {
      clearTimeout(timee);
    };
  }, [time]);

  const handleLogOut = () => {
    dispatch(logOut(navigate, location.pathname));
  };

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
      try {
        const { data } = await notificationService.getAll();
        setNotiList(data);
      } catch (error) {
        openNotification("error", "Thử lại sau");
      }
    })();
  }, []);
  useEffect(() => {
    socket?.on("recieveNotification", (data) => {
      renewtList(data);
      openNotificationText(data.event, data.title, navigate, "/manage-order");
    });
    return () => {
      socket?.off("recieveNotification");
    };
  }, [socket, renewtList]);

  return (
    <div className="Header">
      <Modal
        className="modal-noti"
        title="Thông báo"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}>
        <Row gutter={[10, 10]}>
          {notiList.length &&
            notiList.map((val) => (
              <Col md={24} sm={24} xs={24} key={val.id}>
                <NotiCard value={val} />
              </Col>
            ))}
        </Row>
      </Modal>
      <Row style={{ width: "100%" }}>
        <Col md={4} sm={4} xs={4} style={{ textAlign: "start" }}>
          <Link to={"/dashboard/account"}>
            <img src={logo} alt="logo" style={{ paddingLeft: "20px" }} />
          </Link>
        </Col>
        <Col
          md={16}
          sm={16}
          xs={16}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <p>{time}</p>
        </Col>
        <Col
          md={4}
          sm={4}
          xs={4}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}>
          <Button
            shape="circle"
            size="large"
            style={{ marginRight: "20px" }}
            onClick={showModal}>
            <BellOutlined />
          </Button>
          <Popover
            placement="bottomRight"
            title={"Account"}
            content={
              <Button style={{ width: "100%" }} onClick={handleLogOut}>
                Log out
              </Button>
            }
            trigger="click">
            <div style={{ cursor: "pointer", marginRight: "20px" }}>
              <Tag
                style={{ fontSize: "18px", padding: "10px" }}
                icon={<AliwangwangOutlined />}
                color="magenta">
                {currentUser?.user
                  ? currentUser?.user?.name
                  : currentUser?.name}
              </Tag>
            </div>
          </Popover>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
