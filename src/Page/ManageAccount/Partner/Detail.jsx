import { Breadcrumb, Col, Form, Image, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { registerPartnerService } from "../../../services/RegisterPartnerService";
import "./detail.scss";
import moment from "moment";
import { baseURL, fallBackImg } from "../../../../utils/baseURL";
import { Loading } from "../../../Components/Loading";
export const PartnerDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  console.log(data);
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
      <Breadcrumb style={{ marginBottom: "10px" }}>
        <Breadcrumb.Item>
          <Link to="/manage/partner">Quản lý tài khoản đối tác</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Chi tiết tài khoản</Breadcrumb.Item>
      </Breadcrumb>
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
              <Input disabled value={data?.BankAccountOwnerName} />
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
                    value={moment(data?.CreationTime).format("DD-MM-YYYY HH:mm")}
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
                    value={moment(data?.LastModificationTime).format(
                      "DD-MM-YYYY HH:mm"
                    )}
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
                <Col span={12} style={{ textAlign: "center" }}>
                  <h5 style={{ textAlign: "center" }}>
                    Hình chụp GPKD mặt trước
                  </h5>
                  <Image
                    width={100}
                    height={100}
                    preview={true}
                    src={`${baseURL}/api/image/${data.ImageGPKD1}`}
                    fallback={fallBackImg}
                  />
                </Col>
                <Col span={12} style={{ textAlign: "center" }}>
                  <h5 style={{ textAlign: "center" }}>
                    Hình chụp GPKD mặt sau
                  </h5>
                  <Image
                    width={"100%"}
                    height={100}
                    preview={<i class="fas fa-tablet-rugged    "></i>}
                    src={`${baseURL}/api/image/${data.ImageGPKD2}`}
                    fallback={fallBackImg}
                  />
                </Col>
                <Col span={12} style={{ textAlign: "center" }}>
                  <h5 style={{ textAlign: "center" }}>CMND/CCCD mặt trước</h5>
                  <Image
                    width={"100%"}
                    height={100}
                    preview={<i class="fas fa-tablet-rugged    "></i>}
                    src={`${baseURL}/api/image/${data.ImageCCCD1}`}
                    fallback={fallBackImg}
                  />
                </Col>
                <Col span={12} style={{ textAlign: "center" }}>
                  <h5 style={{ textAlign: "center" }}>CMND/CCCD mặt sau</h5>
                  <Image
                    width={"100%"}
                    height={100}
                    preview={true}
                    src={`${baseURL}/api/image/${data.ImageCCCD2}`}
                    fallback={fallBackImg}
                  />
                </Col>
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
