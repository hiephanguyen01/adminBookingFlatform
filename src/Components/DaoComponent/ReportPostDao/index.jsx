import "./reportPostDao.scss";
import { useState } from "react";
import { Modal, Radio, Space } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { reportService } from "../../services/ReportService";

const data = [
  { label: "Nội dung trùng lặp, spam", value: "Nội dung trùng lặp, spam" },
  { label: "Thông tin sai sự thật", value: "Thông tin sai sự thật" },
  {
    label: "Lộ thông tin cá nhân, vd: Số điện thoại,...",
    value: "Lộ thông tin cá nhân, vd: Số điện thoại,...",
  },
  { label: "Ngôn từ gây thù ghét", value: "Ngôn từ gây thù ghét" },
  { label: "Khác", value: 4 },
];

const ReportPost = (props) => {
  const [value, setValue] = useState("");
  const [afterReport, setAfterReport] = useState(false);

  const [valueText, setValueText] = useState("");

  const onChange = (e) => {
    // console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const handleCancel = () => {
    props.setIsReportPostModalVisible(false);
    setAfterReport(false);
  };
  const handleOk = async () => {
    try {
      if (value === 6) {
        const data1 = await reportService.createReportDao({
          PostId: Number(props.postId),
          Content: valueText,
        });
      } else {
        const data1 = await reportService.createReportDao({
          PostId: Number(props.postId),
          Content: value,
        });
      }
      props.setIsReportPostModalVisible(false);
      setAfterReport(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal
        visible={props.isReportPostModalVisible}
        onCancel={handleCancel}
        footer={[
          <button onClick={handleCancel} className="cancel-btn">
            Hủy
          </button>,
          <button onClick={handleOk} className="ok-btn">
            Báo cáo
          </button>,
        ]}
        className="report-post-dao"
      >
        <h3>Lý do báo cáo bài viết</h3>
        <Radio.Group onChange={onChange} value={value}>
          <Space
            direction="vertical"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            {data.map((item, idx) => {
              return <Radio value={item.value}>{item.label}</Radio>;
            })}
          </Space>
        </Radio.Group>
        {value === 4 ? (
          <TextArea
            style={{ marginTop: "10px" }}
            value={valueText}
            onChange={(e) => setValueText(e.target.value)}
            placeholder="Nhập lý do"
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        ) : null}
      </Modal>
      <Modal
        visible={afterReport}
        onCancel={handleCancel}
        footer={[
          <button onClick={() => setAfterReport(false)} className="ok-btn">
            OK
          </button>,
        ]}
      >
        <h3>Cảm ơn bạn vì đã báo cáo</h3>
        <p
          style={{
            textAlign: "justify",
            fontSize: "18px",
            fontWeight: "400",
            lineHeight: "25px",
          }}
        >
          Đăng thông tin sai sự thật là vi phạm Nguyên tắc cộng đồng của chúng
          tôi. Cảm ơn bạn đã giúp Booking Studio duy trì sự an toàn và uy tín.
        </p>
      </Modal>
    </>
  );
};

export default ReportPost;
