import { AliwangwangOutlined, BellOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Popover, Row, Tag, Tabs } from "antd";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist";
import {
  openNotification,
  openNotificationText,
} from "../../../utils/Notification";
import logo from "../../assets/logo.svg";
import { notificationService } from "../../services/notificationService";
import { logOut } from "../../store/action/authAction";
import NotiCard from "../NotiCard";
import "./Header.scss";
import LogoHeaderIcon from "../../assets/logo";
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
    if (!isModalOpen) {
      (async () => {
        try {
          let res = [];
          if (
            location.pathname.includes("affiliate") &&
            currentUser.user.affiliate >= 2
          ) {
            res = await notificationService.getAll("aff");
          } else if (
            !location.pathname.includes("affiliate") &&
            currentUser.user.booking >= 2
          ) {
            res = await notificationService.getAll("adm");
          }
          setNotiList(res.data);
        } catch (error) {
          openNotification("error", "Thử lại sau");
        }
      })();
    }
  }, [isModalOpen, location]);
  useEffect(() => {
    if (
      !location.pathname.includes("affiliate") &&
      currentUser.user.booking >= 2
    ) {
      socket?.on("recieveNotification", (data) => {
        renewtList(data);
        openNotificationText(data.title, data.content);
      });
    } else if (
      location.pathname.includes("affiliate") &&
      currentUser.user.affiliate >= 2
    ) {
      socket?.on("recieveUser", (data) => {
        renewtList(data);
        openNotificationText(data.title, data.content);
      });
    }
    return () => {
      socket?.off("recieveNotification");
      socket?.off("recieveUser");
    };
  }, [socket, renewtList, currentUser, location]);

  return (
    <div className="Header">
      <Modal
        className="modal-noti"
        title="Thông báo"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Tabs
          defaultActiveKey={1}
          type="card"
          size="large"
          items={[
            {
              label: `Chưa đọc`,
              key: 1,
              children: (
                <Row gutter={[10, 10]}>
                  {notiList
                    ? notiList
                        ?.filter((no) => !no.isReaded)
                        .map((val) => (
                          <Col md={24} sm={24} xs={24} key={val.id}>
                            <NotiCard
                              value={val}
                              setIsModalOpen={setIsModalOpen}
                            />
                          </Col>
                        ))
                    : ""}
                </Row>
              ),
            },
            {
              label: "Đã đọc",
              key: 2,
              children: (
                <Row gutter={[10, 10]}>
                  {notiList
                    ? notiList
                        ?.filter((no) => no.isReaded)
                        .map((val) => (
                          <Col md={24} sm={24} xs={24} key={val.id}>
                            <NotiCard
                              value={val}
                              setIsModalOpen={setIsModalOpen}
                            />
                          </Col>
                        ))
                    : ""}
                </Row>
              ),
            },
          ]}
        />
      </Modal>
      <Row style={{ width: "100%" }}>
        <Col md={4} sm={4} xs={4} style={{ textAlign: "start" }}>
          <Link to={"/dashboard/account"}>
            {/* <img src={logo} alt="logo" style={{ paddingLeft: "20px" }} /> */}
            <LogoHeaderIcon style={{ paddingLeft: "20px" }} />
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
          }}
        >
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
          }}
        >
          <Button
            shape="circle"
            size="large"
            style={{ marginRight: "20px" }}
            onClick={showModal}
          >
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
            trigger="click"
          >
            <div style={{ cursor: "pointer", marginRight: "20px" }}>
              <Tag
                style={{ fontSize: "18px", padding: "10px" }}
                icon={<AliwangwangOutlined />}
                color="magenta"
              >
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
