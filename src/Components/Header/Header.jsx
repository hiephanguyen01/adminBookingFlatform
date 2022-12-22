import { Button, Col, Popover, Row, Tag } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom/dist";
import { logOut } from "../../store/action/authAction";
import "./Header.scss";
import logo from "../../assets/logo.svg";
import { AliwangwangOutlined } from "@ant-design/icons";
const Header = () => {
  const [time, setTime] = useState();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const navigate = useNavigate();
  useEffect(() => {
    const timee = setTimeout(() => {
      setTime(moment().format("Do MMMM YYYY, h:mm:ss a"));
    }, 1 * 1000);

    return () => {
      clearTimeout(timee);
    };
  }, [time]);

  const handleLogOut = () => {
    dispatch(logOut(navigate));
  };
  return (
    <div className="Header">
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
                color="magenta">
                {currentUser?.user.name}
              </Tag>
            </div>
          </Popover>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
