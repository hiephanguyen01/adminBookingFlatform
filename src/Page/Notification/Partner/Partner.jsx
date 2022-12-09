import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import {
  Button,
  DatePicker,
  Form,
  Pagination,
  Popover,
  Select,
  Table,
} from "antd";
import queryString from "query-string";

import styles from "./partner.module.scss";
import {
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { notifyService } from "../../../services/notifyService";
import moment from "moment/moment";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
const { RangePicker } = DatePicker;

const NOTIFY_TYPE = [
  { value: "", label: "Tất cả" },
  { value: 1, label: "Khuyến mãi" },
  { value: 2, label: "Sự kiện" },
  { value: 3, label: "Chính sách" },
];

const NOTIFY_STATUS = [
  { value: "", label: "Tất cả" },
  { value: 0, label: "Đã gửi" },
  { value: 1, label: "Chờ gửi" },
  { value: 2, label: "Đã hủy" },
];

const columns = [
  {
    title: "Loại thông báo",
    dataIndex: "Type",
    key: "Type",
    render: (text) => (
      <>
        {Number(text) === 1
          ? "Khuyến mãi"
          : Number(text) === 2
          ? "Sự kiện"
          : "Chính sách"}
      </>
    ),
  },
  {
    title: "Tiêu đề",
    dataIndex: "Title",
    key: "title",
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text) => <>{moment(text).format("HH:hh DD/MM/YYYY")}</>,
  },
  {
    title: "Ngày gửi",
    key: "SendingTime",
    dataIndex: "SendingTime",
    render: (text) => <>{moment(text).format("HH:hh DD/MM/YYYY")}</>,
  },
  {
    title: "Trạng thái",
    key: "Status",
    dataIndex: "Status",
    render: (text) => (
      <>
        {Number(text) === 0
          ? "Đã gửi"
          : Number(text) === 1
          ? "Chờ gửi"
          : "Đã hủy"}
      </>
    ),
  },
  {
    title: "Thao tác",
    key: "action",
    render: (value) => (
      <Popover
        placement="right"
        content={
          <>
            <Link
              to={"view-detail"}
              state={{ notificationId: value.id }}
              className={cx("action_more")}
            >
              <EyeOutlined className={cx("action_more_icon")} />
              Xem chi tiết
            </Link>
            <Link
              to={"edit"}
              state={{ notificationId: value.id }}
              className={cx("action_more")}
            >
              <EditOutlined className={cx("action_more_icon")} />
              Chỉnh sửa
            </Link>
          </>
        }
        trigger="click"
      >
        <MoreOutlined />
      </Popover>
    ),
  },
];

export const Partner = () => {
  const [data, setData] = useState();
  const [filtersPage, setFiltersPage] = useState({
    page: 1,
    limit: 5,
  });
  const [filter, setFilter] = useState({
    createdAt: {
      startDate: "",
      endDate: "",
    },
    SendingTime: {
      startDate: "",
      endDate: "",
    },
    Type: "",
    Status: "",
  });
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    const getNotifyPartner = async () => {
      const res = await notifyService.getNotifyPartner(
        queryString.stringify(filtersPage),
        { ...filter, userType: 0 }
      );
      console.log(res.data);
      setData(res.data.data);
      setPagination(res.data.pagination);
      // setFiltersPage({ ...filtersPage, page: res.data.pagination.currentPage });
    };
    getNotifyPartner();
  }, [filtersPage]);

  const onValuesChangeForm = async (value) => {
    const newFilter = { ...filter, ...value };
    const res = await notifyService.getNotifyPartner(
      queryString.stringify(filtersPage),
      newFilter
    );
    setData(res.data.data);
    setPagination(res.data.pagination);
  };
  return (
    <div className={cx("container")}>
      <div className={cx("filter-wrapper")}>
        <Form
          // labelCol={{ span:  }}
          wrapperCol={{ span: 24 }}
          layout="inline"
          onValuesChange={onValuesChangeForm}
          // disabled={componentDisabled}
          initialValues={{}}
          // onFinish={onFinish}
          size="large"
          style={{ display: "flex" }}
          labelWrap={true}
        >
          <div className={cx("w-25", "fs-16")}>
            <Form.Item
              label="Ngày tạo"
              name="createdAt"
              className={cx("form-custom")}
            >
              <RangePicker
                // onChange={(date, dateString) =>
                //   setFilter({
                //     ...filter,
                //     createdAt: {
                //       startDate: new Date(dateString[0]).toISOString(),
                //       endDate: new Date(dateString[1]).toISOString(),
                //     },
                //   })
                // }
                format={"DD/MM/YYYY"}
              />
            </Form.Item>
          </div>
          <div className={cx("w-25", "fs-16")}>
            <Form.Item
              label="Ngày gửi"
              name="sendingTime"
              className={cx("form-custom")}
            >
              <RangePicker />
            </Form.Item>
          </div>
          <div className={cx("w-25", "fs-16")}>
            <Form.Item
              label="Loại thông báo"
              name="type"
              className={cx("form-custom")}
            >
              <Select defaultValue={""}>
                {NOTIFY_TYPE.map((item) => (
                  <Select.Option value={item.value} key={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className={cx("w-25", "fs-16")}>
            <Form.Item
              label="Trạng thái"
              name={"status"}
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
      <div className={cx("content-wrapper")}>
        <Table columns={columns} dataSource={data} pagination={false} />
        <Pagination
          current={pagination?.currentPage}
          total={pagination?.totalPages * 10}
          onChange={(page) => setFiltersPage({ ...filtersPage, page })}
          style={{ margin: "30px 0" }}
        />
      </div>
    </div>
  );
};
