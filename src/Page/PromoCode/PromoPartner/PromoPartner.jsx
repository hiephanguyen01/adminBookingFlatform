import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Pagination,
  Popover,
  Select,
  Table,
  Tag,
} from "antd";
import queryString from "query-string";

import styles from "./promoPartner.module.scss";
import {
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { notifyService } from "../../../services/notifyService";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import { promoCodeService } from "../../../services/PromoCodeService";

const cx = classNames.bind(styles);
const { RangePicker } = DatePicker;

const NOTIFY_TYPE = [
  { value: "", label: "Tất cả" },
  { value: 1, label: "Khuyến mãi" },
  { value: 2, label: "Sự kiện" },
  { value: 3, label: "Chính sách" },
];

const STATUS = [
  { value: "", label: "Tất cả" },
  { value: 1, label: "Đang diễn ra" },
  { value: 2, label: "Hết hạn" },
  { value: 3, label: "Đã hủy" },
];

const columns = [
  {
    title: "Mã KM",
    dataIndex: "SaleCode",
    key: "SaleCode",
    width: 200,
    ellipsis: {
      showTitle: false,
    },
  },
  {
    title: "Tiêu đề",
    dataIndex: "Title",
    key: "Title",
    ellipsis: {
      showTitle: false,
    },
  },
  {
    title: "Ngày áp dụng",
    dataIndex: "DateTimeApply",
    key: "DateTimeApply",
    render: (text) => <>{moment(text).utc().format("HH:mm DD/MM/YYYY")}</>,
    width: 150,
    ellipsis: {
      showTitle: false,
    },
  },
  {
    title: "Ngày hết hạn",
    key: "DateTimeExpire",
    dataIndex: "DateTimeExpire",
    render: (text) => <>{moment(text).utc().format("HH:mm DD/MM/YYYY")}</>,
    width: 150,
    ellipsis: {
      showTitle: false,
    },
  },
  {
    title: "Đã tham gia",
    key: "NoOfJoined",
    dataIndex: "NoOfJoined",
    width: 150,
  },
  {
    title: "Trạng thái",
    // key: "DateTimeExpire",
    // dataIndex: "DateTimeExpire",
    render: (value) => (
      <>
        {value.IsDeleted ? (
          <Tag color="#f50">Đã hủy</Tag>
        ) : moment(value.DateTimeExpire) > moment() ? (
          <Tag color="green">Đang diễn ra</Tag>
        ) : (
          <Tag color="red">Hết hạn</Tag>
        )}
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
              state={{ promoId: value.id }}
              className={cx("action_more")}>
              <EyeOutlined className={cx("action_more_icon")} />
              Xem chi tiết
            </Link>
            <Link
              to={"edit"}
              state={{ promoId: value.id }}
              className={cx("action_more")}>
              <EditOutlined className={cx("action_more_icon")} />
              Chỉnh sửa
            </Link>
          </>
        }
        trigger="click">
        <MoreOutlined />
      </Popover>
    ),
  },
];

export const PromoPartner = () => {
  const [data, setData] = useState();
  const [filtersPage, setFiltersPage] = useState({
    page: 1,
    limit: 5,
  });
  const [filter, setFilter] = useState({
    dateTimeApply: null,
    dateTimeExpire: null,
    saleCode: "",
    status: "",
  });
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    const getAllPromoCode = async () => {
      const res = await promoCodeService.getAllPromoCode({
        ...filtersPage,
        ...filter,
        dateTimeApply: JSON.stringify({
          startDate: (filter.dateTimeApply && filter?.dateTimeApply[0]) || "",
          endDate: (filter.dateTimeApply && filter?.dateTimeApply[1]) || "",
        }),
        dateTimeExpire: JSON.stringify({
          startDate: (filter.dateTimeExpire && filter?.dateTimeExpire[0]) || "",
          endDate: (filter.dateTimeExpire && filter?.dateTimeExpire[1]) || "",
        }),
      });
      setData(res.data.data);
      setPagination(res.data.pagination);
      // setFiltersPage({ ...filtersPage, page: res.data.pagination.currentPage });
    };
    getAllPromoCode();
  }, [filtersPage, filter]);

  const onValuesChangeForm = async (value) => {
    setFilter({ ...filter, ...value });
    setFiltersPage({ ...filtersPage, page: 1 });
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
          labelWrap={true}>
          <div className={cx("w-25", "fs-16")}>
            <Form.Item
              label="Tìm kiếm"
              name={"saleCode"}
              className={cx("form-custom")}>
              <Input placeholder="Nhập mã KM" />
            </Form.Item>
          </div>
          <div className={cx("w-25", "fs-16")}>
            <Form.Item
              label="Ngày áp dụng"
              name="dateTimeApply"
              className={cx("form-custom")}>
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
              label="Ngày hết hạn"
              name="dateTimeExpire"
              className={cx("form-custom")}>
              <RangePicker format="DD/MM/YYYY" />
            </Form.Item>
          </div>
          <div className={cx("w-25", "fs-16")}>
            <Form.Item
              label="Trạng thái"
              name="status"
              className={cx("form-custom")}>
              <Select defaultValue={""}>
                {STATUS.map((item) => (
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
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};
