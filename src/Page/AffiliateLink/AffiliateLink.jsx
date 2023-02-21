import { EyeOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Space, Table } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./AffiliateLink.scss";
const { Search } = Input;

const AffiliateLink = () => {
  const navigate = useNavigate();
  const onSearch = async (value) => {
    console.log("🚀 ~ onSearch ~ value", value);
  };
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const columns = [
    {
      title: "ID dịch vụ/sản phẩm",
      dataIndex: "key",
    },
    {
      title: "Tên dịch vụ/sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Giá",
      dataIndex: "math",
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
    },
    {
      title: "% Hoa hồng",
      dataIndex: "english",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
    {
      title: "Hành động",
      dataIndex: "key",
      render: (_, record) => (
        <Space size="middle">
          <Button
            shape="circle"
            icon={<EyeOutlined />}
            onClick={() => navigate(`/affiliate/link/${_}`)}
          />
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      chinese: 98,
      math: 60,
      english: 70,
    },
    {
      key: "2",
      name: "Jim Green",
      chinese: 98,
      math: 66,
      english: 89,
    },
    {
      key: "3",
      name: "Joe Black",
      chinese: 98,
      math: 90,
      english: 70,
    },
    {
      key: "4",
      name: "Jim Red",
      chinese: 88,
      math: 99,
      english: 89,
    },
  ];
  return (
    <div className="AffiliateLink">
      <div className="chile" style={{ padding: "20px" }}>
        <div className="heading">
          <div className="title">QUẢN LÝ LINK</div>
          <div className="heading__right">
            {/* sadadsad */}
            <Search
              size="large"
              placeholder="Tìm theo tên hoặc số điện thoại"
              onSearch={onSearch}
              style={{ width: 300 }}
            />
          </div>
        </div>
      </div>
      <Divider />
      <div className="chile">
        <Table columns={columns} dataSource={data} onChange={onChange} />
      </div>
    </div>
  );
};

export default AffiliateLink;
