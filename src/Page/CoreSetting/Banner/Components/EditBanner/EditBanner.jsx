import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./editBanner.module.scss";
import {
  Breadcrumb,
  Button,
  Form,
  Image,
  Input,
  Modal,
  Space,
  Switch,
  Upload,
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { bannerService } from "../../../../../services/Banner";
import toastMessage from "../../../../../Components/ToastMessage";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { convertImage } from "../../../../../../utils/convert";

const cx = classNames.bind(styles);

const EditBanner = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [banner, setBanner] = useState({});
  const [images, setImages] = useState({});

  useEffect(() => {
    const getBannerDetail = async () => {
      try {
        const res = await bannerService.getDetailById(location.state.bannerId);
        setBanner(res.data.data);
        setImages({
          Image1: res.data.data?.Image1,
          Image2: res.data.data?.Image2,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getBannerDetail();
  }, [location.state.bannerId]);
  const handleOnChangeForm = (value) => {
    setBanner({ ...banner, ...value });
  };
  const handleOnFinish = async () => {
    try {
      if (!banner.Description.includes("http")) {
        return toastMessage("Vui lòng điền đúng liên kết!", "warning");
      }
      const newBanner = { ...banner };
      const formData = new FormData();
      formData.append("Name", newBanner.Name);
      formData.append("Description", newBanner.Description);
      formData.append(
        "Image",
        typeof newBanner.Image1 === "string"
          ? newBanner?.Image1
          : newBanner?.Image1?.file?.originFileObj || ""
      );
      formData.append(
        "Image",
        typeof newBanner.Image2 === "string"
          ? newBanner?.Image2
          : newBanner?.Image2?.file?.originFileObj || ""
      );
      formData.append("IsVisible", newBanner.IsVisible);
      await bannerService.updateBanner(location.state.bannerId, formData);
      toastMessage("Cập nhật banner thành công!", "success");
      // setBanner({ name: "", description: "", image: null, isVisible: true });
    } catch (error) {
      toastMessage("Cập nhật banner thất bại!", "error");
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleDeleteBanner = async () => {
    try {
      const res = await bannerService.deleteBanner(location.state.bannerId);
      if (res.data.success) {
        navigate(`/setting/banner`);
      }
    } catch (error) {}
  };
  const handleCancel = () => {
    setIsModalOpen(false);
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
        <Breadcrumb.Item>Chỉnh sửa</Breadcrumb.Item>
      </Breadcrumb>
      <div className={cx("header")}>
        <h2>Sửa banner</h2>
        <div>
          <Button
            // type="primary"
            // style={{ backgroundColor: "#1677ff" }}
            size="large"
            onClick={showModal}
          >
            <DeleteOutlined />
            Xóa
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: "#1677ff", marginLeft: "20px" }}
            size="large"
            onClick={handleOnFinish}
          >
            <PlusOutlined />
            Lưu thay đổi
          </Button>
        </div>
      </div>
      {Object.keys(banner).length > 0 && (
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          // form={form}
          initialValues={banner}
          // value={form}
          size={"large"}
          onValuesChange={handleOnChangeForm}
        >
          <Form.Item label="Tên" name={"Name"}>
            <Input placeholder="Nhập tên banner" />
          </Form.Item>
          <Form.Item label="Liên kết" name={"Description"}>
            <Input placeholder="https://bookingstudio.vn" />
          </Form.Item>
          {/* <div className={cx("update-image")}> */}
          <Form.Item label="Hình ảnh 1" name={"Image1"}>
            <Upload
              defaultFileList={[
                typeof banner?.Image1 === "string"
                  ? {
                      url: convertImage(banner?.Image1),
                    }
                  : {},
              ]}
              listType="picture-card"
              directory={false}
            >
              {typeof banner?.Image1 === "string" ||
              banner?.Image1?.fileList?.length >= 1 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Form.Item label="Hình ảnh 2" name={"Image2"}>
            <Upload
              defaultFileList={[
                typeof banner?.Image2 === "string"
                  ? {
                      url: convertImage(banner?.Image2),
                    }
                  : {},
              ]}
              listType="picture-card"
              directory={false}
            >
              {typeof banner?.Image2 === "string" ||
              banner?.Image2?.fileList?.length >= 1 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          {/* {typeof banner.Image === "string" && (
            <img width={120} src={convertImage(banner?.Image)} />
          )} */}
          {/* </div> */}
          <Form.Item label="Hiển thị" name={"IsVisible"}>
            <Switch defaultChecked={banner.IsVisible}></Switch>
          </Form.Item>
        </Form>
      )}
      <Modal
        title="Xác nhận"
        open={isModalOpen}
        onOk={handleDeleteBanner}
        onCancel={handleCancel}
      >
        Bạn có muốn xóa banner này không?
      </Modal>
    </div>
  );
};

export default EditBanner;
