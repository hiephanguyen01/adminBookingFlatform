import { Breadcrumb, Image, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMG } from "../../../../../utils/baseURL";
import { converPriceVND } from "../../../../../utils/convert";
import { DetailRoom } from "./detailRoom";
const { Column, ColumnGroup } = Table;

export const InfoRoom = ({ service, category }) => {
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
          style={{ color: "#03ac84", cursor:"pointer" }}
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
            <Column
              title="Tên dịch vụ"
              dataIndex="Name"
              key="Name"
              render={(item, _) => {
                return (
                  <div style={{ display: "flex", gap: ".8rem" }}>
                    <Image width={120} height={80} src={IMG(_?.Image[0])} />
                    <h4>{_?.Name}</h4>
                  </div>
                );
              }}
            />
            <ColumnGroup title="Giá niêm yết">
              <Column
                title="đ/Giờ"
                dataIndex="PriceByHour"
                align="center"
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
                align="center"
                key="PriceByDate"
                render={(item) => {
                  return converPriceVND(item);
                }}
              />
            </ColumnGroup>
            <Column
              title="Số đơn đặt"
              dataIndex="address"
              key="address"
              render={(item, _) => {
                return <p>{_?.Bookings?.length || 0}</p>;
              }}
            />
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
                    Xem chi tiết
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
