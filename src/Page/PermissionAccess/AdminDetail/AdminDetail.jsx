import { LoadingOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Divider, Select, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { openNotification } from "../../../../utils/Notification";
import { adminService } from "../../../services/AdminService";
import "./AdminDetail.scss";
const AdminDetail = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dafaultDate, setDefaultData] = useState([
    {
      label: "Thông tin tài khoản đối tác",
      default: "partnerAccount",
      value: null,
    },
    {
      label: "Thông tin tài khoản khách hàng",
      default: "customerAccount",
      value: null,
    },
    {
      label: "Quản lý bài đăng",
      default: "post",
      value: null,
    },
    {
      label: "Báo cáo",
      default: "report",
      value: null,
    },
    {
      label: "Quản lý đơn đặt",
      default: "booking",
      value: null,
    },
    {
      label: "Xuất báo cáo",
      default: "export",
      value: null,
    },
    {
      label: "Dạo",
      default: "dao",
      value: null,
    },
    {
      label: "Quản lý quyền",
      default: "permission",
      value: null,
    },
    {
      label: "Thông báo",
      default: "notification",
      value: null,
    },
    {
      label: "Khuyến mãi",
      default: "promo",
      value: null,
    },
    {
      label: "Setting",
      default: "setting",
      value: null,
    },
  ]);
  const { id } = useParams();
  const columns = [
    {
      title: "Chức năng",
      dataIndex: "label",
      key: "label",
    },
    {
      title: "Quyền",
      key: "value",
      dataIndex: "value",
      render: (item, record) => (
        <>
          <Select
            defaultValue={item}
            style={{ width: 150 }}
            onChange={(value) => handleChange(value, record)}
            options={[
              {
                value: 1,
                label: "Không có quyền",
              },
              {
                value: 2,
                label: "Chỉ xem",
              },
              {
                value: 3,
                label: "Toàn quyền",
              },
            ]}
          />
        </>
      ),
    },
  ];
  const handleChange = (value, item) => {
    setUser(
      dafaultDate.reduce((acc, val) => {
        return {
          ...user,
          ...acc,
          [item.default]: value,
        };
      }, {})
    );
  };
  const saveChange = async () => {
    try {
      setLoading(true);
      await adminService.updateAdmin(user.id, user);
      openNotification("success", "update succeed");
    } catch (error) {
      openNotification("error", "update failed");
    }
    setLoading(false);
  };
  useEffect(() => {
    (async () => {
      try {
        const { data } = await adminService.getAdminById(id);
        setUser(data.user);
        const user = data.user;
        setDefaultData(
          dafaultDate.map((val) => {
            const key = val.default;
            return {
              ...val,
              value: user[key],
            };
          })
        );
      } catch (error) {
        openNotification("error", "user not found");
      }
    })();
  }, [id]);
  return (
    <div className="AdminDetail">
      <header className="chile" style={{ padding: "10px" }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/permission">Quản lý quyền</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{user?.name}</Breadcrumb.Item>
        </Breadcrumb>
        <table>
          <tr>
            <td className="title">Tên:</td>
            <td>&nbsp; {user?.name}</td>
          </tr>
          <tr>
            <td className="title">Số điện thoại:</td>
            <td>&nbsp; {user?.phone}</td>
          </tr>
        </table>
      </header>
      <Divider />
      <article className="chile">
        {dafaultDate[0].value !== null && (
          <Table
            columns={columns}
            dataSource={dafaultDate}
            pagination={false}
          />
        )}
        <Button
          disabled={loading}
          size="large"
          style={{ margin: "20px " }}
          type="primary"
          onClick={saveChange}>
          {loading && <LoadingOutlined />}
          &nbsp; Create
        </Button>
      </article>
    </div>
  );
};

export default AdminDetail;
