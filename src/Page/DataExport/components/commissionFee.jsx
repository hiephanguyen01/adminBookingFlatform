import { SearchOutlined } from "@ant-design/icons";
import { Form, Input, Select, DatePicker } from "antd";
import moment from "moment";
import React, { useState } from "react";
const { RangePicker } = DatePicker;
import "../dataExport.scss";
export const CommissionFee = () => {
  const [filter, setFilter] = useState({
    createDate: {
      startDate: "",
      endDate: "",
    },
    isDelete: "",
  });
  console.log(filter);
  const onChangeFilter = (value) => {
    setFilter({ ...filter, ...value });
    if (Object.keys(value)[0] === "createDate") {
      const obj = value?.createDate?.reduce((acc, item, index) => {
        const key = index === 0 ? "startDate" : "endDate";
        return { ...acc, [key]: moment(item.$d).format() };
      }, {});
      if (!obj) {
        setFilter({
          ...filter,
          createDate: {
            startDate: "",
            endDate: "",
          },
        });
      } else {
        setFilter({ ...filter, createDate: obj });
      }
    }
  };
  const formItem = [
    {
      label: "Trạng thái",
      name: "IsStatus",
      style: {
        width: "22%",
        display: "inline-block",
        marginRight: "40px",
      },
      el: (
        <Select
          defaultValue="Tất cả"
          size="large"
          options={[
            {
              value: "",
              label: "Tất cả",
            },
            {
              value: "1",
              label: "Active",
            },
            {
              value: "0",
              label: "Cancle",
            },
          ]}
        />
      ),
    },
    {
      label: "Ngày thực hiện",
      name: "createDate",
      style: {
        width: "22%",
        display: "inline-block",
        marginRight: "40px",
      },
      el: <RangePicker style={{ padding: "8px" }} />,
    },
  ];
  return (
    <div className="partnerExport">
      <h3>Bộ lọc nâng cao</h3>
      <Form
        name="basic"
        layout="vertical"
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          remember: true,
        }}
        // onFinish={onFinish}
        onValuesChange={(e) => onChangeFilter(e)}
        autoComplete="off"
      >
        {formItem.map((item, idx) => (
          <Form.Item
            key={idx}
            name={item.name}
            label={item.label}
            style={item.style}
          >
            {item.el}
          </Form.Item>
        ))}
      </Form>
    </div>
  );
};
