import { LockOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fallBackImg, IMG } from "../../../../utils/baseURL";
import { openNotification } from "../../../../utils/Notification";
import { Loading } from "../../../Components/Loading";
import { registerPartnerService } from "../../../services/RegisterPartnerService";
import "./detail.scss";
import "./Edit.scss";
import { convertTimeUTC } from "../../../../utils/convert";
export const DetailEditPartner = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [text, setText] = useState("");
  const [loadings, setLoadings] = useState({ save: false, delete: false });
  const [files, setFiles] = useState([null, null, null, null]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    (async () => {
      await getPartnerDetailById(id);
      setLoading(false);
    })();
  }, []);

  const getPartnerDetailById = async (id) => {
    try {
      const { data } = await registerPartnerService.getPartnerById(id);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  const onFinish = async (values) => {
    console.log(values);
    let formData = new FormData();
    for (let [idex, file] of files.entries()) {
      if (idex == 0) {
        formData.append(
          "ImageGPKD1",
          file !== null ? file.originFileObj : null
        );
      }
      if (idex == 1) {
        formData.append(
          "ImageGPKD2",
          file !== null ? file.originFileObj : null
        );
      }
      if (idex == 2) {
        formData.append(
          "ImageCCCD1",
          file !== null ? file.originFileObj : null
        );
      }
      if (idex == 3) {
        formData.append(
          "ImageCCCD2",
          file !== null ? file.originFileObj : null
        );
      }
    }
    for (let key in values) {
      formData.append(key, values[key]);
    }
    try {
      setLoadings({ ...loadings, save: true });
      await registerPartnerService.updatePartner(id, formData);
      openNotification("success", "Cập nhật thành công!");
      setLoadings({ ...loadings, save: false });
      getPartnerDetailById(id);
    } catch (error) {
      console.log(error);
      openNotification("error", "Cập nhật thất bại!");
      setLoadings({ ...loadings, save: false });
    }
  };

  const onChangeFile = ({ file }, b) => {
    const newFiles = [...files];
    file.preview = URL.createObjectURL(file.originFileObj);
    newFiles[b] = file;
    setFiles([...newFiles]);
  };
  const handleLockAccount = async (value) => {
    setLoadings({ ...loadings, delete: true });
    try {
      let formData = new FormData();
      formData.append("SignalImage", "[0, 1, 2, 3]");
      if (value) {
        formData.append("IsDeleted", value);
        formData.append("Note", text);
        await registerPartnerService.updatePartner(id, formData);
        openNotification("success", "Tài Khoản đã được khoá!");
        setText("");
        setIsModalOpen(false);
        getPartnerDetailById(id);
        setLoadings({ ...loadings, delete: false });
      } else {
        formData.append("IsDeleted", value);
        await registerPartnerService.updatePartner(id, formData);
        setLoadings({ ...loadings, delete: false });
        openNotification("success", "Tài Khoản đã được mở khoá!");
        getPartnerDetailById(id);
      }
    } catch (error) {
      setLoadings({ ...loadings, delete: false });
      console.log(error);
    }
  };
  if (loading) return <Loading />;
  return (
    <div className="PartnerDetailEdit">
      <Breadcrumb style={{ marginBottom: "10px" }}>
        <Breadcrumb.Item>
          <Link to="/manage/partner">Quản lý tài khoản đối tác</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Chỉnh sửa tài khoản</Breadcrumb.Item>
      </Breadcrumb>
      <Form
        initialValues={{
          Email: data.Email,
          Phone: data.Phone,
          BankBranchName: data.BankBranchName,
          BankAccount: data.BankAccount,
          BankAccountOwnerName: data.BankAccountOwnerName,
          RepresentativeName: data.RepresentativeName,
          BusinessRegistrationLicenseNumber:
            data?.BusinessRegistrationLicenseNumber,
          Address: data.Address,
          PartnerName: data.PartnerName,
          PersonalIdentity: data.PersonalIdentity,
        }}
        onFinish={onFinish}
        layout="vertical"
        autoComplete="off"
      >
        <Row style={{ padding: "1rem" }} gutter={32}>
          <Col span={12}>
            <Form.Item label="Số định danh">
              <Input disabled type={"text"} value={data?.IdentifierCode} />
            </Form.Item>
            <Form.Item name={"Email"} label="Email">
              <Input />
            </Form.Item>
            <Form.Item label="Tổ chức">
              <Input disabled value={data?.CompanyName} />
            </Form.Item>
            <Form.Item
              name={"BusinessRegistrationLicenseNumber"}
              label="Số GPĐKKD"
            >
              <Input value={data?.BusinessRegistrationLicenseNumber} />
            </Form.Item>
            <Form.Item name={"RepresentativeName"} label="Người đại diện">
              <Input />
            </Form.Item>
            <Form.Item label="Số CMND/CCCD" name="PersonalIdentity">
              <Input />
            </Form.Item>
            <Form.Item name={"Address"} label="Địa chỉ liên hệ">
              <Input />
            </Form.Item>

            <Form.Item
              name={"BankAccount"}
              label="Số tài khoản
"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={"RepresentativeName"}
              label="Chủ tài khoản:
"
            >
              <Input />
            </Form.Item>
            <Form.Item
              // name={"BankBranchName"}
              label="Ngân hàng:
"
            >
              <Input disabled value={data?.Bank?.VNName} />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Ngày tạo
"
                >
                  <Input
                    disabled
                    value={convertTimeUTC(data?.CreationTime, true)}
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
                      "DD-MM-YYYY HH:mm A"
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
          </Col>
          <Col span={12}>
            <Form.Item
              name={"PartnerName"}
              label="Tên đối tác
"
            >
              <Input />
            </Form.Item>
            <Form.Item name={"Phone"} label="Số điện thoại">
              <Input />
            </Form.Item>
            <div style={{ margin: ".5rem 4rem" }}>
              <Row gutter={[16, 16]}>
                <Col span={12} style={{ textAlign: "center" }}>
                  <h5 style={{ textAlign: "center" }}>
                    Hình chụp GPKD mặt trước
                  </h5>
                  <Upload
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    onChange={(e) => onChangeFile(e, 0)}
                  >
                    <Image
                      width={"100%"}
                      height={100}
                      preview={false}
                      src={
                        files[0] === null
                          ? IMG(data.ImageGPKD1)
                          : files[0].preview
                      }
                      fallback={fallBackImg}
                    />
                  </Upload>
                </Col>
                <Col span={12} style={{ textAlign: "center" }}>
                  <h5 style={{ textAlign: "center" }}>
                    Hình chụp GPKD mặt sau
                  </h5>
                  <Upload
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    onChange={(e) => onChangeFile(e, 1)}
                  >
                    <Image
                      width={"100%"}
                      height={100}
                      preview={false}
                      src={
                        files[1] === null
                          ? IMG(data.ImageGPKD2)
                          : files[1].preview
                      }
                      fallback={fallBackImg}
                    />
                  </Upload>
                </Col>
                <Col span={12} style={{ textAlign: "center" }}>
                  <h5 style={{ textAlign: "center" }}>CMND/CCCD mặt truoc</h5>
                  <Upload
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    onChange={(e) => onChangeFile(e, 2)}
                  >
                    <Image
                      width={"100%"}
                      height={100}
                      preview={false}
                      src={
                        files[2] === null
                          ? IMG(data.ImageCCCD1)
                          : files[2].preview
                      }
                      fallback={fallBackImg}
                    />
                  </Upload>
                </Col>
                <Col span={12} style={{ textAlign: "center" }}>
                  <h5 style={{ textAlign: "center" }}>CMND/CCCD mặt sau</h5>
                  <Upload
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    onChange={(e) => onChangeFile(e, 3)}
                  >
                    <Image
                      width={"100%"}
                      height={100}
                      preview={false}
                      src={
                        files[3] === null
                          ? IMG(data.ImageCCCD2)
                          : files[3].preview
                      }
                      fallback={fallBackImg}
                    />
                  </Upload>
                </Col>
                {/* {data.IdentifyLicenses.map((item, idx) => (
                  <Col
                    key={item.Image}
                    span={12}
                    style={{ textAlign: "center" }}>
                    {idx === 0 && (
                      <h5 style={{ textAlign: "center" }}>
                        Hình chụp GPKD mặt trước
                      </h5>
                    )}
                    {idx === 1 && (
                      <h5 style={{ textAlign: "center" }}>
                        Hình chụp GPKD mặt sau
                      </h5>
                    )}
                    {idx === 2 && (
                      <h5 style={{ textAlign: "center" }}>
                        CMND/CCCD mặt truoc
                      </h5>
                    )}
                    {idx === 3 && (
                      <h5 style={{ textAlign: "center" }}>CMND/CCCD mặt sau</h5>
                    )}

                    <Upload
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      onChange={(e) => onChangeFile(e, idx)}>
                      <Image
                        width={"100%"}
                        height={100}
                        preview={false}
                        src={
                          files[idx] === null
                            ? `${baseURL}/api/image/${item.Image}`
                            : files[idx].preview
                        }
                        fallback={fallBackImg}
                      />
                    </Upload>
                  </Col>
                ))} */}
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
              <Input disabled value={data.Note} />
            </Form.Item>
          </Col>
        </Row>
        {data.IsDeleted ? (
          <div
            style={{
              padding: "1rem 2rem",
              background: "#ffeded",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <LockOutlined style={{ color: "#e22828" }} />
              <span style={{ color: "#e22828" }}>Tài khoản đang bị khóa</span>
            </div>
            <Button
              loading={loadings.delete}
              onClick={() => handleLockAccount(false)}
              danger
            >
              MỞ KHÓA TÀI KHOẢN
            </Button>
          </div>
        ) : (
          <Row gutter={8}>
            <Col span={18}>
              <div className="note" style={{ backgroundColor: "#E3FAF4" }}>
                <div>
                  <div className="title">
                    <h3>Lưu ý khi thay đổi thông tin:</h3>
                  </div>
                  <p>
                    1. Thông tin được thay đổi: phần thông tin trong ô{" "}
                    <span style={{ color: "#03AC84" }}>màu xanh</span> và hình
                    ảnh
                  </p>
                  <p>
                    2. <span style={{ fontWeight: "700" }}>Số điện thoại:</span>{" "}
                    admin chỉ thay đổi khi Đối tác liên hệ trực tiếp qua
                    Hotline, cung cấp chính xác các thông tin theo yêu cầu và
                    trả lời đúng câu hỏi bảo mật HOẶC khi Đối tác trực tiếp đến
                    văn phòng
                  </p>
                </div>
              </div>
            </Col>
            <Col span={6}>
              <div className="buttons">
                <Button
                  htmlType="submit"
                  loading={loadings.save}
                  size="large"
                  color="green"
                  style={{ background: "rgb(3, 172, 132)", color: "#fff" }}
                >
                  Lưu Thay Đổi
                </Button>
                <Button onClick={() => showModal()} size="large" type="primary">
                  Khoá Tài Khoản
                </Button>
              </div>
            </Col>
          </Row>
        )}
      </Form>
      <Modal
        className="modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        footer={null}
        maskClosable={false}
      >
        <>
          <div className="title">
            <QuestionCircleOutlined />
            <span>Bạn có chắc rằng muốn khóa tài khoản người dùng này?</span>
          </div>
          <TextArea
            style={{ margin: "1rem 0" }}
            rows={4}
            onChange={(e) => setText(e.target.value)}
            placeholder="Lý do khoá tài khoản ?"
            value={text}
          />

          <div
            className="buttons"
            style={{ display: "flex", justifyContent: "right", gap: ".5rem" }}
          >
            <Button
              htmlType="submit"
              loading={loadings.save}
              size="large"
              color="green"
              onClick={handleCancel}
              //   style={{ background: "rgb(3, 172, 132)", color: "#fff" }}
            >
              Huỷ
            </Button>
            <Button
              onClick={() => handleLockAccount(true)}
              size="large"
              type="primary"
              loading={loadings.delete}
            >
              Khoá tài khoản
            </Button>
          </div>
        </>
      </Modal>
    </div>
  );
};
