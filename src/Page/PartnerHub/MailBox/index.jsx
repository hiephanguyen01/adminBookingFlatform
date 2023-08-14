import React, { useCallback, useEffect, useState } from "react";

import "./mailBox.scss";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Dropdown,
  Form,
  Pagination,
  Row,
  Select,
  Switch,
  Table,
} from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { mailBox } from "../../../services/MailBox";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;

const Index = () => {
  const navigation = useNavigate();
  const [mailList, setMailList] = useState([]);
  const [pagination, setPagination] = useState({});

  const getAllMail = useCallback(async (page, limit, query = {}) => {
    try {
      const res = await mailBox.getAllMail(page, limit, query);
      if (res.data.success) {
        setMailList(res.data.data);
        setPagination(res.data.pagination);
      }
    } catch (error) {}
  }, []);

  useEffect(() => {
    getAllMail(pagination?.currentPage, pagination?.limit, { status: "" });
  }, []);

  const formItem = [
    {
      label: "Trạng thái",
      name: "status",
      style: {
        width: "20%",
        display: "inline-block",
        marginRight: "40px",
      },
      el: (
        <Select
          defaultValue={""}
          size="large"
          style={{
            width: "100%",
          }}
          options={[
            {
              value: "",
              label: "Tất cả",
            },
            {
              value: 0,
              label: "Chưa xem",
            },
            {
              value: 1,
              label: "Đã xem",
            },
          ]}
        />
      ),
    },
    {
      label: "Ngày nhận",
      name: "createdAt",
      style: {
        width: "22%",
        display: "inline-block",
        marginRight: "40px",
      },
      el: <RangePicker format="DD/MM/YYYY" style={{ padding: "8px" }} />,
    },
    {
      label: " ",
      style: {
        width: "22%",
        display: "inline-block",
        marginRight: "40px",
      },
      el: (
        <Button htmlType="submit" type="default" danger style={{ height: 40 }}>
          Tìm kiếm
        </Button>
      ),
    },
  ];

  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "name",
      width: 300,
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: "Ngày gửi",
      dataIndex: "createdAt",
      key: "CreateAt",
      width: 250,
      render: (value) => moment(value).format("DD/MM/YYYY"),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (value) =>
        value ? (
          <span>Đã xem</span>
        ) : (
          <span style={{ color: "#0C77F8" }}>Chưa xem</span>
        ),
    },
    {
      title: "Phản hồi",
      render: (values) => (
        <Checkbox
          checked={values?.isFeedback}
          onClick={async () => {
            try {
              if (values?.status) {
                await mailBox.updateMail(values?.id, {
                  isFeedback: !values?.isFeedback,
                });
                setMailList(
                  mailList.map((item) => {
                    if (item?.id === values?.id) {
                      return { ...item, isFeedback: !values?.isFeedback };
                    }
                    return item;
                  })
                );
              }
            } catch (error) {}
          }}
        ></Checkbox>
      ),
    },
    {
      title: "Thao tác",
      render: (values) => (
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            boxShadow: "1px 1px 5px #ccc",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: !values?.status ? "#E22828" : "",
            cursor: "pointer",
          }}
          onClick={() => navigation(`${values?.id}`)}
        >
          <EyeOutlined style={{ color: !values?.status ? "#fff" : "#000" }} />
        </div>
      ),
    },
  ];

  const onFinish = async (values) => {
    try {
      getAllMail(pagination?.currentPage, pagination?.limit, values);
    } catch (error) {}
  };
  console.log(pagination);
  return (
    <div className="mailBoxContainer">
      <h2>Quản lý hộp thư</h2>
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
        // onValuesChange={(e) => onChangeFilter(e)}
        autoComplete="off"
      >
        <Row gutter={[24, 24]} align={"middle"}>
          {formItem.map((item, idx) => (
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
      </Form>
      <Table columns={columns} dataSource={mailList} pagination={false} />
      {Object.entries(pagination) && (
        <Row align={"middle"} justify={"space-between"}>
          <span>
            Hiển thị {(pagination.currentPage - 1) * pagination.limit + 1} -{" "}
            {pagination.hasNextPage
              ? pagination.currentPage * pagination.limit
              : pagination?.total -
                (pagination.currentPage - 1) * pagination.limit}
            /{pagination.total}
          </span>
          <Pagination
            total={pagination.total}
            current={pagination?.currentPage}
            pageSize={pagination?.limit || 1}
            onChange={(page) => getAllMail(page, pagination?.limit)}
          />
          <Select
            defaultValue={10}
            size="large"
            style={{}}
            options={[
              {
                value: 10,
                label: "10 kết quả/trang",
              },
              {
                value: 20,
                label: "20 kết quả/trang",
              },
            ]}
            onChange={(value) => getAllMail(pagination?.currentPage, value)}
          />
        </Row>
      )}
    </div>
  );
};

export default Index;
