import React from "react";
import { Button } from "antd";

const CustomModalFooter = ({ disable }) => {
  return (
    <footer
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginTop: "20px",
      }}
    >
      <Button size="large">Thêm Ảnh/Video</Button>
      <Button
        disabled={disable}
        size="large"
        style={{ marginTop: "25px", marginInlineStart: "0" }}
        type="primary"
      >
        Đăng
      </Button>
    </footer>
  );
};

export default CustomModalFooter;
