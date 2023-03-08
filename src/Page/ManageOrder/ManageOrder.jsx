import { EditOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Pagination,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { convertTimeUTC } from "../../../utils/convert";
import { Loading } from "../../Components/Loading";
import { orderService } from "../../services/OrderService";
import "./manageOrder.scss";
const { RangePicker } = DatePicker;

export const ManageOrder = () => {
  const [dates, setDates] = useState(null);
  const [value, setValue] = useState(null);
  const [expandHeader, setExpandHeader] = useState(false);
  const [dataTale, setDataTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState();
  const [filter, setFilter] = useState({
    BookingStatus: "",
    EntryDate: {
      startDate: "",
      endDate: "",
    },
    Identify_like: "",
    PaymentTypeOnline: "",
    category: "1",
    PaymentStatus: "",
  });
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
    getAllPartner(page, 10, filter);
  };
  // Define Table Column ********************************
  const column = [
    {
      title: "Mã đơn đặt",
      dataIndex: "IdentifyCode",
      render: (value) => <strong>{value}</strong>,
    },
    {
      title: "Số định danh",
      dataIndex: "BookingUserId",
      render: (_) => {
        return <p>{`CUS-${("0000000000" + _).slice(-10)}`}</p>;
      },
    },
    {
      title: "Mã bài đăng",
      dataIndex: "postId",
      render: (_, value) => {
        return <p>{value?.StudioRoom?.StudioPostId}</p>;
      },
    },
    {
      title: "affiliate ID ",
      dataIndex: "AffiliateUserId",
      render: (_) => {
        return <p>{_ !== null ? _ : "Không"}</p>;
      },
    },
    {
      title: "Ngày Thực hiện",
      // dataIndex: "CreationTime",
      render: (item) => {
        const date = item.OrderByDateFrom ?? item.OrderByTimeFrom;
        return item.OrderByTime
          ? `${convertTimeUTC(item.OrderByTimeFrom, true)}  `
          : `${convertTimeUTC(item.OrderByDateFrom)}  `;
      },
    },
    {
      title: "Hình thức thanh toán",
      dataIndex: "PaymentTypeOnline",
      render: (value) => {
        return value ? (
          <Tag color={"green"}>{"Online".toUpperCase()}</Tag>
        ) : (
          <Tag color={"red"}>{"Offline".toUpperCase()}</Tag>
        );
      },
    },
    {
      title: "Trạng thái thanh toán",
      dataIndex: "PaymentStatus",
      render: (value) => {
        switch (value) {
          case 1:
            return <p>Chờ thanh toán</p>;
          case 2:
            return <p>Đã cọc</p>;
          case 3:
            return <Tag color={"green"}>{"Đã thanh toán".toUpperCase()}</Tag>;
          case 4:
            return <p>Null</p>;
        }
      },
    },
    {
      title: "Trạng thái đơn đặt",
      dataIndex: "BookingStatus",
      render: (value) => {
        switch (value) {
          case 1:
            return <Tag color={"green"}>{"Đã hoàn thành".toUpperCase()}</Tag>;
          case 2:
            return <Tag color={"red"}>{"Đã huý".toUpperCase()}</Tag>;
          case 3:
            return <p>Vắng mặt</p>;
          case 4:
            return <p>Chờ thực hiện</p>;
        }
      },
    },
    {
      title: "Action",
      render: (item) => {
        return (
          <Space size="middle">
            <Button
              onClick={() =>
                navigate(`${item.id}`, { state: { category: filter.category } })
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
  // *****************************************************

  const onFinish = () => {};

  // ****Date select******
  const disabledDate = (current) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], "days") > 7;
    const tooEarly = dates[1] && dates[1].diff(current, "days") > 7;
    return !!tooEarly || !!tooLate;
  };

  const onChangeFilter = (value) => {
    setFilter({ ...filter, ...value });
    if (Object.keys(value)[0] === "EntryDate") {
      const obj = value?.EntryDate?.reduce((acc, item, index) => {
        const key = index === 0 ? "startDate" : "endDate";
        return { ...acc, [key]: moment(item.$d).format() };
      }, {});
      if (!obj) {
        setFilter({
          ...filter,
          EntryDate: {
            startDate: "",
            endDate: "",
          },
        });
      } else {
        setFilter({ ...filter, EntryDate: obj });
      }
      // setFilter({ ...filter, EntryDate: obj });
    }
  };
  // *********************

  // Form item render ************************
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
          defaultValue="1"
          size="large"
          style={{
            width: 120,
          }}
          options={[
            {
              value: "1",
              label: "Studio",
            },
            {
              value: "2",
              label: "Photographer",
            },
            {
              value: "3",
              label: "Trang phục",
            },
            {
              value: "4",
              label: "Makeup",
            },
            {
              value: "5",
              label: "Thiết bị",
            },
            {
              value: "6",
              label: "Người mẫu",
            },
          ]}
        />
      ),
    },
    {
      label: "Tìm kiếm",
      name: "Identify_like",
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
      label: "Ngày thực hiện",
      name: "EntryDate",
      style: {
        width: "22%",
        display: "inline-block",
        marginRight: "40px",
      },
      el: (
        <RangePicker
          format="DD/MM/YYYY"
          style={{ padding: "8px" }}
          value={dates || value}
          onCalendarChange={(val) => setDates(val)}
          onChange={(val) => setValue(val)}
        />
      ),
    },
    {
      label: "Hình thức thanh toán",
      name: "PaymentTypeOnline",
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
              value: "1",
              label: "Online",
            },
            {
              value: "0",
              label: "Offline",
            },
          ]}
        />
      ),
    },
    {
      label: "Trạng thái thanh toán",
      name: "PaymentStatus",
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
              value: "1",
              label: "Chờ thanh toán",
            },
            {
              value: "2",
              label: "Đã cọc",
            },
            {
              value: "3",
              label: "Đã thanh toán",
            },
            {
              value: "4",
              label: "Null",
            },
          ]}
        />
      ),
    },
    {
      label: "Trạng thái đơn đặt",
      name: "BookingStatus",
      style: {
        width: "20%",
        display: "inline-block",
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
              value: "1",
              label: "Đã hoàn thành",
            },
            {
              value: "2",
              label: "Đã hủy",
            },
            {
              value: "3",
              label: "Đã vắng mặt",
            },
            {
              value: "4",
              label: "Chờ thực hiện",
            },
          ]}
        />
      ),
    },
  ];
  // *****************************************
  if (loading) return <Loading />;
  return (
    <section className="manage-order">
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
          autoComplete="off"
        >
          <Row gutter={[16, 16]}>
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
          </Row>
          {!expandHeader ? (
            <p
              style={{ float: "right", marginTop: "1rem" }}
              onClick={() => setExpandHeader(!expandHeader)}
            >
              xem thêm
            </p>
          ) : (
            <p
              style={{ float: "right", marginTop: "1rem" }}
              onClick={() => setExpandHeader(!expandHeader)}
            >
              thu gọn
            </p>
          )}
        </Form>
      </header>

      <Divider />
      <main
        className="manage-order__table chile"
        style={{ paddingBottom: "20px" }}
      >
        <Table columns={column} dataSource={dataTale} pagination={false} />
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
    </section>
  );
};
