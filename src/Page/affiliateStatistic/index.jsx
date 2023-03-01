import {
  ExclamationCircleOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Image,
  Input,
  message,
  Modal,
  Row,
  Select,
  Table,
} from "antd";
import _ from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { convertPrice } from "../../../utils/convert";
import { openNotification } from "../../../utils/Notification";
import MouseIcon from "../../assets/images/mouseIcon";
import OrderIcon from "../../assets/images/order";
import RoseIcon from "../../assets/images/rose";
import ValueOrderIcon from "../../assets/images/valueOrder";
import LineChartComponent from "../../Components/recharts/LineChartComponent";
import { affiliateService } from "../../services/AffiliateService";
import classes from "./statistic.module.scss";

const { RangePicker } = DatePicker;

const { Option } = Select;
const optionSelect = [
  {
    label: "Tìm theo ID publisher",
    value: "1",
  },
  {
    label: "Tìm theo ID đơn đặt",
    value: "2",
  },
  {
    label: "Tìm theo ID bài đăng",
    value: "3",
  },
  {
    label: "Tìm theo tên dịch vụ/sản phẩm",
    value: "4",
  },
];

export const AffiliateStatistic = () => {
  const [date, setDate] = useState({});
  const [dataTable, setDataTable] = useState([]);
  const [open, setOpen] = useState(false);
  const [picker, setPicker] = useState();
  const [currentOption, setCurrentOption] = useState(1);
  const [statistic, setStatistic] = useState();
  const [total, setTotal] = useState({
    Booking: 0,
    BookingValue: 0,
    Click: 0,
    Commission: 0,
  });
  const [messageApi, contextHolder] = message.useMessage();

  const [active, setActive] = useState({
    id: 1,
    icon: <OrderIcon active={true} />,
    label: "Số đơn đặt",
  });
  const list = [
    {
      id: 1,
      icon: <OrderIcon active={active.id === 1} />,
      label: "Số đơn đặt",
      value: "Booking",
    },
    {
      id: 2,
      icon: <ValueOrderIcon active={active.id === 2} />,
      label: "Giá trị đơn đặt",
      value: "BookingValue",
    },
    {
      id: 3,
      icon: <MouseIcon active={active.id === 3} />,
      label: "Số lượt click",
      value: "Click",
    },
    {
      id: 4,
      icon: <RoseIcon active={active.id === 4} />,
      label: "Hoa hồng",
      value: "Commission",
    },
  ];
  const items = [
    {
      value: 1,
      label: "7 ngày trước",
    },
    {
      value: 2,
      label: "30 ngày trước",
    },
    {
      value: 3,
      label: "Tháng này",
    },
    {
      value: 4,
      label: "Tháng trước",
    },
    {
      value: 5,
      label: "Quý này",
    },
    {
      value: 6,
      label: "Quý trước",
    },
    {
      value: 7,
      label: "Năm nay",
    },
    {
      value: 8,
      label: "Chọn ngày cụ thể",
    },
  ];
  const columns = [
    {
      title: "ID dịch vụ/sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (i, d) => {
        return (
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <Image
              // src={IMG(d.Image)}
              style={{ width: "66px", height: "42px" }}
              alt="aa"
            />
            <p>{d.name}</p>
          </div>
        );
      },
    },
    {
      title: "Tên dịch vụ/sản phẩm ",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Giá",
      dataIndex: "category",
      key: "category",
      // render: (i, d) => handlerNameCategory(d.category),
    },
    {
      // title: columnHandler(active),
      title: "% Hoa hồng",
      key: "totalOrder",
      dataIndex: "totalOrder",
      // render: (i, d) => columnValueHandler(active, d),
    },
    {
      title: "Đơn đặt",
      key: "action",
      render: (i, _) => {
        return (
          <div style={{ display: "flex", gap: "1rem" }}>
            <Link
              href={`/manager/statistic/${_.id}?category=${_.category}`}
              // onClick={() => {
              //   router.push({
              //     pathname: "/manager/statistic/[id]",
              //     query: { id: _.action },
              //   });
              // }}
            >
              <EyeOutlined style={{ cursor: "pointer" }} />
            </Link>
            {/* <CopyToClipboard
              text={`https://bookingstudio.vn/home/${handlerNameCategory(
                _.category
              )}/${_.id}`}
              onCopy={() => success()}
            >
              <LinkOutlined style={{ cursor: "pointer" }} />
            </CopyToClipboard> */}
          </div>
        );
      },
    },
  ];
  ///Duy
  const onChange = (key) => {
    setCurrentOption(key);
    if (key === 8) {
      setOpen(true);
    }
  };
  const onChangeDate = (value, dateString) => {
    setPicker(dateString);
  };
  const handleOk = () => {
    setDate({ ...date, picker });
    setOpen(false);
  };
  const setDataValueMap = (data) => {
    const groupedData = _.groupBy(data.data, "Date");

    data = _.map(groupedData, (group) => {
      return _.reduce(
        group,
        (acc, obj) => {
          acc.Booking += obj.Booking;
          acc.BookingValue += obj.BookingValue;
          acc.Click += obj.Click;
          acc.Commission += obj.Commission;
          return acc;
        },
        {
          Date: group[0].Date,
          Booking: 0,
          BookingValue: 0,
          Click: 0,
          Commission: 0,
        }
      );
    });
    setStatistic(
      data.map((val) => {
        return {
          "Số đơn đặt": val.Booking,
          "Giá trị đơn đặt": val.BookingValue,
          "Số lượt click": val.Click,
          "Hoa hồng": val.Commission,
          Date: val.Date,
        };
      })
    );
    setTotal({
      Booking: _.sumBy(data, "Booking"),
      BookingValue: _.sumBy(data, "BookingValue"),
      Click: _.sumBy(data, "Click"),
      Commission: _.sumBy(data, "Commission"),
    });
  };

  useEffect(() => {
    if (currentOption !== 8) {
      (async () => {
        try {
          const { data } = await affiliateService.statisticDataAdmin(
            currentOption
          );
          setDataValueMap(data);
        } catch (error) {
          openNotification("error", "Vui lòng thử lại sau !!!");
        }
      })();
    } else {
      if (date.picker) {
        (async () => {
          try {
            let dateTime = {
              startDate: moment(date.picker[0]).toISOString(),
              endDate: moment(date.picker[1]).toISOString(),
            };
            dateTime = JSON.stringify(dateTime);
            const { data } = await affiliateService.statisticData(
              currentOption,
              dateTime
            );
            setDataValueMap(data);
          } catch (error) {
            console.log("🚀 ~ error:", error);
            openNotification("error", "Vui lòng thử lại sau !!!");
          }
        })();
      }
    }
  }, [currentOption, date]);

  return (
    <div>
      <div className={classes.statistic}>
        <div className={`${classes.top} ${classes.content}`}>
          <div className={classes.title}>
            <h1>Thống kê</h1>
            <div>
              <Select
                defaultValue={1}
                style={{ width: "10rem" }}
                onChange={onChange}>
                {items.map((item) => (
                  <Option key={item.label} value={item.value}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
        </div>

        <div className={classes.content} style={{ background: "#fff" }}>
          <Row gutter={[32, 32]}>
            {list.map((item, idx) => {
              return (
                <Col md={6} sm={12} xs={24} key={idx}>
                  <div
                    onClick={() => setActive(item)}
                    className={`${classes.boxItem} ${
                      active.id === item.id && classes.active
                    } `}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: ".5rem",
                      }}
                      className={classes.itemTop}>
                      <div className={`${classes.icon}`}>{item.icon}</div>
                      <span
                        className={classes.text}
                        style={{ fontSize: "1.2rem" }}>
                        {item.label}
                      </span>
                      <ExclamationCircleOutlined />
                    </div>
                    <span className={classes.text} style={{ fontSize: "2rem" }}>
                      {convertPrice(total[item.value])}
                    </span>
                  </div>
                </Col>
              );
            })}
          </Row>
          <LineChartComponent data={statistic} y1="Date" x1={active.label} />
        </div>
        <div className={classes.content} style={{ background: "#fff" }}>
          <div className={classes.table}>
            <div
              style={{
                paddingBottom: "1.5rem",
                display: "flex",
                flex: "1 1 ",
                alignItems: "start",
                width: "100%",
              }}>
              <div
                style={{
                  // paddingBottom: "1.5rem",
                  display: "flex",
                  // flex: "1 1 50%",
                  width: "60%",
                  flexDirection: "column",
                  gap: ".5rem",
                }}>
                <h3>TỔNG ĐƠN ĐẶT THEO TỪNG LOẠI DỊCH VỤ/SẢN PHẨM</h3>
                <p>(Tổng đơn đặt được tạo từ Affiliate Program)</p>
              </div>
              <Input.Group compact style={{ display: "flex", flex: "1" }}>
                <Select
                  defaultValue={"1"}
                  size="large"
                  // onChange={optionSearchHandler}
                  // style={{
                  //   width: "50%",
                  // }}
                >
                  {optionSelect.map((item, idx) => {
                    return (
                      <Option key={idx} value={item.value}>
                        {item.label}
                      </Option>
                    );
                  })}
                </Select>
                <Input
                  prefix={<SearchOutlined />}
                  placeholder="Tìm theo mã đơn đặt"
                  // onChange={searchFilterHandler}
                />
              </Input.Group>
            </div>
            <div>
              <Table
                columns={columns}
                dataSource={dataTable}
                total={100}
                showSizeChanger={true}
              />
            </div>
          </div>
        </div>
        <div className={classes.content} style={{ background: "#fff" }}>
          <div className={classes.table}>
            <div
              style={{
                paddingBottom: "1.5rem",
                display: "flex",
                flex: "1 1 ",
                alignItems: "start",
                width: "100%",
              }}>
              <div
                style={{
                  // paddingBottom: "1.5rem",
                  display: "flex",
                  // flex: "1 1 50%",
                  width: "60%",
                  flexDirection: "column",
                  gap: ".5rem",
                }}>
                <h3>TỔNG ĐƠN ĐẶT THEO TỪNG TÀI KHOẢN PUBLISHER</h3>
                <p>(Tổng đơn đặt được tạo từ Affiliate Program)</p>
              </div>
              <Input.Group compact style={{ display: "flex", flex: "1" }}>
                <Select
                  defaultValue={"1"}
                  size="large"
                  // onChange={optionSearchHandler}
                  // style={{
                  //   width: "50%",
                  // }}
                >
                  {optionSelect.map((item, idx) => {
                    return (
                      <Option key={idx} value={item.value}>
                        {item.label}
                      </Option>
                    );
                  })}
                </Select>
                <Input
                  prefix={<SearchOutlined />}
                  placeholder="Tìm theo mã đơn đặt"
                  // onChange={searchFilterHandler}
                />
              </Input.Group>
            </div>
            <div>
              <Table
                columns={columns}
                dataSource={dataTable}
                total={100}
                showSizeChanger={true}
              />
            </div>
          </div>
        </div>
        <Modal
          title="Chọn ngày cụ thể"
          open={open}
          onOk={handleOk}
          footer={[
            <Button key="back" onClick={handleOk}>
              OK
            </Button>,
          ]}
          onCancel={() => setOpen(false)}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px",
            }}>
            <RangePicker onChange={onChangeDate} />
          </div>
        </Modal>
      </div>
    </div>
  );
};
