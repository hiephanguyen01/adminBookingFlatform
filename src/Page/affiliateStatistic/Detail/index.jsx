import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Col,
  DatePicker,
  Image,
  Modal,
  Row,
  Select,
  Table,
  Tooltip,
} from "antd";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";

import { affiliateService } from "../../../services/AffiliateService";

import classes from "./statistic.module.scss";
import { useLocation, useNavigate, useParams, useRoutes } from "react-router-dom";
import { IMG } from "../../../../utils/baseURL";
import { converPriceVND, convertTimeUTC } from "../../../../utils/convert";
import { openNotification } from "../../../../utils/Notification";
const { RangePicker } = DatePicker;
const { Option } = Select;
const AffiliateStatisticDetail = ({}) => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState({});
  const [picker, setPicker] = useState();
  const [currentOption, setCurrentOption] = useState(1);
  const { id } = useParams();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
const navigate  = useNavigate()
  const [arrow, setArrow] = useState("Show");
  let text =
    "Tổng hoa hồng cho những đơn đặt hoàn tất từ các liên kết mà bạn chia sẻ";
  const mergedArrow = useMemo(() => {
    if (arrow === "Hide") {
      return false;
    }
    if (arrow === "Show") {
      return true;
    }
    return {
      pointAtCenter: true,
    };
  }, [arrow]);
  useEffect(() => {
    if (currentOption !== 8) {
      (async () => {
        try {
          const { data: dataDetail } = await affiliateService.statisticProductDetail(
            id,
            category,
            currentOption
          );
          setData({
            ...dataDetail,
            data: dataDetail.data.map((val) => ({ ...val, key: val.id })),
          });
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
            const { data: dataDetail } = await affiliateService.statisticProductDetail(
              router.query.id,
              router.query.category,
              currentOption,
              dateTime
            );
            setData({
              ...dataDetail,
              data: dataDetail.data.map((val) => ({ ...val, key: val.id })),
            });
          } catch (error) {
            openNotification("error", "Vui lòng thử lại sau !!!");
          }
        })();
      }
    }
  }, [currentOption, date, id]);
  const handleOk = () => {
    setDate({ ...date, picker });
    setOpen(false);
  };
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
  const onChange = (key) => {
    setCurrentOption(key);
    if (key === 8) {
      setOpen(true);
    }
  };

  const statusHandler = (bookingStatus, paymentStatus) => {
    bookingStatus = Number(bookingStatus);
    paymentStatus = Number(paymentStatus);
    if (bookingStatus === 4 && paymentStatus === 1) {
      return "Chờ thanh toán";
    } else if (
      bookingStatus === 4 &&
      [4, 3, 2].some((item) => item === paymentStatus)
    ) {
      return "Sắp tới";
    } else if (
      bookingStatus === 1 &&
      [4, 3, 2].some((item) => item === paymentStatus)
    ) {
      return "Đã hoàn tất";
    } else if (bookingStatus === 2) {
      return "Đã huỷ";
    }
  };
  const onChangeDate = (value, dateString) => {
    setPicker(dateString);
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Mã đơn đặt ",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Chi tiết dịch vụ/sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (i, d) => {
        return (
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <Image
              src={IMG(
                d?.StudioRoom?.Image1 || d?.PhotographerServicePackage?.Image1
              )}
              alt="tesst"
              style={{ width: "66px", height: "42px" }}
              width="66"
              height={"42"}
            />
            <p>{d?.StudioRoom?.Name || d?.PhotographerServicePackage?.Name}</p>
          </div>
        );
      },
    },
    {
      title: "Ngày đặt đơn",
      key: "name",
      dataIndex: "name",
      render: (i, d) => {
        return <p> {moment(d.CreationTime).format("DD/MM/YYYY HH:mm")}</p>;
      },
    },
    {
      title: "Trạng thái",
      key: "name",
      dataIndex: "name",
      render: (i, d) => {
        return <p>{statusHandler(d.BookingStatus, d.PaymentStatus)}</p>;
      },
    },
    {
      title: "Thời gian thực hiện",
      key: "name",
      dataIndex: "name",
      render: (i, d) => {
        return (
          <p>
            {d.OrderByTime ? (
              <p>
                {convertTimeUTC(d.OrderByTimeFrom, true)} -{" "}
                {convertTimeUTC(d.OrderByTimeTo, true)}
              </p>
            ) : (
              <>
                {convertTimeUTC(d.OrderByDateFrom)} -{" "}
                {convertTimeUTC(d.OrderByDateTo)}{" "}
              </>
            )}
          </p>
          // {moment(d.OrderByTimeFrom || d.OrderByDateFrom).format(
          //   "DD/MM/YYYY HH:mm"
          // )}{" "}
          // -{" "}
          // {moment(d.OrderByTimeTo || d.OrderByDateTo).format(
          //   "DD/MM/YYYY HH:mm"
          // )}
        );
      },
    },
    {
      title: "Giá trị đơn đặt(VND)",
      key: "action",
      dataIndex: "action",
      render: (i, d) => {
        return <p>{converPriceVND(d.BookingValue)}</p>;
      },
    },
    {
      title: "Hoa hồng(VND)",
      key: "action",
      dataIndex: "action",
      render: (i, d) => {
        return <p>{converPriceVND(d.AffiliateCommission)}</p>;
      },
    },
  ];
  return (
    <div className={classes.detail}>
      <div className={classes.top}>
        <div className={classes.title}>
          <div>
            <Breadcrumb>
              <Breadcrumb.Item
                onClick={() => {
                    navigate(-1)
                }}
              >
                <a>Tổng đơn đặt theo từng loại dịch vụ</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item style={{ color: "#03AC84" }}>
                Xem chi tiết
              </Breadcrumb.Item>
            </Breadcrumb>{" "}
          </div>
          <div>
            <Select
              defaultValue={1}
              style={{ width: "10rem" }}
              onChange={onChange}
            >
              {items.map((item) => (
                <Option key={item.label} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </div>
      <h3 className={classes.title}>
        CHI TIẾT SỐ ĐƠN ĐẶT THEO TỪNG LOẠI DỊCH VỤ/SẢN PHẨM
      </h3>
      <div>
        <Row>
          <Col span={12}>
            <div className={classes.infoOder}>
              <div className={classes.itemInfo}>
                <Row gutter={32}>
                  <Col span={8}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span className={classes.label}>
                        Tên dịch vụ/sản phẩm
                      </span>
                      <span>:</span>
                    </div>
                  </Col>
                  <Col span={16}>
                    <span className={classes.value}>{data.info?.Name}</span>
                  </Col>
                </Row>
              </div>
              <div className={classes.itemInfo}>
                <Row gutter={32}>
                  <Col span={8}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span className={classes.label}>ID</span>
                      <span>:</span>
                    </div>
                  </Col>
                  <Col span={16}>
                    <span className={classes.value}>{data?.info?.id}</span>
                  </Col>
                </Row>
              </div>
              <div className={classes.itemInfo}>
                <Row gutter={32}>
                  <Col span={8}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span className={classes.label}>Tên đối tác</span>
                      <span>:</span>
                    </div>
                  </Col>
                  <Col span={16}>
                    <span className={classes.value}>
                      {data.info?.RegisterPartner?.PartnerName}
                    </span>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div className={classes.infoOder}>
              <div className={classes.itemInfo}>
                <Row gutter={32}>
                  <Col span={8}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span className={classes.label}>Phân loại</span>
                      <span>:</span>
                    </div>
                  </Col>
                  <Col span={16}>
                    <span className={classes.value}>{data.info?.category}</span>
                  </Col>
                </Row>
              </div>
              <div className={classes.itemInfo}>
                <Row gutter={32}>
                  <Col span={8}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: ".4rem",
                          alignItems: "center",
                        }}
                      >
                        <span className={classes.label}>Tổng số đơn đặt</span>
                        <Tooltip
                          placement="bottom"
                          title={text}
                          arrow={mergedArrow}
                        >
                          <ExclamationCircleOutlined />
                        </Tooltip>
                      </div>
                      <span>:</span>
                    </div>
                  </Col>
                  <Col span={16}>
                    <span className={`${classes.value} ${classes.number}`}>
                      {data?.data?.length}
                    </span>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div style={{ marginTop: "1.5rem" }}>
        <Table
          columns={columns}
          dataSource={data.data}
          total={100}
          showSizeChanger={true}
        />
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
        onCancel={() => setOpen(false)}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <RangePicker onChange={onChangeDate} />
        </div>
      </Modal>
    </div>
  );
};

export default AffiliateStatisticDetail;

// export async function getServerSideProps(context) {
//   const { params, query } = context;

//   const statisticId = params.id;
//   const { data } = await affiliateService.statisticDetail(
//     statisticId,
//     query.category
//   );

//   if (!data) {
//     return {
//       notFound: true,
//     };
//   }
//   return {
//     props: {
//       data: data,
//     },
//   };
// }
