import React from "react";
import { Button, Upload } from "antd";
const CustomModalFooter = ({
  disable,
  files,
  setFiles,
  onPreview,
  handleOk,
}) => {
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  const props = {
    name: "file",
    customRequest: dummyRequest,
    onChange(info) {
      setFiles(info.fileList);
    },
    fileList: files,
    onPreview,
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#03ac84",
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  return (
    <footer
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginTop: "20px",
      }}
    >
      <Upload {...props}>
        <Button size="large">Thêm Ảnh/Video</Button>
      </Upload>
      <Button
        disabled={disable}
        onClick={handleOk}
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
