import { EyeOutlined } from "@ant-design/icons";
import { reportService } from "../../services/ReportService";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import "./RankReport.scss";
import { CATEGORIES } from "../../../utils/category";
import { useNavigate } from "react-router-dom";
import { openNotification } from "../../../utils/Notification";

const RankReport = () => {
  const [category, setCategory] = useState(1);
  const [keyString, setKeyString] = useState("");
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate([]);

  const columns = [
    {
      title: "Số định danh",
      dataIndex: "TenantId",
      key: "TenantId",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Mã bài đăng",
      dataIndex: "TenantId",
      key: "TenantId",
    },
    {
      title: "Tiêu đề",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Lượt đánh giá",
      dataIndex: "NumberOfRating",
      defaultSortOrder: "NumberOfRating",
      sorter: (a, b) => a.NumberOfRating - b.NumberOfRating,
    },
    {
      title: "Xếp hạng",
      dataIndex: "TotalRate",
      key: "TotalRate",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.TotalRate - b.TotalRate,
    },
    {
      title: "Báo cáo sai phạm",
      dataIndex: "NumberOfReport",
      key: "NumberOfReport",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.NumberOfReport - b.NumberOfReport,
    },
    {
      title: "Action",
      render: (item) => {
        return (
          <Space size="middle">
            <Button
              onClick={() => navigate(`${item.id}?category=${category}`)}
              icon={<EyeOutlined />}
            />
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        const { data } = await reportService.getAllRateReport({
          category,
          keyString,
        });
        setPosts(data.data);
      } catch (error) {
        openNotification(
          "error",
          "Bạn không được cấp quyền, lên xin sếp đi nhé !"
        );
      }
    })();
  }, [category, keyString]);
  const handleCategoryChange = (value) => {
    setCategory(value);
  };
  return (
    <div className="RankReport">
      <div className="chile">
        <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
          <Row gutter={[16, 16]}>
            <Col md={6}>
              <Form.Item
                style={{ margin: "20px" }}
                name="keySearch"
                label="Tìm kiếm">
                <Input
                  size="large"
                  onChange={(e) => setKeyString(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col md={6}>
              <Form.Item
                style={{ margin: "20px" }}
                name="category"
                label="Danh mục">
                <Select
                  size="large"
                  defaultValue={1}
                  // style={{ width: 200 }}
                  onChange={handleCategoryChange}
                  options={CATEGORIES}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <Divider />
      <div className="chile">
        <Table dataSource={posts} columns={columns} />
      </div>
    </div>
  );
};

export default RankReport;
