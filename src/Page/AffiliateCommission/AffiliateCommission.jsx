import {
  AutoComplete,
  Button,
  DatePicker,
  Divider,
  Input,
  Modal,
  Select,
  Table,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { openNotification } from "../../../utils/Notification";
import { affiliateService } from "../../services/AffiliateService";
import "./AffiliateCommission.scss";
const { RangePicker } = DatePicker;
const { Search } = Input;

const timeDate = [
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

const AffiliateCommission = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [picker, setPicker] = useState();
  const [date, setDate] = useState({});
  const [dataTable, setDataTable] = useState([]);
  const [filter, setFilter] = useState({ oid: "", pid: "" });
  const [optionFilter, setOptionFilter] = useState(1);
  const [currentOption, setCurrentOption] = useState(1);

  useEffect(() => {
    if (currentOption !== 8) {
      (async () => {
        try {
          const { data } = await affiliateService.getAllCommistionsPublisher(
            filter.oid,
            filter.pid,
            currentOption
          );
          setDataTable(data.orders);
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
            const { data } = await affiliateService.getAllCommistionsPublisher(
              filter.oid,
              filter.pid,
              currentOption,
              dateTime
            );
            setDataTable(data.orders);
          } catch (error) {
            console.log("🚀 ~ error:", error);
            openNotification("error", "Vui lòng thử lại sau !!!");
          }
        })();
      }
    }
  }, [currentOption, filter, date]);

  const handleOk = () => {
    setDate({ ...date, picker });
    setOpen(false);
  };
  const onChange = (value, dateString) => {
    setPicker(dateString);
  };
  const onChangeDate = (key) => {
    setCurrentOption(key);
    if (key === 8) {
      setOpen(true);
    }
  };
  const onSearch = async (value) => {};
  const optionSelect = [
    {
      label: "Tìm theo mã đơn đặt",
      value: "1",
    },
    {
      label: "Tìm theo mã bài đăng",
      value: "2",
    },
  ];
  const columns = [
    {
      title: "ID publisher",
      dataIndex: "affiliateId",
      key: "affiliateId",
      render: (_, record) => (
        <p style={{ color: "#5D5FEF" }}>{record.AffiliateUserId}</p>
      ),
    },
    {
      title: "ID đơn đặt",
      dataIndex: "Id",
      key: "Id",
      render: (_, record) => <p style={{ color: "#03AC84" }}>{_}</p>,
    },
    {
      title: "ID bài đăng",
      dataIndex: "postId",
      key: "postId",
      render: (_, record) => (
        <p>
          {record?.StudioRoom?.StudioPost?.id ||
            record?.PhotographerServicePackage?.PhotographerPost?.Id ||
            record?.MakeupServicePackage?.MakeupPost?.Id ||
            record?.ModelServicePackage?.ModelPost?.Id}
        </p>
      ),
    },

    {
      title: "Ngày đặt",
      dataIndex: "CreationTime",
      key: "CreationTime",
      sorter: {
        compare: (a, b) => moment(a?.CreationTime) - moment(b?.CreationTime),
        multiple: 0,
      },
      render: (_, record) => (
        <p>{moment(record?.CreationTime).format("DD-MM-YYYY HH:mm")}</p>
      ),
    },
    {
      title: "Giá trị đơn đặt",
      dataIndex: "BookingValueBeforeDiscount",
      key: "BookingValueBeforeDiscount",
      sorter: {
        compare: (a, b) =>
          a?.BookingValueBeforeDiscount - b?.BookingValueBeforeDiscount,
        multiple: 1,
      },
      render: (_, record) => (
        <p>
          {record?.BookingValueBeforeDiscount?.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          }) || 0}
        </p>
      ),
    },
    {
      title: "%Hoa hồng",
      dataIndex: "percentCommision",
      key: "percentCommision",
      sorter: {
        compare: (a, b) => a?.percentCommision - b?.percentCommision,
        multiple: 1,
      },
    },
    {
      title: "Hoa hồng",
      dataIndex: "commission",
      key: "commission",
      sorter: {
        compare: (a, b) => a?.AffiliateCommission - b?.AffiliateCommission,
        multiple: 1,
      },
      render: (_, record) => (
        <p>
          {record?.AffiliateCommission?.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          }) || 0}
        </p>
      ),
    },
  ];
  const optionSearchHandler = (e) => {
    setOptionFilter(e);
  };
  const searchFilterHandler = (e) => {
    switch (Number(optionFilter)) {
      case 1:
        setFilter({ oid: e.target.value, pid: "" });
        break;
      case 2:
        setFilter({ oid: "", pid: e.target.value });
        break;
    }
  };
  return (
    <div className="AffiliateCommission">
      <div className="chile" style={{ padding: "20px" }}>
        <div className="heading">
          <h3>QUẢN LÝ HOA HỒNG</h3>
          <div className="heading__right">
            <Select
              size="large"
              defaultValue={1}
              style={{ width: 200, marginRight: "20px" }}
              onChange={onChangeDate}
            >
              {timeDate.map((item) => (
                <Option key={item.label} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
            {/* <Search
              size="large"
              placeholder="Tìm theo tên hoặc số điện thoại"
              onSearch={onSearch}
              style={{ width: 300 }}
            /> */}
            <Input.Group compact style={{ display: "flex" }}>
              <Select
                defaultValue={"1"}
                size="large"
                onChange={optionSearchHandler}
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
                onChange={searchFilterHandler}
                placeholder="Tìm theo mã đơn đặt"
              />
            </Input.Group>
          </div>
        </div>
      </div>
      <Divider />

      <div className="chile">
        <Table dataSource={dataTable} columns={columns} />
      </div>

      <ModalTime
        open={open}
        handleOk={handleOk}
        setOpen={setOpen}
        onChange={onChange}
      />
    </div>
  );
};

export default AffiliateCommission;

function ModalTime({ open, handleOk, setOpen, onChange }) {
  return (
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
        <RangePicker onChange={onChange} format="DD/MM/YYYY" />
      </div>
    </Modal>
  );
}
