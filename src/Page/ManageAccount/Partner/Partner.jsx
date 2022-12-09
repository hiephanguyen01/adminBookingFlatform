import { EditOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Pagination, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { registerPartnerService } from "../../../services/RegisterPartnerService";
import moment from "moment";
import "./Partner.scss";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../../Components/Loading";
const Partner = () => {
  const [dataTale, setDataTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState();
  const navigate = useNavigate();
  console.log(dataTale);
  useEffect(() => {
    (async () => {
      await getAllPartner(1, 10);
      setLoading(false);
    })();
  }, []);

  const getAllPartner = async (page, limit) => {
    try {
      const { data } = await registerPartnerService.getAllPartner(page, limit);
      setDataTable(data.data);
      setPagination(data.pagination);
    } catch (error) {
      console.log(error);
    }
  };
  const onChangePagination = (page) => {
    console.log(page);
    getAllPartner(page, 10);
    // setCurrent(page);
  };
  const columns = [
    {
      title: "Số định danh",
      dataIndex: "IdentifierCode",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Số điện thoại",
      dataIndex: "Phone",
    },
    {
      title: "Email",
      dataIndex: "Email",
    },
    {
      title: "Số bài đăng",
      dataIndex: "NumberOfPost",
    },
    {
      title: "Ngày tạo",
      dataIndex: "CreationTime",
      render: (item) => moment(item).format("DD-MM-YYYY HH:mm"),
    },
    {
      title: "Cập nhật gần nhất",
      dataIndex: "LastModificationTime",
      render: (item) => moment(item).format("DD-MM-YYYY HH:mm"),
    },
    {
      title: "Trạng thái",
      dataIndex: "IsDeleted",
      render: (item) => {
        return (
          <>
            {item === true ? (
              <Tag color={"red"}>{"Cancel".toUpperCase()}</Tag>
            ) : (
              <Tag color={"blue"}>{"Active".toUpperCase()}</Tag>
            )}
          </>
        );
      },
    },
    {
      title: "Action",
      render: (item) => {
        console.log(item);
        return (
          <Space size="middle">
            <Button
              onClick={() => navigate(`${item.id}`)}
              icon={<EyeOutlined />}
            />
            <Button
              onClick={() => navigate(`edit/${item.id}`)}
              type="primary"
              icon={<EditOutlined />}
            />
          </Space>
        );
      },
    },
  ];
  if (loading) return <Loading />;
  return (
    <>
      <div className="fillter"></div>
      <div className="dataTable">
        <Table columns={columns} pagination={false} dataSource={dataTale} />
        <Pagination
          current={pagination?.currentPage}
          defaultCurrent={1}
          total={pagination?.total}
          pageSize={pagination?.limit * 1}
          onChange={onChangePagination}
          showSizeChanger={false}
        />
      </div>
    </>
  );
};

export default Partner;
