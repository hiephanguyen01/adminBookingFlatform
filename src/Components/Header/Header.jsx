import { Button, Col, Popover, Row } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom/dist";
import { logOut } from "../../store/action/authAction";
import "./Header.scss";
import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [time, setTime] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const timee = setTimeout(() => {
      setTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
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

        <Col
          onClick={() => navigate("/")}
          md={8}
          style={{ textAlign: "start" }}
        >

          <img src={logo} alt="logo" style={{ paddingLeft: "20px" }} />
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
          }}>
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
              Account
            </div>
          </Popover>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
