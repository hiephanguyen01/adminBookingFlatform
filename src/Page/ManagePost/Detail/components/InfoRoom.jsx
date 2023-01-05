import React, { useEffect, useState } from "react";
import {
  Space,
  Table,
  Tag,
  Breadcrumb,
  Modal,
  Form,
  Row,
  Col,
  Input,
  Image,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import TextArea from "antd/es/input/TextArea";
import { BASEURL_IMG } from "../../../../../utils/baseURL";
import { DetailRoom } from "./detailRoom";
import { useNavigate } from "react-router-dom";
const { Column, ColumnGroup } = Table;

export const InfoRoom = ({ service, category }) => {
  console.log(service);
  console.log(category);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState({});
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    return () => setVisible(false);
  }, []);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Breadcrumb style={{ fontSize: "17px" }}>
        <Breadcrumb.Item
          onClick={() => navigate("/posts")}
          style={{ color: "#03ac84" }}
        >
          Quản lí bài đăng
        </Breadcrumb.Item>
        <Breadcrumb.Item
          style={{
            color: `${visible ? "#03ac84" : ""}`,
            cursor: `${visible ? "pointer" : ""}`,
          }}
          onClick={() => setVisible(false)}
        >
          Thông tin phòng
        </Breadcrumb.Item>
        {visible && <Breadcrumb.Item>Chi tiết phòng</Breadcrumb.Item>}
      </Breadcrumb>
      {/* <Input size="large" placeholder="Tìm kiếm" prefix={<SearchOutlined />} /> */}
      {visible ? (
        <DetailRoom category={category} data={detail} />
      ) : (
        <div style={{ marginTop: "2rem" }}>
          <Table dataSource={service}>
            <Column title="Tên Phòng" dataIndex="Name" key="Name" />
            <ColumnGroup title="Giá niêm yết">
              <Column
                title="đ/Giờ"
                dataIndex="PriceByHour"
                key="PriceByHour"
                render={(item) => {
                  return Number(item).toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  });
                }}
              />
              <Column
                title="đ/Ngày"
                dataIndex="PriceByDate"
                key="PriceByDate"
                render={(item) => {
                  return Number(item).toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  });
                }}
              />
            </ColumnGroup>
            <Column title="Số đơn đặt" dataIndex="address" key="address" />
            <Column
              title="Thao tác"
              key="action"
              render={(_, record) => {
                return (
                  <a
                    onClick={() => {
                      setVisible(true);
                      setDetail(record);
                      // setData(record);
                      // showModal();
                    }}
                  >
                    xem chi tiết
                  </a>
                );
              }}
            />
          </Table>
        </div>
      )}
    </div>
  );
};
