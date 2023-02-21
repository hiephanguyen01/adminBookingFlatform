import { EyeOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Divider,
  Input,
  Modal,
  Select,
  Space,
  Table,
} from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AffiliateCommission.scss";
const { RangePicker } = DatePicker;
const { Search } = Input;

const timeDate = [
  {
    value: 1,
    label: "7 ngày trước",
  },
  {
    value: 2,
    label: "30 ngày trước",
  },
  {
    value: 3,
    label: "Tháng này",
  },
  {
    value: 4,
    label: "Tháng trước",
  },
  {
    value: 5,
    label: "Quý này",
  },
  {
    value: 6,
    label: "Quý trước",
  },
  {
    value: 7,
    label: "Năm nay",
  },
  {
    value: 8,
    label: "Chọn ngày cụ thể",
  },
];
const AffiliateCommission = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [picker, setPicker] = useState();

  const handleChange = (value) => {
    if (value === 8) {
      setOpen(true);
    }
  };
  const handleOk = () => {
    setOpen(false);
  };
  const onChange = (value, dateString) => {
    setPicker(dateString);
  };
  const onSearch = async (value) => {
    console.log("🚀 ~ onSearch ~ value", value);
  };

  const dataSource = [
    {
      Id: 1,
      affiliateId: "234543",
      bookingId: "093793",
      postId: "299909",
      name: "Wisteria Studio - Cho thuê studio chụp hình...",
      bookingDate: "20/02/2022",
      bookingValue: "12.300.000",
      percentCommision: "5%",
      commission: "750.000 VND",
    },
    {
      Id: 2,
      affiliateId: "234543",
      bookingId: "093793",
      postId: "299909",
      name: "Wisteria Studio - Cho thuê studio chụp hình...",
      bookingDate: "20/02/2022",
      bookingValue: "12.300.000",
      percentCommision: "5%",
      commission: "750.000 VND",
    },
    {
      Id: 3,
      affiliateId: "234543",
      bookingId: "093793",
      postId: "299909",
      name: "Wisteria Studio - Cho thuê studio chụp hình...",
      bookingDate: "20/02/2022",
      bookingValue: "12.300.000",
      percentCommision: "5%",
      commission: "750.000 VND",
    },
    {
      Id: 4,
      affiliateId: "234543",
      bookingId: "093793",
      postId: "299909",
      name: "Wisteria Studio - Cho thuê studio chụp hình...",
      bookingDate: "20/02/2022",
      bookingValue: "12.300.000",
      percentCommision: "5%",
      commission: "750.000 VND",
    },
  ];

  const columns = [
    {
      title: "ID publisher",
      dataIndex: "affiliateId",
      key: "affiliateId",
      render: (_, record) => <p style={{ color: "#5D5FEF" }}>{_}</p>,
    },
    {
      title: "ID đơn đặt",
      dataIndex: "bookingId",
      key: "bookingId",
      render: (_, record) => <p style={{ color: "#03AC84" }}>{_}</p>,
    },
    {
      title: "ID bài đăng",
      dataIndex: "postId",
      key: "postId",
    },

    {
      title: "Ngày đặt",
      dataIndex: "bookingDate",
      key: "bookingDate",
      sorter: {
        compare: (a, b) => a.bookingDate - b.bookingDate,
        multiple: 2,
      },
    },
    {
      title: "Giá trị đơn đặt",
      dataIndex: "bookingValue",
      key: "bookingValue",
      sorter: {
        compare: (a, b) => a.bookingValue - b.bookingValue,
        multiple: 1,
      },
    },
    {
      title: "%Hoa hồng",
      dataIndex: "percentCommision",
      key: "percentCommision",
      sorter: {
        compare: (a, b) => a.percentCommision - b.percentCommision,
        multiple: 1,
      },
    },
    {
      title: "Hoa hồng",
      dataIndex: "commission",
      key: "commission",
      sorter: {
        compare: (a, b) => a.commission - b.commission,
        multiple: 1,
      },
    },
  ];
  return (
    <div className="AffiliateCommission">
      <div className="chile" style={{ padding: "20px" }}>
        <div className="heading">
          <h3>QUẢN LÝ HOA HỒNG</h3>
          <div className="heading__right">
            <Select
              size="large"
              defaultValue={1}
              style={{ width: 200, marginRight: "20px" }}
              onChange={handleChange}
              options={timeDate}
            />
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
        <Table dataSource={dataSource} columns={columns} />
      </div>

      <ModalTime
        open={open}
        handleOk={handleOk}
        setOpen={setOpen}
        onChange={onChange}
      />
    </div>
  );
};

export default AffiliateCommission;

function ModalTime({ open, handleOk, setOpen, onChange }) {
  return (
    <Modal
      title="Chọn ngày cụ thể"
      open={open}
      onOk={handleOk}
      footer={[
        <Button key="back" onClick={handleOk}>
          OK
        </Button>,
      ]}
      onCancel={() => setOpen(false)}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "20px",
        }}>
        <RangePicker onChange={onChange} />
      </div>
    </Modal>
  );
}
