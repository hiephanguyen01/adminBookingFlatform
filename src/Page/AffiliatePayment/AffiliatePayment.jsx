import { Button, Select, Table, Tag, Switch, Input, Popconfirm } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";

import { convertPrice, generateYearOptions } from "../../../utils/convert";
import "./pay.scss";
import { DownloadOutlined } from "@ant-design/icons";
import { affiliatePaymentService } from "../../services/AffiliatePaymentService";
import { baseURL } from "../../../utils/baseURL";
const { Option } = Select;

const AffiliatePayment = () => {
  const years = generateYearOptions();
  const [dataSource, setDataSource] = useState([]);
  const [keySearch, setKeySearch] = useState("");
  const [onLoadingSwitch, setOnLoadingSwitch] = useState(false);
  const [optionFill, setOption] = useState(
    moment().subtract(1, "month").format("MM/YYYY")
  );
  const onChangeCheck = async (data) => {
    try {
      setOnLoadingSwitch(true);
      await affiliatePaymentService.paid(data.id);
    } catch (error) {}
    setOnLoadingSwitch(false);
  };
  const columns = [
    {
      title: "Mã ID Pulisher",
      dataIndex: "AffiliateUserId",
      key: "AffiliateUser",
    },
    {
      title: "Loại tài khoản",
      dataIndex: "id",
      key: "AffiliateUserId.isPersonal",
      render: (_, record) =>
        record.AffiliateUser.isPersonal ? (
          <Tag color="magenta">Cá nhân</Tag>
        ) : (
          <Tag color="blue">Doanh nghiệp</Tag>
        ),
    },
    {
      title: "Hoa hồng tích lũy chưa thanh toán  của kỳ trước chuyển sang",
      dataIndex: "unpaidLastPeriod",
      key: "unpaidLastPeriod",
      render: (item) => convertPrice(item),
    },
    {
      title: "Hoa hồng kỳ này (Đã bao gồm VAT)",
      dataIndex: "commissionThisPeriod",
      key: "commissionThisPeriod",
      render: (item) => convertPrice(item),
    },
    {
      title: "Hoa hồng chưa thanh toán tích lũy (Đã bao gồm VAT)",
      dataIndex: "accumulatedUnpaidCommissions",
      key: "accumulatedUnpaidCommissions",
      render: (item) => convertPrice(item),
    },
    {
      title: "Khấu trừ thuế TNCN",
      dataIndex: "TNCN",
      key: "TNCN",
      render: (item) => convertPrice(item),
    },
    {
      title: "Hoa hồng thanh toán trong kỳ",
      dataIndex: "commissionPaidThisPeriod",
      key: "commissionPaidThisPeriod",
      render: (item) => convertPrice(item),
    },
    {
      title: "Hoa hồng chưa thanh toán chuyển kỳ sau",
      dataIndex: "commissionNextPeriod",
      key: "commissionNextPeriod",
      render: (item) => convertPrice(item),
    },
    {
      title: "Hạn thanh toán",
      dataIndex: "payDate",
      key: "payDate",
      render: (item) => moment(item).format("DD/MM/YYYY"),
    },
    {
      title: "Trạng thái thanh toán",
      dataIndex: "payStatus",
      key: "payStatus",
      render: (_, record) => (
        <Popconfirm
          title="Xác nhận"
          description="Bạn có đồng ý thay đổi trạng thái?"
          onConfirm={() => onChangeCheck(record)}
          okText="Đồng ý"
          cancelText="Huỷ"
        >
          <Switch
            checkedChildren="rồi"
            unCheckedChildren="chưa"
            disabled={onLoadingSwitch}
            checked={_}
          />
        </Popconfirm>
      ),
    },
  ];
  const onDownload = async () => {
    await affiliatePaymentService.exportAll(optionFill);
  };

  useEffect(() => {
    if (!onLoadingSwitch) {
      (async () => {
        try {
          const { data } = await affiliatePaymentService.allAdmin(
            optionFill,
            keySearch
          );
          setDataSource(data);
        } catch (error) {
          console.log("🚀 ~ error:", error);
        }
      })();
    }
  }, [optionFill, onLoadingSwitch, keySearch]);
  return (
    <div className="pay">
      <div className="top">
        <div className="title">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h1>Thanh toán</h1>
            <Input
              block
              placeholder="Tìm theo ID"
              onChange={(e) => setKeySearch(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <p>Kỳ thanh toán:</p>
            <Select
              defaultValue={moment().subtract(1, "month").format("MM/YYYY")}
              style={{ width: 120 }}
              onChange={(value) => setOption(value)}
            >
              {years.map((year) => (
                <Option key={year} value={year}>
                  {year}
                </Option>
              ))}
            </Select>
            {dataSource.length !== 0 && (
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                onClick={onDownload}
                href={
                  baseURL +
                  `/api/affiliate-payment/admin-export?option=${optionFill}`
                }
              >
                Tải báo cáo
              </Button>
            )}
            {dataSource.length === 0 && (
              <Button
                type="primary"
                disabled={true}
                icon={<DownloadOutlined />}
              >
                Tải báo cáo
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="content">
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </div>
  );
};

export default AffiliatePayment;
