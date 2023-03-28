import { Breadcrumb, Col, Form, Input, Row } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loading } from "../../../Components/Loading";
import { registerPartnerService } from "../../../services/RegisterPartnerService";
import "./detail.scss";
export const CustomerDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  useEffect(() => {
    (async () => {
      await getCustomerDetailById(id);
      setLoading(false);
    })();
  }, []);

  const getCustomerDetailById = async (id) => {
    try {
      const { data } = await registerPartnerService.getCustomerById(id);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) return <Loading />;
  return (
    <div className="CustomerDetail">
      <Breadcrumb style={{ marginBottom: "10px" }}>
        <Breadcrumb.Item>
          <Link to="/manage/customer">Quản lý tài khoản khách hàng</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Chi tiết tài khoản</Breadcrumb.Item>
      </Breadcrumb>
      <Form layout="vertical" autoComplete="off">
        <Row gutter={64}>
          <Col span={12}>
            <Form.Item label="Số định danh">
              <Input
                disabled
                type={"text"}
                defaultValue={data?.IdentifierCode}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Tên tài khoản">
              <Input disabled type={"text"} defaultValue={data?.Email} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Số điện thoại">
              <Input disabled type={"text"} defaultValue={data?.Phone} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Tài khoản Google">
              <Input disabled type={"text"} defaultValue={data?.GoogleEmail} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Tài khoản Facebook">
              <Input disabled type={"text"} value={data?.FacebookEmail} />
            </Form.Item>
          </Col>
          <Col>
            <Row gutter={12}>
              <Col span={6}>
                <Form.Item
                  label="Ngày tạo
">
                  <Input
                    disabled
                    value={moment(data?.CreationTime).format(
                      "DD/MM/YYYY HH:mm"
                    )}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Cập nhật gần nhất

">
                  <Input
                    disabled
                    value={moment(data?.LastModificationTime).format(
                      "DD/MM/YYYY HH:mm"
                    )}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Số đơn đặt
">
                  <Input disabled value={data?.NumberOfOrder} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Trạng thái
">
                  <Input
                    disabled
                    value={data.IsDeleted ? "Tài khoản đã khoá" : "Active"}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col>
            <Form.Item
              label="Ghi chú
">
              <Input disabled value={data.Note} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
