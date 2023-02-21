import { EyeOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Space, Switch, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { affiliateService } from "../../services/AffiliateService";
import "./AffiliateAccount.scss";
const { Search } = Input;

const AffiliateAccount = () => {
  const [tableDate, setTableDate] = useState([]);
  const [onLoadingSwitch, setOnLoadingSwitch] = useState(false);
  const [selectList, setSelectList] = useState([]);
  const onSearch = async (value) => {
    try {
      setOnLoadingSwitch(true);
      const { data } = await affiliateService.all(value);
      setTableDate(data.map((val) => ({ ...val, key: val.id })));
    } catch (error) {
      console.log("🚀 ~ onSearch ~ error", error);
    }
    setOnLoadingSwitch(false);
  };
  const navigate = useNavigate();
  const onChangeCheck = async (data) => {
    try {
      setOnLoadingSwitch(true);
      await affiliateService.activate(data.id);
    } catch (error) {}
    setOnLoadingSwitch(false);
  };
  const onChangeCheckList = async () => {
    try {
      setOnLoadingSwitch(true);
      await Promise.all(
        selectList.map((val) => affiliateService.activate(val.id, "false"))
      );
    } catch (error) {}
    setOnLoadingSwitch(false);
  };
  const columns = [
    {
      title: "ID tài khoản",
      dataIndex: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên",
      dataIndex: "name",
      render: (_, record) => <p>{record.firstName + " " + record.lastName}</p>,
    },
    {
      title: "Loại tài khoản",
      dataIndex: "isPersonal",
      render: (_) =>
        _ ? (
          <Tag color="orange">Cá nhân</Tag>
        ) : (
          <Tag color="purple">Doanh nghiệp</Tag>
        ),
    },
    {
      title: "Kích hoạt",
      dataIndex: "isActivate",
      render: (_, record) => (
        <Switch
          disabled={onLoadingSwitch}
          checked={_}
          onChange={() => onChangeCheck(record)}
        />
      ),
    },
    {
      title: "Hành động",
      dataIndex: "id",
      render: (_, record) => (
        <Space size="middle">
          <Button
            shape="circle"
            icon={<EyeOutlined />}
            onClick={() => navigate(`/affiliate/manage/${_}`)}
          />
        </Space>
      ),
    },
  ];
  const rowSelection = {
    onChange: (_, selectedRows) => {
      setSelectList(selectedRows);
    },
  };
  useEffect(() => {
    if (!onLoadingSwitch) {
      (async () => {
        const { data } = await affiliateService.all();
        setTableDate(data.map((val) => ({ ...val, key: val.id })));
      })();
    }
  }, [onLoadingSwitch]);

  return (
    <div className="AffiliateAccount">
      <div className="chile" style={{ padding: "20px" }}>
        <div className="heading">
          <div className="title">QUẢN LÝ TÀI KHOẢN</div>
          <div className="heading__right">
            <Button
              onClick={onChangeCheckList}
              type="primary"
              icon={<LockOutlined />}
              size="large"
              style={{ marginRight: "20px" }}>
              Khoá tài khoản
            </Button>
            <Search
              size="large"
              placeholder="Tìm theo tên hoặc số điện thoại"
              onSearch={onSearch}
              style={{ width: 300 }}
            />
          </div>
        </div>
      </div>
      <Divider />
      <div className="chile">
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={columns}
          dataSource={tableDate}
        />
      </div>
    </div>
  );
};

export default AffiliateAccount;
