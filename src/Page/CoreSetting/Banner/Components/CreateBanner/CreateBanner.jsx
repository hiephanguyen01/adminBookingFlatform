import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./createBanner.module.scss";
import { Breadcrumb, Button, Form, Input, Switch, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { bannerService } from "../../../../../services/Banner";
import toastMessage from "../../../../../Components/ToastMessage";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const CreateBanner = () => {
  const [form] = Form.useForm();
  const [banner, setBanner] = useState({
    name: "",
    description: "",
    image: null,
    isVisible: true,
  });
  const handleOnChangeForm = (value) => {
    setBanner({ ...banner, ...value });
  };
  const handleOnFinish = async () => {
    try {
      if (!banner.description.includes("http")) {
        return toastMessage("Vui lòng điền đúng liên kết!", "warning");
      }
      const newBanner = { ...banner };
      const formData = new FormData();
      formData.append("Name", newBanner.name);
      formData.append("Description", newBanner.description);
      formData.append("Image", newBanner.image.file.originFileObj);
      formData.append("IsVisible", newBanner.isVisible);
      await bannerService.createBanner(formData);
      toastMessage("Tạo banner thành công!", "success");
      form.resetFields();
      setBanner({ name: "", description: "", image: null, isVisible: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cx("create-banner-container")}>
      <Breadcrumb
        style={{
          fontSize: "16px",
          marginBottom: "10px",
          fontWeight: "bold",
        }}
      >
        <Breadcrumb.Item>
          <Link to={"/setting/banner"} style={{ color: "#10b08a" }}>
            Quản lý banner
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Tạo mới</Breadcrumb.Item>
      </Breadcrumb>
      <div className={cx("header")}>
        <h2>Tạo banner</h2>
        <Button
          type="primary"
          style={{ backgroundColor: "#1677ff" }}
          size="large"
          onClick={handleOnFinish}
        >
          <PlusOutlined />
          Thêm banner
        </Button>
      </div>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        form={form}
        // initialValues={banner}
        size={"large"}
        onValuesChange={handleOnChangeForm}
      >
        <Form.Item label="Tên" name={"name"}>
          <Input placeholder="Nhập tên banner" />
        </Form.Item>
        <Form.Item label="Liên kết" name={"description"}>
          <Input placeholder="https://bookingstudio.vn" />
        </Form.Item>
        <Form.Item
          label="Hình ảnh"
          // valuePropName="fileList"
          name={"image"}
        >
          <Upload listType="picture-card" directory={false}>
            {banner?.image?.fileList.length >= 1 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item label="Hiển thị" name={"isVisible"}>
          <Switch defaultChecked={banner.isVisible}></Switch>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateBanner;
