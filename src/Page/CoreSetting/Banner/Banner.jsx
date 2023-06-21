import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames/bind";

import styles from "./banner.module.scss";
import {
  Breadcrumb,
  Button,
  Modal,
  Pagination,
  Space,
  Switch,
  Table,
  Tag,
} from "antd";
import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  PlusOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { convertImage } from "../../../../utils/convert";
import { bannerService } from "../../../services/Banner";
import toastMessage from "../../../Components/ToastMessage";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const Banner = () => {
  const limit = 4;
  const [banners, setBanners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentBanner, setCurrentBanner] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getAllBanners = useCallback(async () => {
    const res = await bannerService.getAllBanner();
    setBanners(res.data.data);
  }, []);

  useEffect(() => {
    getAllBanners();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    handleDeleteBanner();
    setIsModalOpen(false);
  };

  const handleOnChecked = async (e, value) => {
    try {
      const formData = new FormData();
      formData.append("IsVisible", e);
      let res;
      if (e) {
        res = await bannerService.updateBanner(value.id, formData);
      } else {
        res = await bannerService.updateBanner(value.id, formData);
      }
      const newBanners = banners.map((item) => {
        if (item.id === res.data.data.id) {
          return res.data.data;
        }
        return item;
      });
      setBanners(newBanners);
      toastMessage("Cập nhật banner thành công!", "success");
    } catch (error) {}
  };

  const handleChangePriority = async (value, increase) => {
    try {
      await bannerService.updateBanner(
        value.id,
        {},
        `?increase=${increase ? 1 : 0}`
      );
      getAllBanners();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteBanner = async () => {
    try {
      const res = await bannerService.deleteBanner(currentBanner.id);
      if (res.data.success) {
        const res = await bannerService.getAllBanner();
        setBanners(res.data.data);
        // const newBanners = [...banners];
        // setBanners(newBanners.filter((item) => item !== banner.id));
      }
    } catch (error) {}
  };

  const columns = [
    {
      title: "Hình",
      dataIndex: "Image",
      key: "Image",
      render: (images) => (
        <img style={{ width: "100px" }} src={convertImage(images[0])} />
      ),
      width: 200,
    },
    {
      title: "Tên",
      dataIndex: "Name",
      key: "Name",
      width: 200,
    },
    {
      title: "Liên kết",
      dataIndex: "Description",
      key: "Description",
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: "Hiển thị",
      key: "tags",
      render: (value) => (
        <>
          <Switch
            checked={value?.IsVisible}
            onChange={(e) => handleOnChecked(e, value)}
          />
        </>
      ),
      width: 150,
    },
    {
      title: "Action",
      key: "action",
      render: (value) => (
        <Space size="middle">
          <Button
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => {
              showModal();
              setCurrentBanner(value);
            }}
          />
          <Link to={"edit"} state={{ bannerId: value.id }}>
            <Button
              type="primary"
              shape="circle"
              style={{ backgroundColor: "#1677ff" }}
              icon={<EditOutlined />}
            />
          </Link>
        </Space>
      ),
      width: 200,
    },
    {
      title: "Thứ tự hiển thị",
      key: "action",
      render: (value) => (
        <Space size="middle" direction="vertical" style={{ gap: "5px" }}>
          <Button
            disabled={value?.Priority === 1}
            onClick={() => handleChangePriority(value, true)}
            icon={<UpOutlined />}
          />
          <Button
            disabled={value?.Priority === banners[banners.length - 1].Priority}
            onClick={() => handleChangePriority(value, false)}
            icon={<DownOutlined />}
          />
        </Space>
      ),
      width: 150,
    },
  ];

  return (
    <div className={cx("banner-container")}>
      <div className={cx("banner-header")}>
        <h2>Quản lý banner</h2>
        <Link to={"create"}>
          <Button
            type="primary"
            style={{ backgroundColor: "#1677ff" }}
            size="large"
          >
            <PlusOutlined />
            Tạo banner
          </Button>
        </Link>
      </div>
      <Table
        columns={columns}
        dataSource={banners.slice(
          (currentPage - 1) * limit,
          currentPage * limit
        )}
        size="middle"
        pagination={false}
      />

      <Pagination
        defaultCurrent={currentPage}
        current={currentPage}
        total={Math.ceil(banners.length / limit) * 10}
        style={{ textAlign: "end", marginTop: "15px" }}
        onChange={(page) => setCurrentPage(page)}
        showSizeChanger={false}
      />
      <Modal
        title="Xác nhận"
        open={isModalOpen}
        onOk={() => handleOk()}
        onCancel={handleCancel}
        footer={[
          <Button type="primary" onClick={handleOk}>
            Đồng ý
          </Button>,
        ]}
      >
        Bạn có muốn xóa banner "{currentBanner.Name}" này không?
      </Modal>
    </div>
  );
};

export default Banner;
