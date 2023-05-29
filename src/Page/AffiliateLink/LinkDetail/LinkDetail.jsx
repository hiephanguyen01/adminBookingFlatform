import { EditFilled } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Input,
  Row,
  Table,
  Tooltip,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { convertPrice } from "../../../../utils/convert";
import { openNotification } from "../../../../utils/Notification";
import { roomService } from "../../../services/RoomService";
import "./LinkDetail.scss";
const LinkDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pageData, setPageData] = useState({});
  const [dataSource, setDataSource] = useState([]);
  const searchParams = new URLSearchParams(location.search);

  const { id } = useParams();
  const category = searchParams.get("category");

  const columns = [
    {
      title: "Hoa hồng",
      dataIndex: "label",
      key: "label",
    },
    {
      title: "Tỉ lệ hoa hồng",
      dataIndex: "comissions",
      key: "comissions",
      render: (_, record) => (
        <>
          <Input
            type="number"
            size="small"
            style={{ width: "80px" }}
            step={0.01}
            onChange={(e) => handleChange(e, record)}
            onBlur={handleBlur}
            defaultValue={_ || 0}
            min={0}
            max={1}
          />
        </>
      ),
    },
  ];
  //   <p>
  //   {convertPrice(_?.PriceByDate)} đ/ngày <br />{" "}
  //   {convertPrice(_?.PriceByHour)} đ/giờ{" "}
  // </p>
  const handleChange = (e, record) => {
    const value = e.target.value;
    setPageData((data) => {
      if (record.key === "1") {
        return {
          ...data,
          post: {
            ...data.post,
            AffiliateCommissionByDate: +value,
          },
        };
      } else {
        return {
          ...data,
          post: {
            ...data.post,
            AffiliateCommissionByHour: +value,
          },
        };
      }
    });
  };

  const handleBlur = async () => {
    try {
      await roomService.updateService(id, category, pageData.post);
      openNotification("success", "Cập nhật thành công");
    } catch (error) {
      openNotification("error", "Vui lòng thử lại sau");
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await roomService.getDetailService(id, category);
      console.log("🚀 ~ data:", data);
      setPageData(data);
      setDataSource([
        {
          key: "1",
          label: `Tỉ lệ hoa hồng theo ngày`,
          comissions: data.post.AffiliateCommissionByDate,
        },
        {
          key: "2",
          label: `Tỉ lệ hoa hồng theo giờ`,
          comissions: data.post.AffiliateCommissionByHour,
        },
      ]);
    })();
  }, [id, category]);

  return (
    <div className="LinkDetail">
      <div className="chile" style={{ padding: "20px" }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <p
              style={{ display: "inline", cursor: "pointer" }}
              onClick={() => navigate("/affiliate/link")}>
              Quản lý link
            </p>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <p style={{ color: "#03AC84" }}>Chi tiết link</p>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Divider />
      <div className="chile" style={{ padding: "20px" }}>
        <h1 className="title">THÔNG TIN</h1>
        <Divider />
        <Row>
          <Col sm={12}>
            <Col md={24}>
              <Row>
                <Col md={8}>
                  <div className="label">Tên dịch vụ/sản phẩm</div>
                </Col>
                <Col md={16}>
                  <div className="value">
                    :&emsp;&emsp;&emsp;{pageData?.post?.Name}
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md={24}>
              <Row>
                <Col md={8}>
                  <div className="label">Phân loại</div>
                </Col>
                <Col md={16}>
                  <div className="value">
                    :&emsp;&emsp;&emsp;{pageData?.label}{" "}
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md={24}>
              <Row>
                <Col md={8}>
                  <div className="label">Đã đặt</div>
                </Col>
                <Col md={16}>
                  <div className="value">
                    :&emsp;&emsp;&emsp;{pageData?.post?.BookingCount}
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md={24}>
              <Row>
                <Col md={8}>
                  <div className="label">Link xem trực tiếp</div>
                </Col>
                <Col md={16}>
                  <div className="value">
                    :&emsp;&emsp;&emsp;
                    <a
                      target="_blank"
                      href={`https://bookingstudio.vn/home/${pageData?.label?.toLowerCase()}/${
                        pageData?.post?.id
                      }`}>
                      {`https://bookingstudio.vn/home/${pageData?.label?.toLowerCase()}/${
                        pageData?.post?.id
                      }`}
                    </a>
                  </div>
                </Col>
              </Row>
            </Col>
          </Col>
          <Col sm={12}>
            <Table dataSource={dataSource} columns={columns} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LinkDetail;
