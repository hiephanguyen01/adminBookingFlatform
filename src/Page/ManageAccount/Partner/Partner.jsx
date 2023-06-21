import {
  EditOutlined,
  EyeOutlined,
  FileSearchOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Input,
  Pagination,
  Select,
  Space,
  Table,
  Tag,
  DatePicker,
  Form,
  Divider,
} from "antd";
import React, { useEffect, useState } from "react";
import { registerPartnerService } from "../../../services/RegisterPartnerService";
import moment from "moment";
import "./Partner.scss";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../../Components/Loading";
const { RangePicker } = DatePicker;
import classNames from "classnames/bind";
import styles from "./Partner.module.scss";
import { convertTimeUTC } from "../../../../utils/convert";
const cx = classNames.bind(styles);
const Partner = () => {
  const [dataTale, setDataTable] = useState([]);
  const [loading, setLoading] = useState(true);
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
    IsDeleted: false,
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
      const { data } = await registerPartnerService.getAllPartner(
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
  const onChangePagination = (page) => {
    getAllPartner(page, 10, filter);
  };
  const columns = [
    {
      title: "Số định danh",
      dataIndex: "IdentifierCode",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Số điện thoại",
      dataIndex: "Phone",
    },
    {
      title: "Email",
      dataIndex: "Email",
    },
    {
      title: "Số bài đăng",
      dataIndex: "NumberOfPost",
    },
    {
      title: "Ngày tạo",
      dataIndex: "CreationTime",
      render: (item) => convertTimeUTC(item, true),
    },
    {
      title: "Cập nhật gần nhất",
      dataIndex: "LastModificationTime",
      render: (item) => moment(item).format("DD/MM/YYYY HH:mm A"),
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
  const NOTIFY_STATUS = [
    { value: "", label: "Tất cả" },
    { value: 0, label: "Active" },
    { value: 1, label: "Cancel" },
  ];
  const onChangeFilter = (value) => {
    setFilter({ ...filter, ...value });
    if (Object.keys(value)[0] === "CreateDate") {
      const obj = value.CreateDate.reduce((acc, item, index) => {
        const key = index === 0 ? "startDate" : "endDate";
        return { ...acc, [key]: moment(item.$d).format() };
      }, {});
      setFilter({ ...filter, CreateDate: obj });
    }
    if (Object.keys(value)[0] === "updateDate") {
      const obj = value.updateDate.reduce((acc, item, index) => {
        const key = index === 0 ? "startDate" : "endDate";
        return { ...acc, [key]: moment(item.$d).format() };
      }, {});
      setFilter({ ...filter, updateDate: obj });
    }
  };
  if (loading) return <Loading />;
  return (
    <>
      <div className={cx("filter-wrapper chile")} style={{ padding: "20px" }}>
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
              label="Tìm kiếm"
              name="keyString"
              className={cx("form-custom")}
            >
              <Input prefix={<SearchOutlined />} />
            </Form.Item>
          </div>
          <div className={cx("w-25", "fs-16")}>
            <Form.Item
              label="Ngày tạo"
              name="CreateDate"
              className={cx("form-custom")}
            >
              <RangePicker format="DD/MM/YYYY" />
            </Form.Item>
          </div>
          <div className={cx("w-25", "fs-16")}>
            <Form.Item
              label="Ngày cập nhật gần nhất"
              name="updateDate"
              className={cx("form-custom")}
            >
              <RangePicker format="DD/MM/YYYY" />
            </Form.Item>
          </div>
          <div className={cx("w-25", "fs-16")}>
            <Form.Item
              label="Trạng thái"
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
      <Divider />
      <div className="dataTable chile">
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

export default Partner;
