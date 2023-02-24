import { EyeOutlined, LockOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Input,
  Select,
  Space,
  Switch,
  Table,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { affiliateService } from "../../services/AffiliateService";
import "./AffiliateAccount.scss";
const { Search } = Input;
const { Option } = Select;

const AffiliateAccount = () => {
  const [tableDate, setTableDate] = useState([]);
  const [onLoadingSwitch, setOnLoadingSwitch] = useState(false);
  const [selectList, setSelectList] = useState([]);
  const [searchParams, setSearchParams] = useState({
    keyString: "",
    isActivate: "",
  });
  const onSearch = async (value) => {
    setSearchParams({ ...searchParams, keyString: value });
  };
  const onChange = (value) => {
    setSearchParams({ ...searchParams, isActivate: value });
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
      sorter: {
        compare: (a, b) => a.isActivate - b.isActivate,
        multiple: 1,
      },
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
        const { data } = await affiliateService.all(searchParams);
        setTableDate(data.map((val) => ({ ...val, key: val.id })));
      })();
    }
  }, [onLoadingSwitch, searchParams]);

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
            <Select
              size="large"
              style={{ marginRight: "20px", width: 130 }}
              defaultValue={searchParams.isActivate}
              onChange={onChange}>
              <Option value="">Tât cả</Option>
              <Option value="1">Đã kích hoạt</Option>
              <Option value="0">Chưa kích hoạt</Option>
            </Select>
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
