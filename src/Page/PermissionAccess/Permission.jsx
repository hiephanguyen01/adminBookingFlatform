import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { openNotification } from "../../../utils/Notification";
import { adminService } from "../../services/AdminService";
import "./Permission.scss";
const Permission = () => {
  const [adminList, setAdminList] = useState();
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  const columns = [
    {
      title: "Số thứ tự",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      render: (item) => {
        return (
          <Space size="middle">
            <Button
              icon={<EyeOutlined />}
              onClick={() => navigate(`/permission/${item.id}`)}
            />
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              onClick={() => deleteAdmin(item.id)}
            />
          </Space>
        );
      },
    },
  ];
  const deleteAdmin = async (id) => {
    try {
      await adminService.deleteAdmin(id);
      openNotification("success", "Xóa thành công!");
      const { data } = await adminService.getAllAdmin(filter);
      setAdminList(data.users);
    } catch (error) {
      openNotification("error", "Thất bại!");
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const { data } = await adminService.getAllAdmin(filter);
        setAdminList(data.users);
      } catch (error) {
        openNotification("error", "Lấy danh sách thất bại!");
      }
    })();
  }, [filter]);

  return (
    <div className="Permission">
      <div className="header chile" style={{ padding: "20px" }}>
        <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
          <Form.Item label="Tìm theo tên hoặc số điện thoại" name="keySearch">
            <Input size="large" onChange={(e) => setFilter(e.target.value)} />
          </Form.Item>
        </Form>
        <Button
          size="large"
          type="primary"
          onClick={() => navigate("/permission/create")}
        >
          Tạo Admin
        </Button>
      </div>
      <Divider />
      <div className="main chile">
        <Table columns={columns} dataSource={adminList} />
      </div>
    </div>
  );
};

export default Permission;
