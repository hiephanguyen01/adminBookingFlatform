import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import React, { useState } from "react";

const TrendNews = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "image",
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
    },
    {
      title: "Ngày đăng",
      dataIndex: "createdAt",
    },
    {
      title: "Thao tác",
      dataIndex: "action",
    },
  ];
  return (
    <div className="chile" style={{ padding: "20px" }}>
      <div
        style={{
          margin: "4px 0 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Xu hướng, tin tức</h2>
        <div style={{ display: "flex", gap: "20px" }}>
          <Button icon={<DeleteOutlined />}>Xoá</Button>
          <Button type="primary" icon={<PlusOutlined />}>
            Tạo mới
          </Button>
        </div>
      </div>

      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
};

export default TrendNews;
