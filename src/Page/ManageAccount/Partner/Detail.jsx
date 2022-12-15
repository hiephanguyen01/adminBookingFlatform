import { Col, Form, Image, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { registerPartnerService } from "../../../services/RegisterPartnerService";
import "./detail.scss";
import moment from "moment";
import { baseURL, fallBackImg } from "../../../../utils/baseURL";
import { Loading } from "../../../Components/Loading";
export const PartnerDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  useEffect(() => {
    (async () => {
      await getPartnerDetailById(id);
      setLoading(false);
    })();
  }, []);

  const getPartnerDetailById = async (id) => {
    try {
      const { data } = await registerPartnerService.getPartnerById(id);
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <Loading />;
  return (
    <div className="PartnerDetail">
      <Row gutter={32}>
        <Col span={12}>
          <Form layout="vertical" autoComplete="off">
            <Form.Item label="Số định danh">
              <Input
                disabled
                type={"text"}
                defaultValue={data?.IdentifierCode}
              />
            </Form.Item>
            <Form.Item label="Email">
              <Input disabled value={data?.Email} />
            </Form.Item>
            <Form.Item
              label="Tổ chức
"
            >
              <Input disabled value={""} />
            </Form.Item>
            <Form.Item label="Số GPĐKKD">
              <Input disabled value={data?.BusinessRegistrationLicenseNumber} />
            </Form.Item>
            <Form.Item label="Người đại diện">
              <Input disabled value={data?.PartnerName} />
            </Form.Item>
            <Form.Item label="Số CMND/CCCD">
              <Input disabled value={data?.BusinessRegistrationLicenseNumber} />
            </Form.Item>
            <Form.Item label="Địa chỉ liên hệ">
              <Input disabled value={data?.Address} />
            </Form.Item>
            <Form.Item
              label="Tài khoản ngân hàng
"
            >
              <Input
                disabled
                value={`${data.BankAccount} - ${data.BankAccountOwnerName} - ${data.BankBranchName}  `}
              />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Ngày tạo
"
                >
                  <Input
                    disabled
                    value={moment(data?.CreationTime).format("L")}
                  />
                </Form.Item>
                <Form.Item
                  label="Số bài đăng
"
                >
                  <Input disabled value={data?.NumberOfPost} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Ngày cập nhật gần nhất

"
                >
                  <Input
                    disabled
                    value={moment(data?.LastModificationTime).format("L")}
                  />
                </Form.Item>
                <Form.Item
                  label="Trạng thái

"
                >
                  <Input
                    disabled
                    value={
                      data?.IsDeleted === true ? "Đã khoá tài khoản" : "Active"
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col span={12}>
          <Form layout="vertical" autoComplete="off">
            <Form.Item
              label="Tên đối tác
"
            >
              <Input disabled value={data?.PartnerName} />
            </Form.Item>
            <Form.Item label="Số điện thoại">
              <Input disabled value={data?.Phone} />
            </Form.Item>
            <div style={{ margin: ".5rem 4rem" }}>
              <Row gutter={[16, 16]}>
                {data.IdentifyLicenses.map((item) => {
                  console.log(item);
                  return (
                    <Col span={12}>
                      <Image
                        width={"100%"}
                        height={100}
                        src={`${baseURL}/api/image-license/${item.Image}`}
                        fallback={fallBackImg}
                      />
                    </Col>
                  );
                })}
              </Row>
            </div>
            <Form.Item
              label="Hợp đồng đối tác
"
            >
              <Input disabled value={data?.BusinessRegistrationLicenseNumber} />
            </Form.Item>
            <Form.Item label="Câu hỏi bảo mật">
              <Input disabled value={""} />
            </Form.Item>
            <Form.Item
              label="Trả lời câu hỏi bảo mật
"
            >
              <Input disabled value={""} />
            </Form.Item>
            <Form.Item
              label="Ghi chú
"
            >
              <Input disabled value={data?.Note} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
