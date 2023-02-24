import { SearchOutlined } from "@ant-design/icons";
import { Form, Input, Select, DatePicker } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { districtService } from "../../../services/DistrictService";
const { RangePicker } = DatePicker;
import "../dataExport.scss";
export const PartnerExport = ({ setData, data }) => {
  const [province, setProvice] = useState([]);
  const [filter, setFilter] = useState({
    createDate: {
      startDate: "",
      endDate: "",
    },
    ProvinceId: "",
    IsDelete: "",
  });
  useEffect(() => {
    (async () => {
      await getAllprovinces();
    })();
  }, []);
  const getAllprovinces = async () => {
    try {
      const { data } = await districtService.getAllprovinces();
      setProvice(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(filter);
  const onChangeFilter = (value) => {
    setFilter({ ...filter, ...value });
    setData({ ...data, ...value });
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
        setData({
          ...data,
          createDate: {
            startDate: "",
            endDate: "",
          },
        });
      } else {
        setFilter({ ...filter, createDate: obj });
        setData({ ...data, createDate: obj });
      }
    }
  };
  const formItem = [
    {
      label: "Tỉnh/Thành phố",
      name: "ProvinceId",
      style: {
        width: "20%",
        display: "inline-block",
        marginRight: "40px",
      },
      el: (
        <Select defaultValue="" size="large">
          <Option value="">Tất cả</Option>
          {province?.map((item) => (
            <Option value={item.id} key={item.id}>
              {item.Name}
            </Option>
          ))}
        </Select>
      ),
    },

    {
      label: "Trạng thái",
      name: "IsDeleted",
      style: {
        width: "22%",
        display: "inline-block",
        marginRight: "40px",
      },
      el: (
        <Select
          defaultValue=""
          size="large"
          options={[
            {
              value: "",
              label: "Tất cả",
            },
            {
              value: false,
              label: "Active",
            },
            {
              value: true,
              label: "Cancel",
            },
          ]}
        />
      ),
    },
    {
      label: "Ngày tạo",
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
        autoComplete="off">
        {formItem.map((item, idx) => (
          <Form.Item
            key={idx}
            name={item.name}
            label={item.label}
            style={item.style}>
            {item.el}
          </Form.Item>
        ))}
      </Form>
    </div>
  );
};
