import {
  EditOutlined,
  EyeOutlined,
  LeftOutlined,
  MoreOutlined,
  RightOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Pagination,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./manageOrder.scss";
import moment from "moment";
import { orderService } from "../../services/OrderService";
import { Loading } from "../../Components/Loading";
const { RangePicker } = DatePicker;

export const ManageOrder = () => {
  const [dates, setDates] = useState(null);
  const [value, setValue] = useState(null);
  const [expandHeader, setExpandHeader] = useState(false);
  const [dataTale, setDataTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openMore, setOpenMore] = useState(null);
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
      dataIndex: "id",
      render: (value) => <strong>{value}</strong>,
    },
    {
      title: "Số định danh",
      dataIndex: "IdentifyCode",
    },
    {
      title: "Mã bài đăng",
      dataIndex: "postId",
    },
    {
      title: "Ngày Thực hiện",
      dataIndex: "CreationTime",
      render: (item) => moment(item).format("DD-MM-YYYY HH:mm"),
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
    console.log(value);
    setFilter({ ...filter, ...value });
    if (Object.keys(value)[0] === "EntryDate") {
      const obj = value.EntryDate.reduce((acc, item, index) => {
        const key = index === 0 ? "startDate" : "endDate";
        return { ...acc, [key]: moment(item.$d).format() };
      }, {});
      setFilter({ ...filter, EntryDate: obj });
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
          style={{ padding: "8px" }}
          value={dates || value}
          disabledDate={disabledDate}
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
        {expandHeader && (
          <LeftOutlined
            size="large"
            onClick={() => setExpandHeader(!expandHeader)}
            style={{
              color: "#03AC84",
              margin: "25px 16px 0 0",
              fontSize: "20px",
            }}
          />
        )}
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
          <Form.Item>
            {expandHeader
              ? formItem.slice(2, 6).map((item, idx) => (
                  <Form.Item
                    key={idx}
                    name={item.name}
                    label={item.label}
                    style={item.style}>
                    {item.el}
                  </Form.Item>
                ))
              : formItem.slice(0, 4).map((item, idx) => (
                  <Form.Item
                    key={idx}
                    name={item.name}
                    label={item.label}
                    style={item.style}>
                    {item.el}
                  </Form.Item>
                ))}
          </Form.Item>
        </Form>
        {!expandHeader && (
          <RightOutlined
            onClick={() => setExpandHeader(!expandHeader)}
            style={{
              color: "#03AC84",
              margin: "25px 16px 0 0",
              fontSize: "20px",
            }}
          />
        )}
      </header>
      <Divider />
      <main
        className="manage-order__table chile"
        style={{ paddingBottom: "20px" }}>
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
