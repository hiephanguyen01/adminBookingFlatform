import { Form, Input, Select, DatePicker, Table } from "antd";
import "./manageOrder.scss";
import { useState } from "react";
import {
  SearchOutlined,
  MoreOutlined,
  RightOutlined,
  LeftOutlined,
  EyeOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { RangePicker } = DatePicker;

const DATA = [
  {
    key: 1,
    code: "8912871298",
    identityCode: "C2233445566",
    postId: "P0914481315S",
    startAt: "20/02/2022 15:00 - 18:39",
    paymentTypeOnline: 1,
    paymentStatus: 2,
    bookingStatus: 4,
  },
  {
    key: 2,
    code: "8912871298",
    identityCode: "C2233445566",
    postId: "P0914481315S",
    startAt: "20/02/2022 15:00 - 18:39",
    paymentTypeOnline: 0,
    paymentStatus: 4,
    bookingStatus: 1,
  },
  {
    key: 3,
    code: "8912871298",
    identityCode: "C2233445566",
    postId: "P0914481315S",
    startAt: "20/02/2022 15:00 - 18:39",
    paymentTypeOnline: 1,
    paymentStatus: 1,
    bookingStatus: 4,
  },
  {
    key: 4,
    code: "8912871298",
    identityCode: "C2233445566",
    postId: "P0914481315S",
    startAt: "20/02/2022 15:00 - 18:39",
    paymentTypeOnline: 1,
    paymentStatus: 3,
    bookingStatus: 3,
  },
];

const ManageOrder = () => {
  const [dates, setDates] = useState(null);
  const [value, setValue] = useState(null);
  const [expandHeader, setExpandHeader] = useState(false);
  const [openMore, setOpenMore] = useState(null);
  const navigate = useNavigate();

  // Define Table Column ********************************
  const column = [
    {
      title: "Mã đơn đặt",
      dataIndex: "code",
      render: (value) => <strong>{value}</strong>,
    },
    {
      title: "Số định danh",
      dataIndex: "identityCode",
    },
    {
      title: "Mã bài đăng",
      dataIndex: "postId",
    },
    {
      title: "Ngày thực hiện",
      dataIndex: "startAt",
    },
    {
      title: "Hình thức thanh toán",
      dataIndex: "paymentTypeOnline",
      render: (value) => {
        return value ? <p>Online</p> : <p>Offline</p>;
      },
    },
    {
      title: "Trạng thái thanh toán",
      dataIndex: "paymentStatus",
      render: (value) => {
        switch (value) {
          case 1:
            return <p>Chờ thanh toán</p>;
          case 2:
            return <p>Đã cọc</p>;
          case 3:
            return <p>Đã thanh toán</p>;
          case 4:
            return <p>Null</p>;
        }
      },
    },
    {
      title: "Trạng thái đơn đặt",
      dataIndex: "bookingStatus",
      render: (value) => {
        switch (value) {
          case 1:
            return <p>Đã hoàn thành</p>;
          case 2:
            return <p>Đã hủy</p>;
          case 3:
            return <p>Vắng mặt</p>;
          case 4:
            return <p>Chờ thực hiện</p>;
        }
      },
    },
    {
      title: "Thao tác",
      render: (value) => (
        <div className="more">
          <MoreOutlined
            onClick={() => setOpenMore(openMore ? null : value.key)}
            style={{ fontSize: "25px" }}
            className="more-logo"
          />
          {openMore && value.key === openMore && (
            <ul className="more-modal">
              <li onClick={() => navigate("observe")}>
                <EyeOutlined style={{ fontSize: "16px" }} />
                <p>Xem chi tiết</p>
              </li>
              <li onClick={() => navigate("modify")}>
                <EditOutlined style={{ fontSize: "16px" }} />
                <p>Chỉnh sửa</p>
              </li>
            </ul>
          )}
        </div>
      ),
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
  const onOpenChange = (open) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };
  //********************* */

  // ****Select box******
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const handleChange2 = (value) => {
    console.log(`selected ${value}`);
  };
  // *********************

  // Form item render ************************
  const formItem = [
    {
      label: "Tìm kiếm",
      name: "keystring",
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
      name: "",
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
          onOpenChange={onOpenChange}
        />
      ),
    },
    {
      label: "Hình thức thanh toán",
      name: "paymentType",
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
          onChange={handleChange2}
          options={[
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
      name: "paymentStatus",
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
          onChange={handleChange}
          options={[
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
      name: "bookingStatus",
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
          onChange={handleChange}
          options={[
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

  return (
    <section className="manage-order">
      <header className="manage-order__header">
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
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item>
            {expandHeader
              ? formItem.slice(1, 5).map((item, idx) => (
                  <Form.Item
                    key={idx}
                    name={item.name}
                    label={item.label}
                    style={item.style}
                  >
                    {item.el}
                  </Form.Item>
                ))
              : formItem.slice(0, 4).map((item, idx) => (
                  <Form.Item
                    key={idx}
                    name={item.name}
                    label={item.label}
                    style={item.style}
                  >
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
      <main className="manage-order__table">
        <Table columns={column} dataSource={DATA} />
      </main>
    </section>
  );
};

export default ManageOrder;
