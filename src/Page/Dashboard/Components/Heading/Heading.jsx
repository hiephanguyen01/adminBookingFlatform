import { Button, DatePicker, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import "./Heading.scss";
const { RangePicker } = DatePicker;
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
const Heading = ({ title, setDate, date }) => {
  const [open, setOpen] = useState(false);
  const [picker, setPicker] = useState();
  useEffect(() => {
    setDate(timeDate[0]);
  }, []);
  const handleChange = (value) => {
    setDate(timeDate[value - 1]);
    if (value === 8) {
      setOpen(true);
    }
  };
  const handleOk = () => {
    setDate({ ...date, picker });
    setOpen(false);
  };
  const onChange = (value, dateString) => {
    setPicker(dateString);
  };

  return (
    <div className="Heading chile">
      <h3>{title}</h3>
      <Select
        size="large"
        defaultValue={1}
        style={{ width: 200 }}
        onChange={handleChange}
        options={timeDate}
      />
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
          <RangePicker onChange={onChange} format="DD/MM/YYYY" />
        </div>
      </Modal>
    </div>
  );
};

export default Heading;
