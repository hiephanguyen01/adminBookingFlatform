import { Col, Form, Image, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { registerPartnerService } from "../../../services/RegisterPartnerService";
import "./detail.scss";
import moment from "moment";
import { baseURL, fallBackImg } from "../../../../utils/baseURL";
import { Loading } from "../../../Components/Loading";
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
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) return <Loading/>;
  return (
    <div className="CustomerDetail">
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
              <Input disabled type={"text"} defaultValue={data?.Email} />
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
"
                >
                  <Input
                    disabled
                    value={moment(data?.CreationTime).format("L")}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Cập nhật gần nhất

"
                >
                  <Input
                    disabled
                    value={moment(data?.LastModificationTime).format("L")}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Số đơn đặt
"
                >
                  <Input disabled value={data?.NumberOfOrder} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Trạng thái
"
                >
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
"
            >
              <Input disabled value={data.Note} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
