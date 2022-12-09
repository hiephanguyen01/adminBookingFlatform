import { Col, Row } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import "./Header.scss";
import logo from "../../assets/logo.svg";

const Header = () => {
  const [time, setTime] = useState();
  useEffect(() => {
    const timee = setTimeout(() => {
      setTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
    }, 1 * 1000);

    return () => {
      clearTimeout(timee);
    };
  }, [time]);

  return (
    <div className="Header">
      <Row style={{ width: "100%" }}>
        <Col md={8} style={{ textAlign: "start" }}>
          <img src={logo} alt="logo" style={{ paddingLeft: "20px" }} />
        </Col>
        <Col
          md={8}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <p>{time}</p>
        </Col>
        <Col
          md={8}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}>
          <div style={{ paddingRight: "20px" }}>Tài khoản</div>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
