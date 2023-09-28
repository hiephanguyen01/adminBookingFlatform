import { EyeOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Pagination, Select, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { convertPrice } from "../../../utils/convert";
import { openNotification } from "../../../utils/Notification";
import { roomService } from "../../services/RoomService";
import "./AffiliateLink.scss";
import { studioPostService } from "../../services/StudioPostService";
const { Search } = Input;

const AffiliateLink = () => {
  const [service, setService] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginate, setPaginate] = useState();
  const [current, setCurrent] = useState(1);
  const [category, setCategory] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const columns = [
    {
      title: "ID dịch vụ/sản phẩm",
      dataIndex: "id",
      render: (_) => <a>{_}</a>,
    },
    {
      title: "Tên dịch vụ/sản phẩm",
      dataIndex: "Name",
    },
    {
      title: "% Hoa hồng",
      dataIndex: "english",
      render: (filed, _) => (
        <p>
          {Math.round(_?.AffiliateCommissionByDate * 100) || 0} % <br />{" "}
          {Math.round(_?.AffiliateCommissionByHour * 100) || 0} %{" "}
        </p>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "id",
      render: (_, record) => (
        <Space size="middle">
          <Button
            shape="circle"
            icon={<EyeOutlined />}
            onClick={() =>
              navigate(`/affiliate/link/${_}?category=${category}`)
            }
          />
        </Space>
      ),
    },
  ];
  const onSearch = (value) => {
    setSearch(value);
  };
  const onChangePage = (page) => {
    setCurrent(page);
  };
  const handleChangeCategory = (value) => {
    setCurrent(1);
    setCategory(value);
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await studioPostService.getAllPostAff(
          current,
          10,
          category,
          search
        );
        setService(data.data);
        setPaginate(data.pagination);
      } catch (error) {
        openNotification("error", "Vui  lòn thử lại sau");
      }
      setLoading(false);
    })();
  }, [current, category, search]);

  return (
    <div className="AffiliateLink">
      <div className="chile" style={{ padding: "20px" }}>
        <div className="heading">
          <div className="title">QUẢN LÝ LINK</div>
          <div className="heading__right">
            <Select
              size="large"
              defaultValue={1}
              style={{ width: 200, marginRight: "20px" }}
              onChange={handleChangeCategory}
              options={[
                { label: "Studio", value: 1 },
                { label: "Photographer", value: 2 },
                { label: "Make up", value: 4 },
                { label: "Model", value: 6 },
              ]}
            />
            <Search
              size="large"
              placeholder="Tìm theo tên"
              onSearch={onSearch}
              style={{ width: 300 }}
            />
          </div>
        </div>
      </div>
      <Divider />
      <div className="chile">
        <Table columns={columns} dataSource={service} pagination={false} />
        <div
          style={{ width: "fit-content", margin: "0 auto", padding: "20px 0" }}
        >
          {paginate && (
            <Pagination
              disabled={loading}
              onChange={onChangePage}
              current={paginate?.currentPage || current}
              total={paginate?.total || 1}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AffiliateLink;
