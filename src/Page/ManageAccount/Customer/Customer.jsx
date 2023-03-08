import { EditOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Pagination,
  Select,
  Space,
  Table,
  Tag,
  DatePicker,
  Divider,
} from "antd";
import React, { useEffect, useState } from "react";
import { registerPartnerService } from "../../../services/RegisterPartnerService";
import moment from "moment";
import "./Customer.scss";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../../Components/Loading";
const { RangePicker } = DatePicker;
import classNames from "classnames/bind";
import styles from "../Partner/Partner.module.scss";
const cx = classNames.bind(styles);
const Customer = () => {
  const [dataTale, setDataTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState();
  const [filter, setFilter] = useState({
    keyString: "",
    CreateDate: {
      startDate: "",
      endDate: "",
    },
    updateDate: {
      startDate: "",
      endDate: "",
    },
    IsDeleted: "",
  });
  const navigate = useNavigate();
  // console.log(dataTale);
  useEffect(() => {
    (async () => {
      await getAllPartner(1, 10, filter);
      setLoading(false);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      await getAllPartner(1, 10, filter);
    })();
  }, [filter]);
  const NOTIFY_STATUS = [
    { value: "", label: "Tất cả" },
    { value: 0, label: "Active" },
    { value: 1, label: "Cancel" },
  ];
  const getAllPartner = async (page, limit, filter) => {
    try {
      const { data } = await registerPartnerService.getAllCustomer(
        page,
        limit,
        filter
      );
      setDataTable(data.data);
      setPagination(data.pagination);
    } catch (error) {
      console.log(error);
    }
  };
  const onChangeFilter = (value) => {
    // console.log(value);
    setFilter({ ...filter, ...value });

    if (Object.keys(value)[0] === "CreateDate") {
      const obj = value.CreateDate.reduce((acc, item, index) => {
        // console.log(index);
        const key = index === 0 ? "startDate" : "endDate";
        return { ...acc, [key]: moment(item.$d).format() };
      }, {});
      // console.log(obj);
      setFilter({ ...filter, CreateDate: obj });
    }
    if (Object.keys(value)[0] === "updateDate") {
      const obj = value.updateDate.reduce((acc, item, index) => {
        // console.log(index);
        const key = index === 0 ? "startDate" : "endDate";
        return { ...acc, [key]: moment(item.$d).format() };
      }, {});
      // console.log(obj);
      setFilter({ ...filter, updateDate: obj });
    }
  };
  const onChangePagination = (page) => {
    // console.log(page);
    getAllPartner(page, 10, filter);
    // setCurrent(page);
  };
  const columns = [
    {
      title: "Số định danh",
      dataIndex: "IdentifierCode",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Họ và Tên",
      dataIndex: "Fullname",
    },
    {
      title: "Email",
      dataIndex: "Email",
    },
    {
      title: "Số đơn đặt",
      dataIndex: "NumberOfBooking",
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
      <div className={cx("filter-wrapper chile")} style={{ padding: "20px" }}>
        <Form
          // labelCol={{ span:  }}
          wrapperCol={{ span: 24 }}
          layout="inline"
          onValuesChange={(e) => onChangeFilter(e)}
          size="large"
          style={{ display: "flex" }}
          labelWrap={true}>
          <div className={cx("w-25", "fs-16")}>
            <Form.Item
              label="Tìm kiếm"
              name="keyString"
              className={cx("form-custom")}>
              <Input prefix={<SearchOutlined />} />
            </Form.Item>
          </div>
          <div className={cx("w-25", "fs-16")}>
            <Form.Item
              label="Ngày tạo"
              name="CreateDate"
              className={cx("form-custom")}>
              <RangePicker format="DD/MM/YYYY" />
            </Form.Item>
          </div>
          <div className={cx("w-25", "fs-16")}>
            <Form.Item
              label="Ngày cập nhật gần nhất"
              name="updateDate"
              className={cx("form-custom")}>
              <RangePicker format="DD/MM/YYYY" />
            </Form.Item>
          </div>
          <div className={cx("w-25", "fs-16")}>
            <Form.Item
              label="Trạng thái"
              name={"IsDeleted"}
              className={cx("form-custom")}>
              <Select defaultValue={""}>
                {NOTIFY_STATUS.map((item) => (
                  <Select.Option value={item.value} key={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </Form>
      </div>
      <Divider />
      <div className="dataTable chile">
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

export default Customer;
