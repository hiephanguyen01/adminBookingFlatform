import { EditOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Pagination,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import classNames from "classnames/bind";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Partner.module.scss";
import "./Partner.scss";
import { registerPartnerService } from "../../services/RegisterPartnerService";
import { Loading } from "../../Components/Loading";
import { orderService } from "../../services/OrderService";
const { RangePicker } = DatePicker;
const cx = classNames.bind(styles);
const ManagerOrder = () => {
  const [dataTale, setDataTable] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("data ", dataTale);
  const [filter, setFilter] = useState({
    category: "1",
    Identify_like: "",
    PaymentTypeOnline: "",
    BookingStatus: "",
    EntryDate: {
      startDate: "",
      endDate: "",
    },
  });
  const [pagination, setPagination] = useState();
  const navigate = useNavigate();
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

  const getAllPartner = async (page, limit, filter) => {
    try {
      const { data } = await orderService.getAllBooking(page, limit, filter);
      setDataTable(data.data);
      setPagination(data.pagination);
    } catch (error) {
      console.log(error);
    }
  };
  const onChangePagination = (page) => {
    console.log(page);
    getAllPartner(page, 10, filter);
  };
  const columns = [
    {
      title: "Mã đơn đặt",
      dataIndex: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Số định danh",
      dataIndex: "IdentifyCode",
    },
    {
      title: "Mã bài đăng",
      dataIndex: "Email",
    },

    {
      title: "Ngày Thực hiện",
      dataIndex: "CreationTime",
      render: (item) => moment(item).format("DD-MM-YYYY HH:mm"),
    },
    ,
    {
      title: "Hình thức thanh toán",
      dataIndex: "PaymentType",
      render: (item) => {
        return (
          <>
            {item == "1" ? (
              <Tag color={"red"}>{"Online".toUpperCase()}</Tag>
            ) : (
              <Tag color={"green"}>{"Offline".toUpperCase()}</Tag>
            )}
          </>
        );
      },
    },
    {
      title: "Trạng thái thanh toán",
      dataIndex: "PaymentType",
      render: (item) => {
        return (
          <>
            {item == "1" ? (
              <Tag color={"red"}>{"Online".toUpperCase()}</Tag>
            ) : (
              <Tag color={"green"}>{"Offline".toUpperCase()}</Tag>
            )}
          </>
        );
      },
    },
    {
      title: "Trạng thái đơn đặt",
      dataIndex: "PaymentType",
      render: (item) => {
        return (
          <>
            {item == "1" ? (
              <Tag color={"red"}>{"Online".toUpperCase()}</Tag>
            ) : (
              <Tag color={"green"}>{"Offline".toUpperCase()}</Tag>
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

  const NOTIFY_STATUS = [
    { value: "", label: "Tất cả" },
    { value: 0, label: "Active" },
    { value: 1, label: "Cancle" },
  ];
  const CATEGORY = [
    { value: 1, label: "STUDIO" },
    { value: 2, label: "Nhiếp ảnh" },
    { value: 3, label: "Trang phucj" },
    { value: 4, label: "Makeup" },
    { value: 5, label: "Thiết bị" },
    { value: 6, label: "Người mẫu" },
  ];
  console.log(filter);
  const onChangeFilter = (value) => {
    console.log(value);
    setFilter({ ...filter, ...value });
    if (Object.keys(value)[0] === "EntryDate") {
      const obj = value.EntryDate.reduce((acc, item, index) => {
        console.log(index);
        const key = index === 0 ? "startDate" : "endDate";
        return { ...acc, [key]: moment(item.$d).format() };
      }, {});
      console.log(obj);
      setFilter({ ...filter, EntryDate: obj });
    }
  };
  if (loading) return <Loading />;
  return (
    <>
      <div className={cx("filter-wrapper")}>
        <Form
          // labelCol={{ span:  }}
          wrapperCol={{ span: 24 }}
          layout="inline"
          onValuesChange={(e) => onChangeFilter(e)}
          // disabled={componentDisabled}
          initialValues={{}}
          // onFinish={onFinish}
          size="large"
          style={{ display: "flex" }}
          labelWrap={true}
        >
          <div className={cx("w-25", "fs-16")}>
            <Form.Item
              label="Loại đơn đặt"
              name={"category"}
              className={cx("form-custom")}
            >
              <Select defaultValue={1}>
                {CATEGORY.map((item) => (
                  <Select.Option value={item.value} key={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className={cx("w-25", "fs-16")}>
            <Form.Item
              label="Tìm kiếm"
              name="Identify_like"
              className={cx("form-custom")}
            >
              <Input prefix={<SearchOutlined />} />
            </Form.Item>
          </div>
          <div className={cx("w-25", "fs-16")}>
            <Form.Item
              label="Ngày thực hiện"
              name="EntryDate"
              className={cx("form-custom")}
            >
              <RangePicker />
            </Form.Item>
          </div>

          <div className={cx("w-25", "fs-16")}>
            <Form.Item
              label="Hình thức thanh toán"
              name={"IsDeleted"}
              className={cx("form-custom")}
            >
              <Select defaultValue={""}>
                {NOTIFY_STATUS.map((item) => (
                  <Select.Option value={item.value} key={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className={cx("w-25", "fs-16")}>
            <Form.Item
              label="Trạng thái thanh toán"
              name={"IsDeleted"}
              className={cx("form-custom")}
            >
              <Select defaultValue={""}>
                {NOTIFY_STATUS.map((item) => (
                  <Select.Option value={item.value} key={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className={cx("w-25", "fs-16")}>
            <Form.Item
              label="Trạng thái dơn đặt"
              name={"IsDeleted"}
              className={cx("form-custom")}
            >
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
      <div className="dataTable">
        <Table columns={columns} pagination={false} dataSource={dataTale} />
        <Pagination
          current={pagination?.currentPage}
          // defaultCurrent={1}
          total={pagination?.total}
          pageSize={pagination?.limit * 1}
          onChange={onChangePagination}
          showSizeChanger={false}
        />
      </div>
    </>
  );
};

export default ManagerOrder;
