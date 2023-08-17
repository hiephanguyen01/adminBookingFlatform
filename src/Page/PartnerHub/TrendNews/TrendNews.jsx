import { DeleteOutlined, EditFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { partnerHubTrendNewsService } from "../../../services/PartnerHubTrendNewsService";
import { openNotification } from "../../../../utils/Notification";
import { CATEGORIES } from "../../../../utils/category";

const TrendNews = () => {
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSelectChange = (newSelectedRowKeys) => {
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
      render: (item) => (
        <img
          src={item}
          style={{ width: "84px", height: "54px", borderRadius: "8px" }}
        />
      ),
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      render: (id) => <p>{CATEGORIES.find((val) => val.value === id).label}</p>,
    },
    {
      title: "Thao tác",
      dataIndex: "id",
      render: (id) => (
        <Button
          icon={<EditFilled />}
          shape="circle"
          onClick={() => navigate(`form/${id}`)}
        />
      ),
    },
  ];
  const onDelete = async () => {
    setLoading(true);

    try {
      await partnerHubTrendNewsService.deletePartnerHubTrendNews({
        deleteList: selectedRowKeys,
      });
      openNotification("success", "Thành công");
    } catch (error) {
      openNotification("error", "Vui lòng thử lại sau!");
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data: res } =
          await partnerHubTrendNewsService.getPartnerHubTrendNews();
        setData(
          res.data.map((val) => ({
            key: val.id,
            ...val,
          }))
        );
      } catch (error) {
        openNotification("error", "Vui lòng thử lại sau!");
      }
    })();
  }, [loading]);
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
        <h2>XU HƯỚNG, TIN TỨC</h2>
        <div style={{ display: "flex", gap: "20px" }}>
          <Popconfirm
            title="Xoá"
            description="Xoá những mục đã chọn"
            onConfirm={onDelete}
            okText="Đồng ý"
            cancelText="Huỷ"
          >
            <Button icon={<DeleteOutlined />}>Xoá</Button>
          </Popconfirm>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate("form")}
          >
            Tạo mới
          </Button>
        </div>
      </div>

      <Table
        loading={loading}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default TrendNews;
