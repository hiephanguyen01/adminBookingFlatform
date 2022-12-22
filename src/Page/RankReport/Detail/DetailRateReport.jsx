import { Breadcrumb, Col, Divider, Form, Input, Row, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { reportService } from "../../../services/ReportService";
import Rating from "../Rating/Rating";
import RatingReportCard from "../RatingReportCard/RatingReportCard";
import "./DetailRateReport.scss";

const DetailRateReport = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [info, setInfo] = useState();

  const tabs = [
    {
      key: 1,
      label: "Xếp hạng đánh giá",
      children: <Rating data={info} />,
    },
    {
      key: 2,
      label: "Báo cáo vi phạm",
      children: (
        <>
          {info?.reports.map((itm) => (
            <RatingReportCard type={2} data={itm} />
          ))}
        </>
      ),
    },
  ];

  useEffect(() => {
    (async () => {
      const { data } = await reportService.getPostReportById(
        id,
        searchParams.get("category")
      );
      setInfo(data);
    })();
  }, [id, searchParams]);

  return (
    <div className="DetailRateReport">
      <Breadcrumb
        style={{
          fontSize: "16px",
          marginBottom: "10px",
          fontWeight: "bold",
        }}
      >
        <Breadcrumb.Item>
          <Link to={"/rank-report"} style={{ color: "#10b08a" }}>
            Xếp hạng báo cáo
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Chi tiết</Breadcrumb.Item>
      </Breadcrumb>
      <div className="chile">
        {info && (
          <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
            <Row gutter={[16, 16]}>
              <Col md={12}>
                <Form.Item
                  style={{ margin: "20px" }}
                  name="id"
                  label="Số định danh"
                  initialValue={info?.id}
                >
                  <Input disabled size="large" />
                </Form.Item>
              </Col>
              <Col md={12}>
                <Form.Item
                  style={{ margin: "20px" }}
                  name="id"
                  label="Mã bài đăng"
                  initialValue={info?.id}
                >
                  <Input disabled size="large" />
                </Form.Item>
              </Col>
              <Col md={12}>
                <Form.Item
                  style={{ margin: "20px" }}
                  name="Name"
                  label="Tiêu đề"
                  initialValue={info?.Name}
                >
                  <Input size="large" disabled />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
      </div>
      <Divider />
      <div className="chile" style={{ padding: "20px" }}>
        <Tabs defaultActiveKey="1" type="card" size="large" items={tabs} />
      </div>
    </div>
  );
};

export default DetailRateReport;
