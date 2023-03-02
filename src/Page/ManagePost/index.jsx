import {
  EditOutlined,
  EyeOutlined,
  LeftOutlined,
  RightOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Table,
  Pagination,
  Button,
  Divider,
  Tag,
  Space,
  Row,
  Col,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import LeftNavBar from "../../Components/LeftNavBar/LeftNavBar";
import { Loading } from "../../Components/Loading";
import { studioPostService } from "../../services/StudioPostService";
const { RangePicker } = DatePicker;
export const ManagePost = () => {
  const [expandHeader, setExpandHeader] = useState(false);
  const [pagination, setPagination] = useState();
  const [dataTale, setDataTable] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState({
    category: 1,
    IsVisible: "",
    CreationTime: {
      startDate: "",
      endDate: "",
    },
    LastModificationTime: {
      startDate: "",
      endDate: "",
    },
    Name_like: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      await getAllPost(1, 10, filter);
      setLoading(false);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      await getAllPost(1, 10, filter);
    })();
  }, [filter]);
  const getAllPost = async (page, limit, filter) => {
    try {
      const { data } = await studioPostService.getAllStudioPost(
        page,
        limit,
        JSON.stringify(filter.category),
        filter.IsVisible,
        JSON.stringify(filter.CreationTime),
        JSON.stringify(filter.LastModificationTime),
        filter.Name_like
      );
      setDataTable(data.data);
      setPagination(data.pagination);
    } catch (error) {
      console.log(error);
    }
  };
  const column = [
    {
      title: "Mã bài đăng",
      dataIndex: "id",
      render: (value) => <strong>{value}</strong>,
    },
    {
      title: "Số định danh",
      dataIndex: "IdentifierCode",
    },
    {
      title: "Tiêu đề",
      dataIndex: "Name",
    },
    {
      title: "Ngày đăng",
      dataIndex: "CreationTime",
      render: (item) => moment(item).format("DD-MM-YYYY HH:mm"),
    },
    {
      title: "Ngày cập nhật gần nhất",
      dataIndex: "CreationTime",
      render: (item) => moment(item).format("DD-MM-YYYY HH:mm"),
    },
    {
      title: "Trạng thái",
      dataIndex: "IsVisible",
      render: (value) => {
        return value ? (
          <Tag color={"green"}>{"Mở/Có thẻ đặt".toUpperCase()}</Tag>
        ) : (
          <Tag color={"red"}>{"Đóng/Không thể đặt".toUpperCase()}</Tag>
        );
      },
    },

    {
      title: "Action",
      render: (item) => {
        return (
          <Space size="middle">
            <Button
              onClick={() =>
                navigate(`${item.id}`, {
                  state: { category: filter.category },
                })
              }
              icon={<EyeOutlined />}
            />
            <Button
              onClick={() =>
                navigate(`edit/${item.id}`, {
                  state: { category: filter.category },
                })
              }
              type="primary"
              icon={<EditOutlined />}
            />
          </Space>
        );
      },
    },
  ];
  const formItem = [
    {
      label: "Loại đơn đặt",
      name: "category",
      style: {
        width: "20%",
        display: "inline-block",
        marginRight: "40px",
      },
      el: (
        <Select
          defaultValue={1}
          size="large"
          style={{
            width: 120,
          }}
          options={[
            {
              value: 1,
              label: "Studio",
            },
            {
              value: 2,
              label: "Photographer",
            },
            {
              value: 3,
              label: "Trang phục",
            },
            {
              value: 4,
              label: "Makeup",
            },
            {
              value: 5,
              label: "Thiết bị",
            },
            {
              value: 6,
              label: "Người mẫu",
            },
          ]}
        />
      ),
    },
    {
      label: "Tìm kiếm",
      name: "Name_like",
      style: {
        width: "20%",
        display: "inline-block",
        marginRight: "40px",
      },
      el: (
        <Input
          style={{ padding: "8px" }}
          prefix={<SearchOutlined />}
          placeholder="Tìm kiếm"
        />
      ),
    },
    {
      label: "Ngày đăng",
      name: "CreationTime",
      style: {
        width: "22%",
        display: "inline-block",
        marginRight: "40px",
      },
      el: (
        <RangePicker
          style={{ padding: "8px" }}
          //   value={dates || value}
          //   disabledDate={disabledDate}
          //   onCalendarChange={(val) => setDates(val)}
          //   onChange={(val) => setValue(val)}
        />
      ),
    },
    {
      label: "Cập nhật gần đây nhất",
      name: "LastModificationTime",
      style: {
        width: "22%",
        display: "inline-block",
        marginRight: "40px",
      },
      el: (
        <RangePicker
          style={{ padding: "8px" }}
          //   value={dates || value}
          //   disabledDate={disabledDate}
          //   onCalendarChange={(val) => setDates(val)}
          //   onChange={(val) => setValue(val)}
        />
      ),
    },
    {
      label: "Trạng thái",
      name: "IsVisible",
      style: {
        width: "22%",
        display: "inline-block",
        marginRight: "40px",
      },
      el: (
        <Select
          defaultValue="Tất cả"
          size="large"
          style={{
            width: 120,
          }}
          options={[
            {
              value: "",
              label: "Tất cả",
            },
            {
              value: false,
              label: "Đóng / Không thể đặt",
            },
            {
              value: true,
              label: "Mở/ Có thể đặt",
            },
          ]}
        />
      ),
    },
  ];
  const onChangePagination = (page) => {
    getAllPost(page, 10, filter);
  };
  const onChangeFilter = (value) => {
    setFilter({ ...filter, ...value });

    if (Object.keys(value)[0] === "LastModificationTime") {
      let obj = value.LastModificationTime?.reduce((acc, item, index) => {
        const key = index === 0 ? "startDate" : "endDate";
        return {
          ...acc,
          [key]: moment(new Date(item.$d)).utc().format("YYYY-MM-DD HH:mm"),
        };
      }, {});
      if (!obj) {
        setFilter({
          ...filter,
          LastModificationTime: {
            startDate: "",
            endDate: "",
          },
        });
      } else {
        setFilter({ ...filter, LastModificationTime: obj });
      }
    }
    if (Object.keys(value)[0] === "CreationTime") {
      let obj = value.CreationTime?.reduce((acc, item, index) => {
        const key = index === 0 ? "startDate" : "endDate";
        return {
          ...acc,
          [key]: moment(new Date(item.$d)).utc().format("YYYY-MM-DD HH:mm"),
        };
        // moment(new Date(item.$d)).utc().format("YYYY-MM-DD HH:mm")
      }, {});
      if (!obj) {
        setFilter({
          ...filter,
          CreationTime: {
            startDate: "",
            endDate: "",
          },
        });
      } else {
        setFilter({ ...filter, CreationTime: obj });
      }
    }
  };
  // if (loading) return <Loading />;
  return (
    <div className="AdminLayout">
      <Header />
      <div style={{ display: "flex" }}>
        <LeftNavBar />
        <div className="right">
          <div className="papper">
            <>
              <header className="manage-order__header chile">
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
                  <Row gutter={[16, 16]}>
                    {/* <Form.Item> */}
                    {expandHeader
                      ? formItem.map((item, idx) => (
                          <Col span={6}>
                            <Form.Item
                              key={idx}
                              name={item.name}
                              label={item.label}
                              // style={item.style}
                            >
                              {item.el}
                            </Form.Item>
                          </Col>
                        ))
                      : formItem.slice(0, 4).map((item, idx) => (
                          <Col span={6}>
                            <Form.Item
                              key={idx}
                              name={item.name}
                              label={item.label}
                              // style={item.style}
                            >
                              {item.el}
                            </Form.Item>
                          </Col>
                        ))}
                    {/* </Form.Item> */}
                  </Row>
                  {!expandHeader ? (
                    <p
                      style={{ float: "right", marginTop: "1rem" }}
                      onClick={() => setExpandHeader(!expandHeader)}>
                      xem thêm
                    </p>
                  ) : (
                    <p
                      style={{ float: "right", marginTop: "1rem" }}
                      onClick={() => setExpandHeader(!expandHeader)}>
                      thu gọn
                    </p>
                  )}
                </Form>
              </header>

              <Divider />
              <main
                className="manage-order__table chile"
                style={{ paddingBottom: "20px" }}>
                <Table
                  columns={column}
                  dataSource={dataTale}
                  pagination={false}
                />
                <Pagination
                  style={{ textAlign: "right" }}
                  current={pagination?.currentPage}
                  // defaultCurrent={1}
                  total={pagination?.total}
                  pageSize={pagination?.limit * 1}
                  onChange={onChangePagination}
                  showSizeChanger={false}
                />
              </main>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};
